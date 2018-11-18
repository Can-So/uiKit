// @flow

import type { ComponentType, ElementConfig } from 'react';
import GlobalItem from '../GlobalItem';
import type { GlobalTheme } from '../../../theme/types';

type ItemDataShape = {
  id: string,
  ...$Exact<ElementConfig<typeof GlobalItem>>,
};

export type ConnectedGlobalNavigationProps = {
  /* The component used to render the `primaryItems` and `secondaryItems`. By
   * default this will render a `GlobalItem`.
   */
  itemComponent: ComponentType<*>,
  /* An array of objects to render as GlobalItems at the top of the GlobalNavigation
   * bar.
   */
  primaryItems: ItemDataShape[],
  /* An array of objects to render as GlobalItems at the bottom of the
   * GlobalNavigation bar.
   */
  secondaryItems: ItemDataShape[],
};

export type GlobalNavigationProps = GlobalNavigationProps & {
  theme: GlobalTheme,
};
