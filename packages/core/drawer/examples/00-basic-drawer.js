// @flow

import React, { Fragment, Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '../src';

type State = {
  isDrawerOpen: boolean,
};
export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  closeDrawer = () =>
    this.setState({
      isDrawerOpen: false,
    });

  render() {
    return (
      <Fragment>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <code>Drawer contents</code>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </Fragment>
    );
  }
}
