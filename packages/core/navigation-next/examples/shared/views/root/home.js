// @flow

import React from 'react';
import { JiraWordmark as JiraWordmarkLogo } from '@findable/logo';
import DashboardIcon from '@findable/icon/glyph/dashboard';
import FolderIcon from '@findable/icon/glyph/folder';
import IssuesIcon from '@findable/icon/glyph/issues';

import { LinkItem } from '../../components';
import type { NavigationRendererItemType } from '../../../../src/';

import ViewRegistrar from '../common/view-registrar';

const getItems = (): NavigationRendererItemType<{
  type: 'LinkItem',
  id: string,
}>[] => [
  {
    id: 'root/index:header',
    items: [
      { type: 'Wordmark', wordmark: JiraWordmarkLogo, id: 'jira-wordmark' },
    ],
    type: 'HeaderSection',
  },
  {
    id: 'root/index:menu',
    items: [
      {
        // Inline component
        type: 'InlineComponent',
        component: LinkItem,
        id: 'dashboards',
        text: 'Dashboards',
        before: DashboardIcon,
        to: '/',
      },
      {
        // Custom component
        type: 'LinkItem',
        id: 'projects',
        text: 'Projects',
        before: FolderIcon,
        to: '/projects',
      },
      {
        before: IssuesIcon,
        goTo: 'root/issues',
        id: 'issues',
        text: 'Issues',
        type: 'GoToItem',
      },
      {
        before: IssuesIcon,
        goTo: 'root/sortable-issues',
        id: 'sortable-issues',
        text: 'Sortable Issues',
        type: 'GoToItem',
      },
    ],
    nestedGroupKey: 'menu',
    parentId: null,
    type: 'MenuSection',
  },
];

const HomeView = () => (
  <ViewRegistrar
    getItemsFactory={() => getItems}
    type="product"
    viewId="root/index"
  />
);

export default HomeView;
