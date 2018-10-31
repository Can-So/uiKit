// @flow

import { Component, type Node } from 'react';

type Props = {
  children: Node,
  blockOnChange: boolean,
};

/**
 * This component blocks render unless any non-children props change via shallow comparison.
 *
 * Alternatively if `blockOnChange` is set, render will only be blocked when another non-children prop changes.
 * For example, if you know you do not want to re-render when a certain prop changes (use with care).
 */
export default class RenderBlocker extends Component<Props> {
  static defaultProps = {
    blockOnChange: false,
  };

  shouldComponentUpdate(prevProps: Props) {
    const { blockOnChange, children, ...props } = this.props;

    const propsChanged = Object.keys(props).some(
      propName => props[propName] !== prevProps[propName],
    );

    return this.props.blockOnChange ? !propsChanged : propsChanged;
  }

  render() {
    return this.props.children;
  }
}
