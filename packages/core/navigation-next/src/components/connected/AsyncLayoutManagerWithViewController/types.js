// @flow

import type { ComponentType, Node } from 'react';
import type { WithNavigationUIControllerProps } from '../../../ui-controller/types';
import { UIController } from '../../../ui-controller';
import { ViewController } from '../../../view-controller';
import type {
  CollapseListeners,
  ExperimentalFeatureFlags,
  GetRefs,
} from '../../presentational/LayoutManager/types';

import type { WithNavigationViewControllerProps } from '../../../view-controller/types';

export type AsyncLayoutManagerWithViewControllerProps = {|
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
  viewRenderer: ComponentType<*>,
|};

export type AsyncLayoutManagerWithViewControllerState = {
  hasInitialised: boolean,
};
