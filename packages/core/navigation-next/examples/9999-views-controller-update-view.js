// @flow

import React, { Component } from 'react';
import GlobalNavigation from '@atlaskit/global-navigation';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import IssueIcon from '@atlaskit/icon/glyph/issue';
import PortfolioIcon from '@atlaskit/icon/glyph/portfolio';
import { JiraIcon, JiraWordmark } from '@atlaskit/logo';
import {
  LayoutManagerWithViewController,
  NavigationProvider,
  ViewController,
  withNavigationViewController,
} from '../src';

const MyGlobalNavigation = () => (
  <GlobalNavigation
    productIcon={() => <JiraIcon size="medium" />}
    onProductClick={() => {}}
  />
);

const productHomeView = {
  id: 'product/home',
  type: 'product',
  getItems: () => [
    {
      type: 'Section',
      id: 'product/home:header',
      items: [
        {
          type: () => (
            <div css={{ padding: '16px 0' }}>
              <JiraWordmark />
            </div>
          ),
          id: 'jira-wordmark',
        },
      ],
    },
    {
      type: 'Section',
      nestedGroupKey: 'menu',
      id: 'product/home:menu',
      parentId: null,
      items: [
        {
          type: 'Item',
          id: 'dashboards',
          before: DashboardIcon,
          text: 'Dashboards',
        },
        { type: 'Item', id: 'projects', before: FolderIcon, text: 'Projects' },
        {
          type: 'Item',
          id: 'issues-and-filters',
          goTo: 'product/issues',
          before: IssueIcon,
          text: 'Issues and filters',
        },
        {
          type: 'Item',
          id: 'portfolio',
          before: PortfolioIcon,
          text: 'Portfolio',
        },
      ],
    },
  ],
};

const productIssuesView = {
  id: 'product/issues',
  type: 'product',
  getItems: () => [
    {
      type: 'Section',
      id: 'product/issues:header',
      items: [
        {
          type: () => (
            <div css={{ padding: '16px 0' }}>
              <JiraWordmark />
            </div>
          ),
          id: 'jira-wordmark',
        },
        {
          type: 'Item',
          id: 'back-item',
          after: null,
          before: ArrowLeftIcon,
          goTo: 'product/home',
          text: 'Back',
        },
      ],
    },
    {
      type: 'Section',
      nestedGroupKey: 'menu',
      id: 'product/issues:menu',
      parentId: 'product/home:menu',
      items: [
        { type: 'Item', text: 'Search issues', id: 'search-issues' },
        { type: 'GroupHeading', id: 'other-heading', text: 'Other' },
        { type: 'Item', text: 'My open issues', id: 'my-open-issues' },
        { type: 'Item', text: 'Reported by me', id: 'reported-by-me' },
        { type: 'Item', text: 'All issues', id: 'all-issues' },
        { type: 'Item', text: 'Open issues', id: 'open-issues' },
        { type: 'Item', text: 'Done issues', id: 'done-issues' },
        { type: 'Item', text: 'Viewed recently', id: 'viewed-recently' },
        { type: 'Item', text: 'Created recently', id: 'created-recently' },
        { type: 'Item', text: 'Resolved recently', id: 'resolved-recently' },
        { type: 'Item', text: 'Updated recently', id: 'updated-recently' },
        { type: 'Separator', id: 'separator' },
        { type: 'Item', text: 'View all filters', id: 'view-all-filters' },
      ],
    },
  ],
};

class App extends Component<{
  navigationViewController: ViewController,
}> {
  componentDidMount() {
    const { navigationViewController } = this.props;
    navigationViewController.addView(productHomeView);
    navigationViewController.addView(productIssuesView);
    navigationViewController.setView(productHomeView.id);
  }

  render() {
    return (
      <LayoutManagerWithViewController globalNavigation={MyGlobalNavigation}>
        <div css={{ padding: 30 }}>Page content goes here.</div>
      </LayoutManagerWithViewController>
    );
  }
}
const AppWithNavigationViewController = withNavigationViewController(App);

export default () => (
  <NavigationProvider>
    <AppWithNavigationViewController />
  </NavigationProvider>
);
