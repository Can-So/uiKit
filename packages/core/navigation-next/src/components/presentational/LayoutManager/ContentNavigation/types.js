// @flow

import type { ComponentType } from 'react';

export type ContentNavigationProps = {
  container?: ?ComponentType<{}>,
  isVisible: boolean,
  product: ComponentType<{}>,
};

export type ContentNavigationState = {
  cachedContainer: ?ComponentType<{||}>,
};
