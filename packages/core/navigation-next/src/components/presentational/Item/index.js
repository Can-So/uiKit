// @flow

import React, { PureComponent } from 'react';

import { navigationItemClicked } from '../../../common/analytics';
import InteractionStateManager from '../InteractionStateManager';
import type { InteractionState } from '../InteractionStateManager/types';
import { styleReducerNoOp } from '../../../theme';
import ItemPrimitive from './primitives';
import type { ItemProps } from './types';

class Item extends PureComponent<ItemProps> {
  static defaultProps = {
    styles: styleReducerNoOp,
    isSelected: false,
    spacing: 'default',
    text: '',
  };

  renderItem = (state: InteractionState) => {
    const { createAnalyticsEvent, ...props } = this.props;
    return <ItemPrimitive {...state} {...props} />;
  };

  render() {
    return <InteractionStateManager>{this.renderItem}</InteractionStateManager>;
  }
}

export { Item as ItemBase };

export default navigationItemClicked(Item, 'item');
