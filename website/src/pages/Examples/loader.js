// @flow
import React, { Component } from 'react';
import packageResolver from '../../utils/packageResolver';
import * as fs from '../../utils/fs';
import styled, { css } from 'styled-components';
import type { File } from '../../types';
import { colors } from '@atlaskit/theme';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';
import qs from 'query-string';

const Content = styled.div`
  flex: 1 1 auto;
`;

const ComponentContainer = styled.div`
  height: 100%;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: ${props => (props.mode === 'modal' ? '0px' : '20px')};
`;

const ErrorMessage = styled.div`
  background-color: ${colors.R400};
  color: white;
  font-size: 120%;
  padding: 1em;
`;

type State = {
  packageId: string,
  groupId: string,
  exampleId: string,
  mode: string,
};

type ExampleLoaderProps = {
  example: File,
  mode: string,
};

export default class ExamplesIFrame extends Component<{}, State> {
  state = {
    packageId: '',
    groupId: '',
    exampleId: '',
    mode: '',
  };
  componentWillMount() {
    if (window) {
      const { packageId, groupId, exampleId, mode } = qs.parse(
        window.location.search,
      );
      this.setState({
        packageId,
        groupId,
        exampleId,
        mode: mode ? mode : '',
      });
    }
  }

  render() {
    let { examples, packageId, exampleId } = packageResolver(
      this.state.groupId,
      this.state.packageId,
      this.state.exampleId,
    );
    if (examples && exampleId) {
      return (
        <ExampleLoader
          example={fs.getById(fs.getFiles(examples.children), exampleId)}
          mode={this.state.mode}
        />
      );
    }

    return (
      <Content>
        <ErrorMessage>
          {fs.titleize(packageId)} does not have examples
        </ErrorMessage>
      </Content>
    );
  }
}

function ExampleLoader(props: ExampleLoaderProps) {
  const ExampleComponent = Loadable({
    loader: () => props.example.exports(),
    loading: Loading,
    render(loaded) {
      if (!loaded.default) {
        return (
          <ErrorMessage>
            Example "{props.example.id}" doesn't have default export.
          </ErrorMessage>
        );
      }

      return (
        <ComponentContainer mode={props.mode}>
          <loaded.default />
        </ComponentContainer>
      );
    },
  });

  return (
    <Content>
      <ExampleComponent />
    </Content>
  );
}
