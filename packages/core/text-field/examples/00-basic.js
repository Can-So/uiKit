// @flow

import React, { Component } from 'react';
import { Field } from '@atlaskit/form';
import TextField from '../src';

const eventResultStyle = {
  borderStyle: 'dashed',
  borderWidth: '1px',
  borderColor: '#ccc',
  padding: '0.5em',
  color: '#ccc',
  margin: '0.5em 0',
};

type Props = {};
type State = {| eventResult: string |};

export default class TextFieldExample extends Component<Props, State> {
  state = {
    eventResult:
      'Click into & out of the input above to trigger onBlur & onFocus.',
  };

  handleOnChange = (e: any) => {
    this.setState({
      eventResult: `onChange called with value: ${e.target.value}`,
    });
  };

  handleOnBlur = () => {
    this.setState({ eventResult: 'onBlur called' });
  };

  handleOnFocus = () => {
    this.setState({ eventResult: 'onFocus called' });
  };

  render() {
    const { eventResult } = this.state;

    return (
      <div>
        <label>Event Handlers</label>
        <TextField
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
        />
        <div style={eventResultStyle}>{eventResult}</div>

        <label>Default Value</label>
        <TextField defaultValue="candy" />

        <label>Disabled</label>
        <TextField isDisabled defaultValue="can't touch this..." />

        <label>Required</label>
        <TextField isRequired />

        <label>Invalid</label>
        <TextField isInvalid />

        <label>Placeholder</label>
        <TextField placeholder="Click here to input..." />

        <label>Auto Focus</label>
        <TextField autoFocus />

        <label>Spell Check</label>
        <TextField spellCheck />
      </div>
    );
  }
}
