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
  ViewControllerState,
  WithNavigationViewControllerProps,
} from '../../../view-controller/types';

export type LayoutManagerWithViewControllerProps = {|
  ...$Exact<CollapseListeners>,
  ...$Exact<ExperimentalFeatureFlags>,
  ...$Exact<WithNavigationViewControllerProps>,
  ...$Exact<WithNavigationUIControllerProps>,
  children: Node,
  customComponents?: { [string]: ComponentType<*> },
  getRefs?: GetRefs,
  globalNavigation: ComponentType<{}>,
  containerSkeleton: ComponentType<{}>,
  navigationUIController: UIController,
  navigationViewController: ViewController,
  firstSkeletonToRender?: 'product' | 'container',
|};

export type LayoutManagerWithViewControllerState = {
  hasInitialised: boolean,
};

export type LayerInitialisedProps = {
  ...$Exact<WithAnalyticsEventsProps>,
  activeView: $PropertyType<ViewControllerState, 'activeView'>,
  initialised: boolean,
  onInitialised?: () => void,
};
