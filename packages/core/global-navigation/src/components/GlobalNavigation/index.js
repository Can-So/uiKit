// @flow

import React, { Component, Fragment } from 'react';
import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';
import Avatar from '@atlaskit/avatar';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import PeopleIcon from '@atlaskit/icon/glyph/people';

import { GlobalNav, NavigationSubscriber } from '../../../';

import Drawer from '../Drawer';
import type {
  GlobalNavigationProps,
  WrappedGlobalNavigationProps,
} from './types';

// By default we will render a button which toggles the peek behaviour. The
// consumer can opt out of this by passing their own handler or `false` to the
// onClick prop, or by passing a href (which will render an <a>).
const getProductPrimaryItemComponent = navigation => ({
  className,
  children,
  href,
  onClick,
  target,
}: *) =>
  href ? (
    <a
      className={className}
      href={href}
      onClick={onClick || null}
      target={target}
    >
      {children}
    </a>
  ) : (
    <button
      className={className}
      onClick={
        typeof onClick !== 'undefined' ? onClick || null : navigation.togglePeek
      }
    >
      {children}
    </button>
  );

class GlobalNavigation extends Component<WrappedGlobalNavigationProps> {
  static defaultProps = {
    primaryActions: [],
    secondaryActions: [],
  };

  constructPrimaryItems = () => {
    const { create, product, search, primaryActions, navigation } = this.props;

    const inbuiltPrimaryItems = [];

    if (product) {
      inbuiltPrimaryItems.push({
        ...product,
        component: getProductPrimaryItemComponent(navigation),
      });
    }

    if (search) {
      const defaultSearch = {
        icon: SearchIcon,
        label: 'Search',
        onClick: navigation.openSearchDrawer,
        tooltip: 'Search',
      };
      inbuiltPrimaryItems.push({ ...defaultSearch, ...search });
    }

    if (create) {
      const defaultCreate = {
        icon: CreateIcon,
        label: 'Create',
        onClick: navigation.openCreateDrawer,
        tooltip: 'Create',
      };
      inbuiltPrimaryItems.push({ ...defaultCreate, ...create });
    }

    return [...inbuiltPrimaryItems, ...primaryActions];
  };

  constructSecondaryItems = () => {
    const {
      secondaryActions,
      navigation,
      help = {},
      profile = {},
      appSwitcher = {},
      notification,
      people,
    } = this.props;
    const inbuiltSecondaryItems = [];

    if (notification) {
      const defaultNotifications = {
        icon: NotificationIcon,
        label: 'Notifications',
        onClick: navigation.openNotificationDrawer,
        tooltip: 'Notifications',
      };
      inbuiltSecondaryItems.push({ ...defaultNotifications, ...notification });
    }

    if (people) {
      const defaultPeople = {
        icon: PeopleIcon,
        label: 'People directory',
        onClick: navigation.openPeopleDrawer,
        tooltip: 'People directory',
      };
      inbuiltSecondaryItems.push({ ...defaultPeople, ...people });
    }

    if (appSwitcher) {
      const defaultAppSwitcher = {
        icon: MenuIcon,
        label: 'App Switcher',
        tooltip: 'App Switcher',
      };
      inbuiltSecondaryItems.push({ ...defaultAppSwitcher, ...appSwitcher });
    }

    if (help) {
      const defaultHelp = {
        icon: QuestionCircleIcon,
        label: 'Help',
        tooltip: 'Help',
      };
      inbuiltSecondaryItems.push({ ...defaultHelp, ...help });
    }

    if (profile) {
      const defaultUser = {
        icon: () => (
          <Avatar
            borderColor="transparent"
            isActive={false}
            isHover={false}
            size="small"
          />
        ),
        label: 'Your profile and Settings',
        tooltip: 'Your profile and Settings',
      };
      inbuiltSecondaryItems.push({ ...defaultUser, ...profile });
    }

    if (!profile) {
      const annonymousUser = {
        icon: SignInIcon,
        label: 'Log In',
        onClick:
          navigation.redirectToLogin || (() => console.log('Login clicked')),
        tooltip: 'Log In',
      };
      inbuiltSecondaryItems.push(annonymousUser);
    }

    return [...inbuiltSecondaryItems, ...secondaryActions];
  };

  renderDrawer = (
    drawerKey: 'create' | 'search' | 'notification' | 'people',
    drawerProps,
  ) => {
    const { navigation } = this.props;
    const { activeDrawer } = navigation.state;
    const action = this.props[drawerKey];

    if (!action || !action.drawer) {
      return null;
    }

    const DrawerContent = action.drawer.content;

    return (
      <Drawer
        isOpen={activeDrawer === drawerKey}
        onClose={
          (action.drawer && action.drawer.onClose) ||
          navigation.closeActiveDrawer
        }
        {...drawerProps}
      >
        <DrawerContent closeDrawer={navigation.closeActiveDrawer} />
      </Drawer>
    );
  };

  render() {
    const primaryActions = this.constructPrimaryItems();
    const secondaryActions = this.constructSecondaryItems();

    return (
      <Fragment>
        <GlobalNav
          primaryActions={primaryActions}
          secondaryActions={secondaryActions}
        />
        {this.renderDrawer('create')}
        {this.renderDrawer('search', { width: 'wide' })}
        {this.renderDrawer('notification', { width: 'wide' })}
        {this.renderDrawer('people', { width: 'wide' })}
      </Fragment>
    );
  }
}

export default (props: GlobalNavigationProps) => (
  <NavigationSubscriber>
    {navigation => <GlobalNavigation navigation={navigation} {...props} />}
  </NavigationSubscriber>
);
