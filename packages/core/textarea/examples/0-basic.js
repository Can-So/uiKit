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
        <p>Disabled:</p>
        <TextArea isDisabled />
        <p>isInvalid:</p>
        <TextArea isInvalid />
        <p>Smart:</p>
        <TextArea />
      </Div>
    );
  }
}
