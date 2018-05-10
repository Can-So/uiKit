// @flow

import React, { PureComponent, Fragment } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import { css as parseJss } from 'emotion';

import { transitionDurationMs } from '../../common/constants';
import { getSectionWrapperStyles } from './styles';
import type { SectionProps, SectionState } from './types';

export default class Section extends PureComponent<SectionProps, SectionState> {
  state = {
    traversalDirection: null,
  };

  componentWillReceiveProps(nextProps: SectionProps) {
    if (nextProps.parentId && nextProps.parentId === this.props.id) {
      this.setState({ traversalDirection: 'down' });
    }
    if (this.props.parentId && this.props.parentId === nextProps.id) {
      this.setState({ traversalDirection: 'up' });
    }
  }

  render() {
    const { id, children } = this.props;

    return (
      <TransitionGroup component={Fragment}>
        <Transition key={id} timeout={transitionDurationMs}>
          {state => {
            const { traversalDirection } = this.state;
            const css = getSectionWrapperStyles({ state, traversalDirection });
            const className = parseJss(css);

            // We provide both the styles object and the computed className.
            // This allows consumers to patch the styles if they want to, or
            // simply apply the className if they're not using a JSS parser like
            // emotion.
            return children({ className, css });
          }}
        </Transition>
      </TransitionGroup>
    );
  }
}
