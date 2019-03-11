// @flow

import type { ComponentType, ElementRef, Node } from 'react';

import type { WithNavigationUIControllerProps } from '../../../ui-controller/types';
import type { CollapseListener } from '../ResizeTransition/types';

export type CollapseToggleTooltipContent = (
  isCollapsed: boolean,
) => { text: string, char: string };

export type CollapseListeners = {|
  /** Called when the navigation begins expanding. */
  onExpandStart?: CollapseListener,
  /** Called when the navigation completes expanding. */
  onExpandEnd?: CollapseListener,
  /** Called when the navigation begins collapsing. */
  onCollapseStart?: CollapseListener,
  /** Called when the navigation completes collapsing. */
  onCollapseEnd?: CollapseListener,
|};

type NonStringRef<T> = {
  current: ElementRef<T> | null,
};

export type ExperimentalFeatureFlags = {|
  /**
    NOTE: This property is experimental and may be removed in a minor release.

    Allow the user to invoke a partial display of the navigation when they
    mouse over the nav area whilst in a collapsed state.
  */
  experimental_flyoutOnHover: boolean,
  /**
    NOTE: This property is experimental and may be removed in a minor release.

    FF to control the flyout activation area according to
    https://product-fabric.atlassian.net/browse/NAV-197
    This FF works in tandem with the other FF -> experimental_flyoutOnHover.
    Setting this prop to true will have no effect unless the other is
    set to true as well.
  */
  experimental_alternateFlyoutBehaviour: boolean,

  /**
    NOTE: This property is experimental and may be removed in a minor release.

    Expands the flyout to custom width set by the user by resizing the nav,
    rather the default flyout width.
    This FF has no effect if experimental_flyoutOnHover is set to false.
  */
  experimental_fullWidthFlyout: boolean,
|};

export type GetRefs = ({
  expandCollapseAffordance: NonStringRef<'button'>,
}) => void;

type Dataset = { [name: string]: string | typeof undefined };

export type ConnectedLayoutManagerProps = {
  /** Your page content. */
  children: Node,
  /** A component which will render the container navigation layer. */
  containerNavigation: ?ComponentType<{}>,
  /** A map of data attributes applied to the global and contextual navigation elements. */
  datasets?: {|
    globalNavigation: Dataset,
    contextualNavigation: Dataset,
    navigation: Dataset,
  |},
  /** A function to access the refs of some elements within the LayoutManager
   * component. */
  getRefs?: GetRefs,
  /** A component which will render the global navigation bar. */
  globalNavigation: ComponentType<{}>,
  /** A component which will render the product navigation layer. */
  productNavigation: ComponentType<{}>,
  /** Displayed when the user's mouse is over the collapse/expand toggle. */
  collapseToggleTooltipContent: CollapseToggleTooltipContent,
  ...$Exact<CollapseListeners>,
  ...$Exact<ExperimentalFeatureFlags>,
  /** The top offset value to be used in navigation */
  topOffset?: number,
};

export type LayoutManagerProps = {
  ...$Exact<ConnectedLayoutManagerProps>,
  ...$Exact<WithNavigationUIControllerProps>,
};
