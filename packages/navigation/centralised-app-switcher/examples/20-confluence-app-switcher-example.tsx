import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import ConfluenceAppSwitcher from '../src/components/confluence-app-switcher';
import { mockEndpoints } from './helpers/mock-endpoints';

export default class ConfluenceAppSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () => {
    mockEndpoints('confluence');
    this.setState({
      isDrawerOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <ConfluenceAppSwitcher cloudId="some-cloud-id" />
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
