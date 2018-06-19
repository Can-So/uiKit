// @flow

import React, { Children, Component, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import Blanket from '@atlaskit/blanket';

import DrawerPrimitive from './primitives';
import { Fade } from './transitions';
import type { DrawerProps } from './types';

const OnlyChild = ({ children }) => Children.toArray(children)[0] || null;

class Drawer extends Component<DrawerProps> {
  portalContainer = document.createElement('div');
  body = document.querySelector('body');

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    if (this.body) {
      this.body.appendChild(this.portalContainer);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.body) {
      this.body.removeChild(this.portalContainer);
    }
  }

  handleClose = event => {
    const { onClose } = this.props;

    if (onClose) {
      onClose(event);
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    const { onKeyDown } = this.props;

    if (event.key === 'Escape') {
      this.handleClose(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render() {
    const { isOpen, ...props } = this.props;
    return createPortal(
      <TransitionGroup component={OnlyChild}>
        <Fragment>
          {/* $FlowFixMe the `in` prop is internal */}
          <Fade in={isOpen}>
            <Blanket isTinted onBlanketClicked={this.handleClose} />
          </Fade>
          <DrawerPrimitive in={isOpen} {...props} />
        </Fragment>
      </TransitionGroup>,
      this.portalContainer,
    );
  }
}

export default (props: *) => <Drawer {...props} />;
