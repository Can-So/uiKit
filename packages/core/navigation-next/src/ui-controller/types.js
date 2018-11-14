// @flow

import type { ComponentType, ElementConfig, Node } from 'react';

import type { Diffable } from '../common/types';

import UIController from './UIController';

/**
 * UIController
 */
export type InitialUIControllerShape = {
  isCollapsed?: boolean,
  isResizeDisabled?: boolean,
  productNavWidth?: number,
};

export type UIControllerCacheShape = {
  isCollapsed: boolean,
  productNavWidth: number,
};

export type UIControllerShape = {
  /** Whether the navigation is currently collapsed. */
  isCollapsed: boolean,
  /** Whether the navigation is currently being resized. */
  isResizing: boolean,
  /** Whether expanding, collapsing, and resizing are currently disabled. */
  isResizeDisabled: boolean,
  /** The width of the content navigation area. */
  productNavWidth: number,
};

export type UIControllerCacheGetter = () => UIControllerCacheShape;

export type UIControllerCacheSetter = UIControllerCacheShape => void;

export type UIControllerCache = {
  get: UIControllerCacheGetter,
  set: UIControllerCacheSetter,
};

export interface UIControllerInterface {
  state: UIControllerShape;

  /** Collapsed the content navigation. */
  collapse: () => void;
  /** Expand the content navigation. */
  expand: () => void;
  /** Toggle the collapse/expand state of the content navigation. */
  toggleCollapse: () => void;
}

/**
 * UIControllerSubscriber
 */
export type UIControllerSubscriberProps = {
  children: UIController => Node,
};

/**
 * withNavigationUIController
 */

export type WithNavigationUIControllerProps = {
  navigationUIController: UIController,
};

export type UIControllerWrappedComp<C> = ComponentType<
  $Diff<
    ElementConfig<$Supertype<C>>,
    Diffable<WithNavigationUIControllerProps>,
  >,
>;
