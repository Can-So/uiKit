// @flow

import React, { Component } from 'react';
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
        <label for="event-handlers">Event Handlers</label>
        <TextField
          name="event-handlers"
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
        />
        <div style={eventResultStyle}>{eventResult}</div>

        <label for="default-value">Default Value</label>
        <TextField name="default-value" defaultValue="candy" />

        <label for="disabled">Disabled</label>
        <TextField
          name="disabled"
          isDisabled
          defaultValue="can't touch this..."
        />

        <label for="required">Required</label>
        <TextField name="required" isRequired />

        <label for="invalid">Invalid</label>
        <TextField name="invalid" isInvalid />

        <label for="placeholder">Placeholder</label>
        <TextField name="placeholder" placeholder="Click here to input..." />

        <label for="auto-focus">Auto Focus</label>
        <TextField name="auto-focus" autoFocus />

        <label for="spell-check">Spell Check</label>
        <TextField name="spell-check" spellCheck />
      </div>
    );
  }
}
