// @flow

import React, { Component, Fragment } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import Range from '../src';

const initialState = {
  min: 0,
  max: 100,
  step: 1,
  actualVal: 50,
  isDisabled: false,
};

export default class Playground extends Component<*, *> {
  state = initialState;

  render() {
    const { min, max, step, actualVal, isDisabled } = this.state;
    return (
      <Fragment>
        <p>Example Range (current value is {actualVal}):</p>
        <Range
          min={min}
          max={max}
          step={step}
          value={actualVal}
          isDisabled={isDisabled}
          onChange={newVal => this.setState({ actualVal: newVal })}
        />
        <div
          style={{ width: '100%', height: '1px', backgroundColor: 'orange' }}
        />
        <Checkbox
          value="Toggle Disabled"
          label="Toggle Disabled"
          onChange={e => this.setState({ isDisabled: e.target.checked })}
          name="toggle-basic"
        />
        <p>The ranges below control the values in the range above</p>
        <p>Change minimum value (currently at {min})</p>
        <Range
          max={max}
          defaultValue={initialState.min}
          step={1}
          onChange={newMin => this.setState({ min: newMin })}
        />
        <p>Change maximum value (currently at {max})</p>
        <Range
          min={min}
          defaultValue={initialState.max}
          max={500}
          step={1}
          onChange={newMax => this.setState({ max: newMax })}
        />
        <p>Change step distance (currently at {step})</p>
        <Range
          max={50}
          defaultValue={initialState.step}
          onChange={newStep => this.setState({ step: newStep })}
        />
      </Fragment>
    );
  }
}
