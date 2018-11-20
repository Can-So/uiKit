// @flow

import React, { Component, Fragment } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import { colors } from '@atlaskit/theme';
import Range from '../src';

const initialState = {
  min: 0,
  max: 100,
  step: 1,
  actualVal: 50,
  isDisabled: false,
  rtl: false,
};

export default class Playground extends Component<*, *> {
  state = initialState;

  render() {
    const { min, max, step, actualVal, isDisabled, rtl } = this.state;
    return (
      <Fragment>
        <p>Example Range (current value is {actualVal}):</p>
        <div dir={rtl ? 'rtl' : 'ltr'}>
          <Range
            min={min}
            max={max}
            step={step}
            value={actualVal}
            isDisabled={isDisabled}
            onChange={newVal => this.setState({ actualVal: newVal })}
          />
        </div>
        <div
          style={{ width: '100%', height: '1px', backgroundColor: colors.P400 }}
        />
        <Checkbox
          value="Toggle Disabled"
          label="Toggle Disabled"
          onChange={e => this.setState({ isDisabled: e.target.checked })}
          name="toggle-disabled"
        />
        <Checkbox
          value="Toggle right-to-left"
          label="Toggle right-to-left"
          onChange={e => this.setState({ rtl: e.target.checked })}
          name="toggle-rtl"
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
