// @flow
import React, { Component } from 'react';
import Flag from '../Flag';
import type { AutoDismissFlagProps } from '../../types';

export const AUTO_DISMISS_SECONDS = 15;

export default class AutoDismissFlag extends Component<
  AutoDismissFlagProps,
  {},
> {
  props: AutoDismissFlagProps; // eslint-disable-line react/sort-comp

  autoDismissTimer: ?TimeoutID;

  componentDidMount() {
    this.startAutoDismissTimer();
  }

  componentWillUnmount() {
    this.stopAutoDismissTimer();
  }

  componentDidUpdate(prevProps: AutoDismissFlagProps) {
    if (this.props.isDismissAllowed && !prevProps.isDismissAllowed) {
      this.startAutoDismissTimer();
    } else if (!this.props.isDismissAllowed && prevProps.isDismissAllowed) {
      this.stopAutoDismissTimer();
    }
  }

  startAutoDismissTimer = () => {
    if (!this.isAutoDismissAllowed()) {
      return;
    }

    this.stopAutoDismissTimer();
    this.autoDismissTimer = setTimeout(
      this.handleAutoDismissTimerEnd,
      AUTO_DISMISS_SECONDS * 1000,
    );
  };

  stopAutoDismissTimer = () => {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
      this.autoDismissTimer = null;
    }
  };

  dismissFlag = () => {
    if (this.isAutoDismissAllowed() && this.props.onDismissed) {
      this.props.onDismissed(this.props.id);
    }
  };

  handleAutoDismissTimerEnd = () => {
    this.dismissFlag();
  };

  handleInteractionStart = () => {
    this.stopAutoDismissTimer();
  };

  isAutoDismissAllowed = () =>
    this.props.isDismissAllowed && this.props.onDismissed;

  handleInteractionEnd = () => {
    this.startAutoDismissTimer();
  };

  render() {
    return (
      <Flag
        onMouseOver={this.handleInteractionStart}
        onFocus={this.handleInteractionStart}
        onMouseOut={this.handleInteractionEnd}
        onBlur={this.handleInteractionEnd}
        {...this.props}
      />
    );
  }
}
