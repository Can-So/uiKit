// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import TextArea from '../src';

const Div = styled.div`
  max-width: 500px;
`;

export default class extends Component<*, *> {
  textareaElement: any;
  focus = () => {
    if (this.textareaElement) {
      this.textareaElement.focus();
    }
  };
  render() {
    return (
      <Div>
        <p>Disabled:</p>
        <TextArea value="hello" isDisabled />
        <p>Invalid:</p>
        <TextArea resize="auto" isInvalid />
        <p>Smart:</p>
        <TextArea
          ref={(ref?: any) => {
            this.textareaElement = ref;
          }}
        />
        <button onClick={this.focus}>focus</button>
      </Div>
    );
  }
}
