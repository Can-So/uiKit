// @flow
import React from 'react';

export class WithState extends React.Component<
  { defaultState: any, children: (any, Function) => any },
  { currentState: any },
> {
  state = {
    currentState: this.props.defaultState,
  };
  render() {
    return this.props.children(this.state.currentState, state =>
      this.setState({ currentState: state }),
    );
  }
}
