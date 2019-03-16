// @flow

import React from 'react';
import Avatar from '@findable/avatar';
import AddIcon from '@findable/icon/glyph/add';
import BacklogIcon from '@findable/icon/glyph/backlog';
import BoardIcon from '@findable/icon/glyph/board';
import DashboardIcon from '@findable/icon/glyph/dashboard';
import FolderIcon from '@findable/icon/glyph/folder';
import GraphLineIcon from '@findable/icon/glyph/graph-line';
import IssuesIcon from '@findable/icon/glyph/issues';
import QuestionCircleIcon from '@findable/icon/glyph/question-circle';
import SearchIcon from '@findable/icon/glyph/search';
import ShortcutIcon from '@findable/icon/glyph/shortcut';
import { JiraIcon, JiraWordmark } from '@findable/logo';
import { colors, gridSize as gridSizeFn } from '@findable/theme';

import {
  ContainerHeader,
  GlobalNav,
  GroupHeading,
  HeaderSection,
  Item,
  ItemAvatar,
  LayoutManager,
  MenuSection,
  NavigationProvider,
  Separator,
  modeGenerator,
  ThemeProvider,
  Wordmark,
} from '../src';

const gridSize = gridSizeFn();

/**
 * Data
 */
const globalNavPrimaryItems = [
  {
    id: 'jira',
    icon: ({ label }: { label: string }) => (
      <JiraIcon size="medium" label={label} />
    ),
    label: 'Jira',
  },
  { id: 'search', icon: SearchIcon, label: 'Search' },
  { id: 'create', icon: AddIcon, label: 'Add' },
];

const globalNavSecondaryItems = [
  {
    id: 'icon-11-navigation',
    icon: QuestionCircleIcon,
    label: 'Help',
    size: 'small',
  },
  {
    id: 'icon-11-navigation-2',
    icon: () => (
      <Avatar
        borderColor="transparent"
        isActive={false}
        isHover={false}
        size="small"
      />
    ),
    label: 'Profile',
    size: 'small',
  },
];

// ==============================
// Render components
// ==============================

function makeTestComponent(key, element) {
  return () => <div data-webdriver-test-key={key}>{element}</div>;
}

const GlobalNavigation = makeTestComponent(
  'global-navigation',
  <GlobalNav
    primaryItems={globalNavPrimaryItems}
    secondaryItems={globalNavSecondaryItems}
  />,
);

const ProductNavigation = () => (
  <div data-webdriver-test-key="product-navigation">
    <HeaderSection>
      {({ className }) => (
        <div className={className}>
          <Wordmark wordmark={JiraWordmark} />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item
            before={DashboardIcon}
            text="Dashboards"
            testKey="product-item-dashboards"
          />
          <Item
            before={FolderIcon}
            text="Projects"
            testKey="product-item-projects"
          />
          <Item
            before={IssuesIcon}
            text="Issues"
            testKey="product-item-issues"
          />
        </div>
      )}
    </MenuSection>
  </div>
);
const ContainerNavigation = () => (
  <div data-webdriver-test-key="container-navigation">
    <HeaderSection>
      {({ css }) => (
        <div
          data-webdriver-test-key="container-header"
          css={{
            ...css,
            paddingBottom: gridSize * 2.5,
          }}
        >
          <ContainerHeader
            before={itemState => (
              <ItemAvatar
                itemState={itemState}
                appearance="square"
                size="large"
              />
            )}
            text="My software project"
            subText="Software project"
          />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item
            before={BacklogIcon}
            text="Backlog"
            isSelected
            testKey="container-item-backlog"
          />
          <Item
            before={BoardIcon}
            text="Active sprints"
            testKey="container-item-sprints"
          />
          <Item
            before={GraphLineIcon}
            text="Reports"
            testKey="container-item-reports"
          />
          <Separator />
          <GroupHeading>Shortcuts</GroupHeading>
          <Item before={ShortcutIcon} text="Project space" />
          <Item before={ShortcutIcon} text="Project repo" />
        </div>
      )}
    </MenuSection>
  </div>
);
const Content = makeTestComponent(
  'content',
  <div style={{ padding: 30 }}>Page content</div>,
);

const customThemeMode = modeGenerator({
  product: {
    text: colors.N0,
    background: colors.G500,
  },
});

export default () => (
  <NavigationProvider>
    <ThemeProvider theme={theme => ({ ...theme, mode: customThemeMode })}>
      <LayoutManager
        globalNavigation={GlobalNavigation}
        productNavigation={ProductNavigation}
        containerNavigation={ContainerNavigation}
      >
        <Content />
      </LayoutManager>
    </ThemeProvider>
  </NavigationProvider>
);
