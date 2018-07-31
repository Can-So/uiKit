// @flow

import React, { Component, type Node } from 'react';
import { Consumer, Provider } from '../components/Context';

type Props<A> = {
  children: (A => Node) | Node,
  values: (*) => A,
};

export default class Theme<A: {}> extends Component<Props<A>> {
  static defaultProps = {
    values: (v: *): A => v,
  };
  render() {
    const { children, values } = this.props;
    return (
      <Consumer>
        {theme => {
          const merged = values(theme);
          return typeof children === 'function' ? (
            children(merged)
          ) : (
            <Provider value={merged}>{children}</Provider>
          );
        }}
      </Consumer>
    );
  }
}
