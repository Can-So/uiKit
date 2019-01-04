// @flow
import React, { Component } from 'react';
import Tooltip from '@atlaskit/tooltip';
import Range from '../src';

export default class SimpleRange extends Component<*, *> {
  state = {
    value: 50,
  };

  render() {
    return (
      <div style={{ paddingTop: '40px' }}>
        <Tooltip position="top" content={this.state.value}>
          <Range
            step={1}
            value={this.state.value}
            onChange={value => this.setState({ value })}
          />
        </Tooltip>
      </div>
    );
  }
}
