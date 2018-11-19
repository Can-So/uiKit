// @flow

import type { ComponentType, Node } from 'react';
import type { WithNavigationUIControllerProps } from '../../../ui-controller/types';

import type {
  CollapseListeners,
  ExperimentalFeatureFlags,
  GetRefs,
} from '../../presentational/LayoutManager/types';

import type { WithNavigationViewControllerProps } from '../../../view-controller/types';

export type LayoutManagerWithViewControllerProps = {|
  ...$Exact<CollapseListeners>,
  ...$Exact<ExperimentalFeatureFlags>,
  ...$Exact<WithNavigationViewControllerProps>,
  ...$Exact<WithNavigationUIControllerProps>,
  children: Node,
  customComponents?: { [string]: ComponentType<*> },
  getRefs?: GetRefs,
  globalNavigation: ComponentType<{}>,
  firstSkeletonToRender?: 'product' | 'container',
|};

export type LayoutManagerWithViewControllerState = {
  hasInitialised: boolean,
};
