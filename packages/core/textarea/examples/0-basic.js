// @flow
import React, { Component, type ElementRef } from 'react';
import styled from 'styled-components';
import { TextAreaWithoutAnalytics as TextArea } from '../src/components/TextArea';

const Div = styled.div`
  max-width: 500px;
`;

export default class extends Component<*, *> {
  textareaRef: HTMLTextAreaElement | null;

  focus = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    if (this.textareaRef) {
      this.textareaRef.focus();
    }
  };
  render() {
    return (
      <Div>
        <p>Disabled:</p>
        <TextArea value="hello" isDisabled />
        <p>Invalid:</p>
        <TextArea isInvalid resize="auto" />
        <p>Smart:</p>
        <TextArea ref={ref => (this.textareaRef = ref)} />
        <button onClick={this.focus}>focus</button>
      </Div>
    );
  }
}
