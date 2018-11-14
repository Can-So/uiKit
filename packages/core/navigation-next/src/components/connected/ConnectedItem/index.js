// @flow

import React, { Component } from 'react';

import GoToItem from '../GoToItem';
import PresentationalItem from '../../presentational/Item';
import type { ConnectedItemProps } from './types';

export default class ConnectedItem extends Component<ConnectedItemProps> {
  render() {
    return this.props.goTo ? (
      <GoToItem {...this.props} />
    ) : (
      <PresentationalItem {...this.props} />
    );
  }
}
