// @flow

import React, { Component, type Node } from 'react';
import invariant from 'tiny-invariant';
import ReactFocusLock from 'react-focus-lock';

type Props = {
  /**
    Boolean indicating whether to focus on the first tabbable element inside the focus lock.
  */
  autoFocus: boolean | (() => HTMLElement | null),
  /**
    Content inside the focus lock.
  */
  children?: Node,
  /**
    Whether the focus lock is active or not.
  */
  enabled: boolean,
  /**
    Whether to return the focus to the previous active element.
  */
  returnFocus: boolean,
};

// Thin wrapper over react-focus-lock. This wrapper only exists to ensure API compatibility.
// This component should be deleted during https://ecosystem.atlassian.net/browse/AK-5658
export default class FocusLock extends Component<Props> {
  static defaultProps = {
    autoFocus: true,
    enabled: true,
    returnFocus: true,
  };

  componentDidMount() {
    const { enabled, autoFocus } = this.props;

    invariant(
      process.env !== 'DEV' && typeof autoFocus === 'function',
      '@atlaskit/modal-dialog: Passing a function as autoFocus is deprecated. Instead call focus on the element ref or use the autofocus property.',
    );
    if (typeof autoFocus === 'function' && enabled) {
      const elem = autoFocus();
      if (elem && elem.focus) {
        elem.focus();
      }
    }
  }

  render() {
    const { enabled, autoFocus, returnFocus } = this.props;
    return (
      <ReactFocusLock
        disabled={!enabled}
        autoFocus={!!autoFocus}
        returnFocus={returnFocus}
      >
        {this.props.children}
      </ReactFocusLock>
    );
  }
}
