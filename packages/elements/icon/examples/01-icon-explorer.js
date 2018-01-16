// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import { FieldTextStateless } from '@atlaskit/field-text';

import allIcons from '../utils/icons';
import IconExplorerCell from './utils/IconExplorerCell';

const IconGridWrapper = styled.div`
  padding: 10px 5px 0;
`;

const IconExplorerGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
`;

const NoIcons = styled.div`
  margin-top: 10px;
  padding: 10px;
`;

type iconType = {
  keywords: string[],
  component: Class<Component<*>>,
  componentName: string,
  package: string,
};

const filterIcons = (icons, query) => {
  const regex = new RegExp(query);
  return Object.values(icons).filter(icon =>
    // $FlowFixMe - Object.values cannot follow types of object properties
    icon.keywords
      .map(keyword => (regex.test(keyword) ? 1 : 0))
      .reduce((allMatches, match) => allMatches + match, 0),
  );
};

type State = {
  query: string,
  showIcons: boolean,
};

class IconAllExample extends Component<{}, State> {
  state = {
    query: '',
    showIcons: false,
  };

  updateQuery = (query: string) => this.setState({ query, showIcons: true });

  toggleShowIcons = () => this.setState({ showIcons: !this.state.showIcons });

  renderIcons = () => {
    // $FlowFixMe - Object.values cannot follow types of object properties
    const icons: iconType[] = filterIcons(allIcons, this.state.query);

    return icons.length ? (
      <IconExplorerGrid>
        {icons.map(icon => (
          <IconExplorerCell {...icon} key={icon.componentName} />
        ))}
      </IconExplorerGrid>
    ) : (
      <NoIcons>{`Sorry, we couldn't find any icons matching "${
        this.state.query
      }".`}</NoIcons>
    );
  };

  render() {
    return (
      <div>
        <FieldTextStateless
          isLabelHidden
          key="Icon search"
          label=""
          onChange={(event: SyntheticEvent<HTMLInputElement>) =>
            this.updateQuery(event.currentTarget.value)
          }
          placeholder="Search for an icon..."
          shouldFitContainer
          value={this.state.query}
        />
        <IconGridWrapper>
          <p>
            <Button
              appearance="subtle-link"
              onClick={() => this.toggleShowIcons()}
              spacing="none"
            >
              {this.state.showIcons ? 'Hide icons' : 'Show all icons'}
            </Button>
          </p>
          {this.state.showIcons ? this.renderIcons() : null}
        </IconGridWrapper>
      </div>
    );
  }
}

export default IconAllExample;
