import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { Switcher, withAnalyticsLogger } from './helpers';
import ErrorBoundary from '../src/components/error-boundary';

class SwitcherExample extends Component {
  state = {
    isDrawerOpen: true,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <ErrorBoundary>
            <Switcher />
          </ErrorBoundary>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}

export default withAnalyticsLogger(SwitcherExample);
