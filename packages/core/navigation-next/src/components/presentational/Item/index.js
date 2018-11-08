// @flow

import React, { PureComponent } from 'react';
import {
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@atlaskit/analytics-next';

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

  renderItem = (state: InteractionState) => (
    <ItemPrimitive {...state} {...this.props} />
  );

  render() {
    return (
      <InteractionStateManager {...this.props}>
        {this.renderItem}
      </InteractionStateManager>
    );
  }
}

export { Item as ItemBase };

// export default navigationItemClicked(Item, 'item');

// FIXME: Use navigationItemClicked
export default withAnalyticsContext({
  componentName: 'item',
})(
  withAnalyticsEvents({
    onClick: (createAnalyticsEvent, props) => {
      // const id = kebabToCamelCase(props.id);
      const id = props.id;
      const basePayload = {
        action: 'clicked',
        actionSubject: 'navigationItem',
        attributes: {
          // componentName,
          // iconSource:
          //   getDisplayName(props.icon) || getDisplayName(props.before),
          navigationItemIndex: props.index,
        },
      };

      // let payload: ContainerItemClicked | GlobalItemClicked;
      const { attributes, ...basePayloadSansAttributes } = basePayload;
      const payload = {
        ...basePayloadSansAttributes,
        attributes: { ...attributes, itemId: id },
      };
      const event = createAnalyticsEvent(payload);

      event.fire('abc');

      return null;
    },
  })(Item),
);
