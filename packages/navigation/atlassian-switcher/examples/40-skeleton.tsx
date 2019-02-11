import React, { Component } from 'react';
import AkDrawer from '@atlaskit/drawer';
import AkButton from '@atlaskit/button';
import Skeleton from '../src/primitives/skeleton';

export default class SkeletonExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    this.openDrawer();
  }

  openDrawer = () => {
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
        <AkDrawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <Skeleton />
        </AkDrawer>
        <AkButton type="button" onClick={this.openDrawer}>
          Open drawer
        </AkButton>
      </div>
    );
  }
}
