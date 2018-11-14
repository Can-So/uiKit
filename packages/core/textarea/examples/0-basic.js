// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import TextArea from '../src';

const Div = styled.div`
  max-width: 500px;
`;

export default class extends Component<*, *> {
  state = {
    value: '',
  };
  controlValue = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    console.log(event.currentTarget.value);
    this.setState({
      value: `${
        event.currentTarget.value
      } falsdgalskgjasldfjas;ldghkajsldfkja;g`,
    });
  };
  onFocus = () => console.log('IVE BEEN FOCUSED');
  render() {
    return (
      <Div>
        <TextArea resize="smart" onFocus={this.onFocus} />
        <TextArea resize="auto" onFocus={this.onFocus} />
        <TextArea resize="horizontal" onFocus={this.onFocus} />
        <TextArea resize="vertical" onFocus={this.onFocus} />
        <TextArea />
      </Div>
    );
  }
}

/*
 <Textarea resize="none (default) | auto | horizontal | vert | smart" minimumRows={20}/>
 */
