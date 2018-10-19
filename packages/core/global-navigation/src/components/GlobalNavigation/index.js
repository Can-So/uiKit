// @flow

import React, { Component, Fragment } from 'react';
import type { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { GlobalNav } from '@atlaskit/navigation-next';
import { NotificationIndicator } from '@atlaskit/notification-indicator';
import {
  // NotificationLogProvider,
  NotificationLogClient,
} from '@atlaskit/notification-log-client';
import Drawer from '@atlaskit/drawer';
import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';
import generateDefaultConfig from '../../config/default-config';
import generateProductConfig from '../../config/product-config';
import ItemComponent from '../ItemComponent';
import ScreenTracker from '../ScreenTracker';
import { analyticsIdMap, fireDrawerDismissedEvents } from './analytics';
import { notificationIntegration } from '../../platform-integration';
import NotificationDrawerContents from '../../platform-integration/notification/components/NotificationDrawerContents';

import type { GlobalNavItemData, NavItem } from '../../config/types';
import type { GlobalNavigationProps, DrawerName } from './types';
import type { NotificationIntegration } from '../../platform-integration/notification/types';

// TODO: Figure out a way to appease flow without this function.
const mapToGlobalNavItem: NavItem => GlobalNavItemData = ({
  dropdownItems,
  icon,
  id,
  itemComponent,
  label,
  onClick,
  tooltip,
  component,
  badge,
  href,
  size,
}) => ({
  dropdownItems,
  icon,
  id,
  itemComponent,
  label,
  onClick,
  tooltip,
  component,
  badge,
  href,
  size,
});

const noop = () => {};

const externalContentUrl = '//www.atlassian.com';

const localStorage = typeof window === 'object' ? window.localStorage : {};

type GlobalNavigationState = {
  [any]: boolean, // Need an indexer property to appease flow for is${capitalisedDrawerName}Open
  isSearchDrawerOpen: boolean,
  isNotificationDrawerOpen: boolean,
  isStarredDrawerOpen: boolean,
  notificationBadgeCount: number,
  isCreateDrawerOpen: boolean,
  isSearchDrawerOpen: boolean,
  isNotificationDrawerOpen: boolean,
  isStarredDrawerOpen: boolean,
};

interface Global {
  [key: string]: boolean; // Need an indexer property to appease flow for is${capitalisedDrawerName}Controlled
  isSearchDrawerControlled?: boolean;
  isNotificationDrawerControlled?: boolean;
  isStarredDrawerControlled?: boolean;
}

// $FlowFixMe Flow has a bug with indexer properties in interfaces. https://github.com/facebook/flow/issues/6321
export default class GlobalNavigation
  extends Component<GlobalNavigationProps, GlobalNavigationState>
  implements Global {
  drawers: DrawerName[] = ['search', 'notification', 'starred', 'create'];
  notificationIntegrationInstance: NotificationIntegration;
  NotificationDrawer: any;
  NotificationBadge: any;

  constructor(props: GlobalNavigationProps) {
    super(props);

    this.state = {
      isCreateDrawerOpen: false,
      isSearchDrawerOpen: false,
      isNotificationDrawerOpen: false,
      isStarredDrawerOpen: false,
      notificationBadgeCount: 0,
    };

    this.drawers.forEach((drawer: DrawerName) => {
      this.updateDrawerControlledStatus(drawer, props);

      const capitalisedDrawerName = this.getCapitalisedDrawerName(drawer);

      if (
        props[`${drawer}DrawerContents`] &&
        !props[`on${capitalisedDrawerName}Close`]
      ) {
        /* eslint-disable no-console */
        console.warn(`You have provided an onClick handler for ${drawer}, but no close handler for the drawer.
        Please pass on${capitalisedDrawerName}Close prop to handle closing of the ${drawer} drawer.`);
        /* eslint-enable */
      }

      // Set it's initial state using a prop with the same name.
      this.state[`is${capitalisedDrawerName}Open`] =
        props[`is${capitalisedDrawerName}Open`];
    });
    const { fabricNotificationLogUrl, cloudId, locale, product } = this.props;

    this.notificationIntegrationInstance = notificationIntegration(
      fabricNotificationLogUrl,
      cloudId,
      locale,
      product,
      60000,
      this.onNotificationBadgeCountUpdated,
      this.onNotificationBadgeCountUpdating,
    );

    // TODO: Specific logic for Notification component
    // should be revisited
    this.NotificationDrawer = this.getNotificationDrawerContent();
    this.NotificationBadge = this.getNotificationBadgeIndicator();
  }

  componentDidUpdate(
    prevProps: GlobalNavigationProps,
    prevState: GlobalNavigationState,
  ) {
    this.drawers.forEach(drawer => {
      this.updateDrawerControlledStatus(drawer, this.props);

      const capitalisedDrawerName = this.getCapitalisedDrawerName(drawer);
      // Do nothing if it's a controlled drawer
      if (this[`is${capitalisedDrawerName}Controlled`]) {
        return;
      }

      if (
        prevProps[`is${capitalisedDrawerName}Open`] !==
        this.props[`is${capitalisedDrawerName}Open`]
      ) {
        // Update the state based on the prop
        this.setState({
          [`is${capitalisedDrawerName}Open`]: this.props[
            `is${capitalisedDrawerName}Open`
          ],
        });
      }
    });

    console.log('Checking props', this.props);

    const { fabricNotificationLogUrl, cloudId, locale, product } = this.props;

    if (
      prevProps.fabricNotificationLogUrl !== fabricNotificationLogUrl ||
      prevProps.cloudId !== cloudId ||
      prevProps.locale !== locale ||
      prevProps.product !== product ||
      !prevState.notificationBadgeCount !== !this.state.notificationBadgeCount
    ) {
      console.log('Updating the notification integration');
      const refreshRate = !this.state.notificationBadgeCount ? 60000 : 180000;

      this.notificationIntegrationInstance = notificationIntegration(
        fabricNotificationLogUrl,
        cloudId,
        locale,
        product,
        refreshRate,
        this.onNotificationBadgeCountUpdated,
        this.onNotificationBadgeCountUpdating,
      );

      this.NotificationDrawer = this.getNotificationDrawerContent();
      this.NotificationBadge = this.getNotificationBadgeIndicator();
    }
  }

  onNotificationBadgeCountUpdating = (
    param: { visibilityChangesSinceTimer?: number | void } = {},
  ) => {
    const { visibilityChangesSinceTimer = 0 } = param;
    if (!this.state.count || visibilityChangesSinceTimer <= 1) {
      // fetch the count
      return {};
    }

    // skip fetch, refresh from local storage if newer
    const cachedCount = this.getLocalStorageCount();
    const result = {};
    if (cachedCount && cachedCount !== this.state.notificationBadgeCount) {
      result.countOverride = parseInt(cachedCount, 10);
    } else {
      result.skip = true;
    }
    return result;
  };

  onNotificationBadgeCountUpdated = (param: { newCount?: number } = {}) => {
    console.log('Changed state count');
    const { newCount = 0 } = param;
    this.updateLocalStorageCount(newCount);
    this.setState({
      notificationBadgeCount: newCount,
    });
  };

  getLocalStorageCount = () => {
    try {
      return localStorage.getItem('notificationBadgeCountCache');
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  updateLocalStorageCount = (newCount: number) => {
    try {
      localStorage.setItem('notificationBadgeCountCache', newCount);
    } catch (e) {
      console.error(e);
    }
  };

  updateDrawerControlledStatus = (
    drawer: DrawerName,
    props: GlobalNavigationProps,
  ) => {
    const capitalisedDrawerName = this.getCapitalisedDrawerName(drawer);

    if (props[`on${capitalisedDrawerName.replace('Drawer', '')}Click`]) {
      this[`is${capitalisedDrawerName}Controlled`] = false;
    } else {
      // If a drawer doesn't have an onClick handler, mark it as a controlled drawer.
      this[`is${capitalisedDrawerName}Controlled`] = true;
    }
  };

  getCapitalisedDrawerName = (drawerName: DrawerName) => {
    return `${drawerName[0].toUpperCase()}${drawerName.slice(1)}Drawer`;
  };

  openDrawer = (drawerName: DrawerName) => () => {
    const capitalisedDrawerName = this.getCapitalisedDrawerName(drawerName);
    let onOpenCallback = noop;

    if (typeof this.props[`on${capitalisedDrawerName}Open`] === 'function') {
      onOpenCallback = this.props[`on${capitalisedDrawerName}Open`];
    }

    if (drawerName === 'notification') {
      onOpenCallback = this.notificationIntegrationInstance
        .onNotificationDrawerOpen;
    }

    // Update the state only if it's a controlled drawer.
    // componentDidMount takes care of the uncontrolled drawers
    if (this[`is${capitalisedDrawerName}Controlled`]) {
      this.setState(
        {
          [`is${capitalisedDrawerName}Open`]: true,
        },
        onOpenCallback,
      );
    } else {
      // invoke callback in both cases
      onOpenCallback();
    }
  };

  closeDrawer = (drawerName: DrawerName) => (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    const capitalisedDrawerName = this.getCapitalisedDrawerName(drawerName);
    let onCloseCallback = noop;

    if (typeof this.props[`on${capitalisedDrawerName}Close`] === 'function') {
      onCloseCallback = this.props[`on${capitalisedDrawerName}Close`];
    }

    if (drawerName === 'notification') {
      onCloseCallback = this.notificationIntegrationInstance
        .onNotificationDrawerClose;
    }

    fireDrawerDismissedEvents(drawerName, analyticsEvent);

    // Update the state only if it's a controlled drawer.
    // componentDidMount takes care of the uncontrolled drawers
    if (this[`is${capitalisedDrawerName}Controlled`]) {
      this.setState(
        {
          [`is${capitalisedDrawerName}Open`]: false,
        },
        onCloseCallback,
      );
    } else {
      // invoke callback in both cases
      onCloseCallback();
    }
  };

  getNotificationBadgeIndicator = () => {
    const refreshRate = !this.state.notificationBadgeCount ? 60000 : 180000;
    const {
      fabricNotificationLogUrl,
      cloudId,
      notificationLogProvider: NotificationLogProviderProps,
    } = this.props;

    let notificationClient;
    if (NotificationLogProviderProps) {
      notificationClient = NotificationLogProviderProps;
    } else {
      notificationClient = new NotificationLogClient(
        fabricNotificationLogUrl,
        cloudId,
      );
    }
    const NotificationBadger = () => (
      <NotificationIndicator
        notificationLogProvider={Promise.resolve(notificationClient)}
        refreshRate={refreshRate}
        onCountUpdated={this.onNotificationBadgeCountUpdated}
        onCountUpdating={this.onNotificationBadgeCountUpdating}
      />
    );
    return NotificationBadger;
  };

  getNotificationDrawerContent = () => {
    const { locale, product } = this.props;

    const NotificationDrawer = () => (
      <NotificationDrawerContents
        externalContentUrl={externalContentUrl}
        locale={locale}
        product={product}
      />
    );
    return NotificationDrawer;
  };

  constructNavItems = () => {
    const productConfig = generateProductConfig(this.props, this.openDrawer);
    const defaultConfig = generateDefaultConfig();

    const { badge } = this.notificationIntegrationInstance;
    console.log('Getting the badge from notification integration');

    const navItems: NavItem[] = Object.keys(productConfig).map(item => ({
      ...(productConfig[item]
        ? {
            ...defaultConfig[item],
            ...productConfig[item],
            ...(item === 'notification' ? { badge } : {}),
            ...(item === 'notification'
              ? { badge: this.NotificationBadge }
              : {}),
          }
        : null),
    }));

    return {
      primaryItems: navItems
        .filter(({ section }) => section === 'primary')
        .sort(({ rank: rank1 }, { rank: rank2 }) => rank1 - rank2)
        .map(mapToGlobalNavItem),
      secondaryItems: navItems
        .filter(({ section }) => section === 'secondary')
        .sort(({ rank: rank1 }, { rank: rank2 }) => rank1 - rank2)
        .map(mapToGlobalNavItem),
    };
  };

  render() {
    // TODO: Look into memoizing this to avoid memory bloat
    const { primaryItems, secondaryItems } = this.constructNavItems();
    const { notificationDrawerContents } = this.notificationIntegrationInstance;

    return (
      <NavigationAnalyticsContext
        data={{
          packageName,
          packageVersion,
          componentName: 'globalNavigation',
        }}
      >
        <Fragment>
          <GlobalNav
            itemComponent={ItemComponent}
            primaryItems={primaryItems}
            secondaryItems={secondaryItems}
          />
          {this.drawers.map(drawer => {
            const capitalisedDrawerName = this.getCapitalisedDrawerName(drawer);
            const DrawerContents =
              drawer === 'notification'
                ? notificationDrawerContents
                : this.props[`${drawer}DrawerContents`];
            const shouldUnmountOnExit = this.props[
              `should${capitalisedDrawerName}UnmountOnExit`
            ];

            if (!DrawerContents) {
              return null;
            }

            return (
              <Drawer
                key={drawer}
                isOpen={this.state[`is${capitalisedDrawerName}Open`]}
                onClose={this.closeDrawer(drawer)}
                shouldUnmountOnExit={shouldUnmountOnExit}
                width="wide"
              >
                <ScreenTracker
                  name={analyticsIdMap[drawer]}
                  isVisible={this.state[`is${capitalisedDrawerName}Open`]}
                />
                <div>
                  <DrawerContents />
                </div>
              </Drawer>
            );
          })}
        </Fragment>
      </NavigationAnalyticsContext>
    );
  }
}
