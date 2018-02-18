/* @flow */

import React from 'react';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import ComponentIcon from '@atlaskit/icon/glyph/component';
import PageIcon from '@atlaskit/icon/glyph/page';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import type { Directory } from '../../../types';
import * as fs from '../../../utils/fs';
import renderNav from '../utils/renderNav';

const defaultNavGroups = [
  {
    items: [
      {
        to: '/',
        title: 'Welcome',
        icon: <HomeFilledIcon label="Welcome icon" />,
      },
    ],
  },
  {
    title: 'Get Started',
    items: [
      {
        to: '/docs',
        title: 'Documentation',
        icon: <OverviewIcon label="Documentation" />,
      },
      {
        to: '/packages',
        title: 'Packages',
        icon: <ComponentIcon label="Packages icon" />,
      },
      // {
      //   to: '/patterns',
      //   title: 'Patterns',
      //   icon: <IssuesIcon label="Patterns icon" />,
      // },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        to: 'https://bitbucket.org/atlassian/atlaskit',
        title: 'Repository',
        icon: <BitbucketIcon label="Repository" />,
        external: true,
      },
      {
        to: 'https://atlassian.design/',
        title: 'Design guidelines',
        icon: <DashboardIcon label="Design guidelines icon" />,
        external: true,
      },
    ],
  },
];

export type DefaultNavProps = {
  onClick?: () => mixed,
  pathname: string,
};

export default function DefaultNav({ onClick, pathname }: DefaultNavProps) {
  return <div>{renderNav(defaultNavGroups, { onClick, pathname })}</div>;
}
