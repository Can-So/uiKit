// @flow
import type { ComponentType } from 'react';
import type { GlobalItemProps } from '@atlaskit/navigation-next';

type DefaultItemShape = {
  icon?: ComponentType<*>,
  label: string,
  section: 'primary' | 'secondary',
  rank: number,
  tooltip: string,
};

type ItemShape = {
  tooltip?: string,
  label?: string,
  onClick: () => void,
  icon?: ComponentType<*>,
};

type DropdownItem = {
  tooltip?: string,
  label?: string,
  icon?: ComponentType<*>,
  component?: ComponentType<*>,
  badge?: ComponentType<*>,
  href?: string,
};

export type DefaultConfigShape = {
  product: DefaultItemShape,
  starred: DefaultItemShape,
  search: DefaultItemShape,
  create: DefaultItemShape,
  notification: DefaultItemShape,
  appSwitcher: {
    section: 'primary' | 'secondary',
    rank: number,
  },
  help: DefaultItemShape,
  profile: DefaultItemShape,
};

export type ProductConfigShape = {
  product: ?ItemShape,
  create: ?ItemShape,
  search: ?ItemShape,
  starred: ?ItemShape,
  notification: ?ItemShape,
  appSwitcher: ?{
    component: ComponentType<*>,
  },
  help: ?DropdownItem,
  profile: ?DropdownItem,
};

type Size = 'small' | 'large';

export type NavItem = {
  label?: string,
  onClick?: () => void,
  icon?: ComponentType<*>,
  rank: number,
  section: 'primary' | 'secondary',
  component?: ComponentType<*>,
  badge?: ComponentType<*>,
  tooltip?: string,
  href?: string,
  size?: Size,
  id?: string,
};

// The shape of the item data required by GlobalNav
export type GlobalNavItemData = GlobalItemProps & { key?: string };
