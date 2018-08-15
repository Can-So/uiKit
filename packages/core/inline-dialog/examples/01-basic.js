// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '../src';

type State = {
  dialogOpen: boolean,
};

const content = (
  <div>
    <p>Hello!</p>
  </div>
);

export default class InlineDialogExample extends Component<{}, State> {
  state = {
    dialogOpen: false,
  };

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen });

  render() {
    return (
      <div style={{ minHeight: '120px' }}>
        <InlineDialog content={content} isOpen={this.state.dialogOpen}>
          <Button
            isSelected={this.state.dialogOpen}
            onClick={this.toggleDialog}
          >
            Click me!
          </Button>
        </InlineDialog>
      </div>
    );
  }
}
