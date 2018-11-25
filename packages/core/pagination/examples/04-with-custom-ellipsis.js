//@flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Pagination from '../src';

export default class extends Component<{}, { max: number }> {
  state = {
    max: 7,
  };

  handleEllipsisCLick = () => {
    this.setState({
      max: 10,
    });
  };

  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Pagination
          renderEllipsis={({ key }) => (
            <Button
              onClick={() => this.handleEllipsisCLick()}
              appearance="subtle"
              key={key}
              ariaLabel="expand"
            >
              ...
            </Button>
          )}
          max={this.state.max}
          pages={[...Array(10)].map((_, i) => i + 1)}
        />
      </div>
    );
  }
}
