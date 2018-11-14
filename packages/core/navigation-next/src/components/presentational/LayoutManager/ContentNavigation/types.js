// @flow

import type { ComponentType, Node } from 'react';

import type { ProductTheme } from '../../../../theme';

export type ContentNavigationProps = {
  container?: ?ComponentType<{}>,
  isPeekHinting: boolean,
  isPeeking: boolean,
  isVisible: boolean,
  product: ComponentType<{}>,
};

export type ContainerNavigationPrimitiveProps = {|
  children: Node,
  isEntering: boolean,
  isExiting: boolean,
  isPeekHinting: boolean,
  isPeeking: boolean,
|};

export type ContainerNavigationPrimitiveBaseProps = {|
  ...ContainerNavigationPrimitiveProps,
  theme: ProductTheme,
|};
