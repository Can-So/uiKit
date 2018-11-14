// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import TextArea from '../src';

const Div = styled.div`
  max-width: 500px;
`;

export default class extends Component<*, *> {
  render() {
    return (
      <Div>
        <TextArea resize="auto" isDisabled />
        <TextArea resize="horizontal" isInvalid />
        <TextArea resize="vertical" />
        <TextArea />
      </Div>
    );
  }
}
