// @flow

import type { ComponentType, Node } from 'react';

import type { ProductTheme } from '../../../../theme';

export type ContentNavigationProps = {
  container?: ?ComponentType<{}>,
  isVisible: boolean,
  product: ComponentType<{}>,
};

export type ContentNavigationState = {|
  cachedContainer: ?ComponentType<{||}>,
|};

export type ContainerNavigationPrimitiveProps = {|
  children: Node,
  isEntering: boolean,
  isExiting: boolean,
|};

export type ContainerNavigationPrimitiveBaseProps = {|
  ...ContainerNavigationPrimitiveProps,
  theme: ProductTheme,
|};
