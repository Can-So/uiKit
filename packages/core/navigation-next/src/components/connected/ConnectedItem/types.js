// @flow

import type { ElementConfig } from 'react';
import type { ItemBaseProps as PresentationalItemProps } from '../../presentational/Item/types';

import Item from '../../presentational/Item';

export type ConnectedItemProps = {|
  ...$Exact<ElementConfig<typeof Item>>,
  /** See 'after' prop of presentational Item. */
  after?: $PropertyType<PresentationalItemProps, 'after'> | null,
  /** Deprecated: Do not use. */
  icon?: string,
  /** The view ID that should be transitioned to onClick. */
  goTo?: string,
|};
