// @flow

import React, { Fragment, Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '../src';

type Widths = 'narrow' | 'wide' | 'full';
type State = {
  isDrawerOpen: boolean,
  width: Widths,
};
export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
    width: 'narrow',
  };
  widths = ['narrow', 'wide', 'full'];

  openDrawer = (width: Widths) => () =>
    this.setState({
      isDrawerOpen: true,
      width,
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
          width={this.state.width}
        >
          <code
            css={{
              textTransform: 'capitalize',
            }}
          >{`${this.state.width} drawer contents`}</code>
        </Drawer>
        {this.widths.map(width => (
          <Button
            onClick={this.openDrawer(width)}
            type="button"
            key={width}
            css={{
              marginRight: '1rem',
            }}
          >{`Open ${width} Drawer`}</Button>
        ))}
      </Fragment>
    );
  }
}
