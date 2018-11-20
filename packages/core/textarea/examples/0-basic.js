// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { TextAreaWithoutAnalytics as TextArea } from '../src/components/TextArea';

const Div = styled.div`
  max-width: 500px;
`;

export default class extends Component<*, *> {
  textareaElement: HTMLTextAreaElement | null;
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
          ref={ref => {
            this.textareaElement = ref;
          }}
        />
        <button onClick={this.focus}>focus</button>
      </Div>
    );
  }
}
