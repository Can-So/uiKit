// @flow
import React, { Component } from 'react';
import { RadioGroup } from '../src';

const radioValues = [
  { name: 'color', value: 'blue', label: 'Blue' },
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'purple', label: 'Purple' },
];

type State = {
  selectedValue: string,
};

export default class ControlledRadioGroup extends Component<*, State> {
  onChange = (event: SyntheticEvent<*>) => {
    console.log('onChange called with value: ', event.currentTarget.value);
  };
  render() {
    return (
      <RadioGroup
        label={'Pick a color'}
        onChange={this.onChange}
        defaultSelectedValue={radioValues[2].value}
        items={radioValues}
      />
    );
  }
}
