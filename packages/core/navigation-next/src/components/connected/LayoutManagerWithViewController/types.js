// @flow

import type { ComponentType, Node } from 'react';
import type { WithNavigationUIControllerProps } from '../../../ui-controller/types';
import type {
  CollapseListeners,
  ExperimentalFeatureFlags,
  GetRefs,
} from '../../presentational/LayoutManager/types';
import type { ActiveView } from '../../../view-controller/types';

export type LayoutManagerWithViewControllerProps = {|
  ...$Exact<CollapseListeners>,
  ...$Exact<ExperimentalFeatureFlags>,
  ...$Exact<WithNavigationUIControllerProps>,
  children: Node,
  customComponents?: { [string]: ComponentType<*> },
  firstSkeletonToRender?: 'product' | 'container',
  getRefs?: GetRefs,
  globalNavigation: ComponentType<{}>,
  view: ?ActiveView,
|};

export type LayoutManagerWithViewControllerState = {
  hasInitialised: boolean,
  outgoingView: ?ActiveView,
};
