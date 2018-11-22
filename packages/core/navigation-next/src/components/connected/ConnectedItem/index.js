// @flow

import React, { Component } from 'react';

import GoToItem from '../GoToItem';
import PresentationalItem from '../../presentational/Item';
import type { ConnectedItemProps } from './types';

export default class ConnectedItem extends Component<ConnectedItemProps> {
  render() {
    const { after, ...props } = this.props;

    return this.props.goTo ? (
      <GoToItem {...props} after={after} />
    ) : (
      <PresentationalItem
        {...props}
        after={after === null ? undefined : after}
      />
    );
  }
}
