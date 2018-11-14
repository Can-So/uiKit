// @flow

import type { ComponentType, Node } from 'react';
import type { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import type { WithNavigationUIControllerProps } from '../../../ui-controller/types';
import type {
  CollapseListeners,
  ExperimentalFeatureFlags,
  GetRefs,
} from '../../presentational/LayoutManager/types';
import type {
  ActiveView,
  ViewControllerState,
} from '../../../view-controller/types';

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

export type LayerInitialisedProps = {
  ...$Exact<WithAnalyticsEventsProps>,
  activeView: $PropertyType<ViewControllerState, 'activeView'>,
  initialised: boolean,
  onInitialised?: () => void,
};
