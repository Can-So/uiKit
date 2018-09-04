// @flow

import React, { type ComponentType } from 'react';
import { ThemeProvider } from 'emotion-theming';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import AddIcon from '@atlaskit/icon/glyph/add';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import SearchIcon from '@atlaskit/icon/glyph/search';
import TrayIcon from '@atlaskit/icon/glyph/tray';

import { GlobalItem, GlobalItemPrimitive, light, dark, settings } from '../src';

const themeModes = { light, dark, settings };

const ConfiguredBadge = () => (
  <Badge appearance="important" max={9} value={3} />
);

type ItemType = *;
type VariationCategory = {
  title: string,
  items: Array<ItemType>,
  itemComponent?: ComponentType<ItemType>,
};

const variations: Array<VariationCategory> = [
  {
    title: 'Content variations',
    items: [
      { description: 'Containing an icon', icon: JiraIcon, size: 'small' },
      {
        description: 'Containing an avatar',
        icon: () => (
          <Avatar
            borderColor="transparent"
            isActive={false}
            isHover={false}
            size="small"
          />
        ),
        size: 'small',
      },
      {
        description: 'With a badge',
        icon: TrayIcon,
        badge: ConfiguredBadge,
        size: 'small',
      },
    ],
  },
  {
    title: 'Size variations',
    items: [
      {
        description: 'Large',
        icon: SearchIcon,
        size: 'large',
      },
      {
        description: 'Small',
        icon: SearchIcon,
        size: 'small',
      },
    ],
  },
  {
    itemComponent: GlobalItemPrimitive,
    title: 'State variations',
    items: [
      {
        badge: ConfiguredBadge,
        description: 'Default',
        icon: TrayIcon,
        size: 'small',
      },
      {
        badge: ConfiguredBadge,
        description: 'Hover',
        icon: TrayIcon,
        isHover: true,
        size: 'small',
      },
      {
        badge: ConfiguredBadge,
        description: 'Hover + active',
        icon: TrayIcon,
        isActive: true,
        isHover: true,
        size: 'small',
      },
    ],
  },
  {
    itemComponent: ({
      themeContext: context,
      themeMode: mode,
      ...props
    }: ItemType) => (
      <ThemeProvider
        theme={theme => ({
          ...theme,
          context,
          mode: themeModes[mode],
        })}
      >
        <GlobalItem {...props} />
      </ThemeProvider>
    ),
    title: 'Theme variations',
    items: [
      {
        badge: ConfiguredBadge,
        description: 'Light mode, expanded context',
        icon: TrayIcon,
        size: 'small',
        themeContext: 'expanded',
        themeMode: 'light',
      },
      {
        badge: ConfiguredBadge,
        description: 'Dark mode, expanded context',
        icon: TrayIcon,
        size: 'small',
        themeContext: 'expanded',
        themeMode: 'dark',
      },
      {
        badge: ConfiguredBadge,
        description: 'Settings mode, expanded context',
        icon: TrayIcon,
        size: 'small',
        themeContext: 'expanded',
        themeMode: 'settings',
      },
    ],
  },
  {
    title: 'Component variations',
    items: [
      {
        description: 'Anchor',
        href: '#',
        icon: AddIcon,
        size: 'small',
        target: '_blank',
      },
      {
        description: 'Button',
        icon: AddIcon,
        onClick: () => console.log('You clicked a button'),
        size: 'small',
      },
      {
        description: 'Span',
        icon: AddIcon,
        size: 'small',
      },
      {
        component: ({ children, className }: *) => (
          <div className={className} to="/">
            {children}
          </div>
        ),
        description: 'Custom component',
        icon: AddIcon,
        size: 'small',
      },
    ],
  },
];

const Container = props => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
    {...props}
  />
);
const VariationWrapper = props => (
  <div css={{ margin: '0 24px 24px 0' }} {...props} />
);
const ItemWrapper = props => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      margin: '4px 0',
      width: '270px',
    }}
    {...props}
  />
);
const Description = ({ size, children }: ItemType) => (
  <div
    css={{
      marginLeft: '16px',
      marginTop: size === 'small' ? '8px' : '0',
    }}
  >
    {children}
  </div>
);

export default () => (
  <Container>
    {variations.map(
      ({ title, items, itemComponent: ItemComponent = GlobalItem }) => (
        <VariationWrapper key={title}>
          <h3>{title}</h3>
          {items.map(({ description, ...item }) => (
            <ItemWrapper key={description}>
              <ItemComponent {...item} />
              <Description {...item}>{description}</Description>
            </ItemWrapper>
          ))}
        </VariationWrapper>
      ),
    )}
  </Container>
);
