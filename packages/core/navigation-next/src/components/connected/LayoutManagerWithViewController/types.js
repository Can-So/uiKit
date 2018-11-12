// @flow

import type { ComponentType, Node } from 'react';
import type { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import UIController from '../../../ui-controller/UIController';

import type {
  CollapseListeners,
  ExperimentalFeatureFlags,
  GetRefs,
} from '../../presentational/LayoutManager/types';

import type {
  ActiveView,
  ViewControllerState,
} from '../../../view-controller/types';

export type LayoutManagerWithViewControllerProps = CollapseListeners &
  ExperimentalFeatureFlags & {
    children: Node,
    customComponents: { [string]: ComponentType<*> },
    getRefs?: GetRefs,
    globalNavigation: ComponentType<{}>,
    navigationUIController: UIController,
    firstSkeletonToRender?: 'product' | 'container',
    view: ?ActiveView,
  };

export type LayoutManagerWithViewControllerState = {
  hasInitialised: boolean,
  outgoingView: ?ActiveView,
};

export type LayerInitialisedProps = WithAnalyticsEventsProps & {
  activeView: $PropertyType<ViewControllerState, 'activeView'>,
  initialised: boolean,
  onInitialised?: () => void,
};
