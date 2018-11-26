// @flow

import type { ComponentType, ElementConfig } from 'react';
import type { Diffable } from '../common/types';
import ViewController from './ViewController';

export type ViewData = Array<{ [string]: any }>;
export type ViewID = string;
export type ViewLayer = 'product' | 'container';
type GetItemsSignature = () => Promise<ViewData> | ViewData;

export type View = {
  id: ViewID,
  type: ViewLayer,
  getItems: GetItemsSignature,
  /** Any data here is added to navigation context under the attributes key.
   * Allowing extra attributes to be sent for analytics events. */
  getAnalyticsAttributes?: (items: ViewData) => {},
};

export type ActiveView = {
  analyticsAttributes?: {} | void,
  id: ViewID,
  type: ViewLayer,
  data: ViewData,
};
type IncomingView = {
  id: ViewID,
  type: ?ViewLayer,
};

export type Reducer = ViewData => ViewData;

export type ViewControllerProps = {
  isDebugEnabled?: boolean,
};

export type ViewControllerState = {
  /** The view which is currently being rendered in the navigation. */
  activeView: ?ActiveView,
  /** The view which will become active once it has loaded. */
  incomingView: ?IncomingView,
};

export interface ViewControllerInterface {
  state: ViewControllerState;

  /** A map of all navigation views, keyed by their ID. */
  views: { [ViewID]: View };

  /** A map of reducer functions to be run over view items, keyed by the view's
   * ID. */
  reducers: { [ViewID]: Reducer[] };

  /** In debug mode the view controller will log information about the usage of
   * reducers. */
  isDebugEnabled: boolean;

  /** Register a view. You must provide an `id`, the `type` of view ('product'
   * or 'container'), and a `getItems` function which should return either an
   * array of data, or a Promise which will resolve to an array of data. */
  addView: View => void;

  /** Un-register a view. If the view being removed is active it will remain so
   * until a different view is set. */
  removeView: ViewID => void;

  /** Set the registered view with the given ID as the active view. */
  setView: ViewID => void;

  /** Add a reducer to the view with the given ID. */
  addReducer: (ViewID, Reducer) => void;

  /** Remove a reducer from the view with the given ID. */
  removeReducer: (ViewID, Reducer) => void;

  /** Will re-resolve the active view and re-reduce its data. Accepts an
   * optional view ID to only re-resolve if the given ID matches the active
   * view. */
  updateActiveView: (ViewID | void) => void;

  /** Set whether the view controller is in debug mode. */
  setIsDebugEnabled: boolean => void;
}

/**
 * withNavigationUIController
 */

export type WithNavigationViewControllerProps = {
  navigationViewController: ViewController,
};

export type ViewControllerWrappedComp<C> = ComponentType<
  $Diff<
    ElementConfig<$Supertype<C>>,
    Diffable<WithNavigationViewControllerProps>,
  >,
>;
