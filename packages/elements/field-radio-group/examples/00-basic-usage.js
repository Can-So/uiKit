// @flow
import React, { PureComponent } from 'react';
import FieldRadioGroup from '../src';
import type { ItemsPropTypeSmart } from '../src/types';

const items: ItemsPropTypeSmart = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', defaultSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
  { name: 'color', value: 'green', label: 'Green' },
];

type State = {
  onRadioChangeResult: string,
};

export default class BasicExample extends PureComponent<void, State> {
  state = {
    onRadioChangeResult: 'Click on a radio feild to trigger onRadioChange',
  };

  onRadioChange = (event: any) => {
    this.setState({
      onRadioChangeResult: `onRadioChange called with value: ${
        event.target.value
      }`,
    });
  };

  render() {
    return (
      <div>
        <FieldRadioGroup
          items={items}
          label="Pick a color:"
          onRadioChange={this.onRadioChange}
        />
        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          {this.state.onRadioChangeResult}
        </div>
      </div>
    );
  }
}
