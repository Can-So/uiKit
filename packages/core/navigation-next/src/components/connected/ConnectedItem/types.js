// @flow

import type { ComponentType, ElementConfig } from 'react';
import type { ItemPresentationProps } from '../../presentational/Item/types';
import Item from '../../presentational/Item';

type ItemWithoutAfter = $Diff<
  ElementConfig<$Supertype<typeof Item>>,
  { after: any },
>;

export type ConnectedItemProps = {
  ...$Exact<ItemWithoutAfter>,
  /** See 'after' prop of presentational Item. Can be set to null to avoid goTo's default after icon. */
  after?: ComponentType<ItemPresentationProps> | null,
  /** Deprecated: Do not use. */
  icon?: string,
  /** The view ID that should be transitioned to onClick. */
  goTo?: string,
};
