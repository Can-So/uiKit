// @flow
import { Component, type Node } from 'react';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types'; // eslint-disable-line import/no-extraneous-dependencies

export type ChildrenType = Node;
export type ComponentType = PropType<Component<{}, {}, {}>, any>;
export type ElementType = PropType<Element<mixed>, any>;
export type FunctionType = (...args: Array<any>) => mixed;
export type KeyboardOrMouseEvent =
  | SyntheticMouseEvent<any>
  | SyntheticKeyboardEvent<any>;
export type AppearanceType = 'danger' | 'warning';
