import * as React from 'react';
import HomeFilledIcon from '@findable/icon/glyph/home-filled';
import ComponentIcon from '@findable/icon/glyph/component';
import OverviewIcon from '@findable/icon/glyph/overview';
import { BitbucketIcon } from '@findable/logo';
import DashboardIcon from '@findable/icon/glyph/dashboard';
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
        to: 'https://github.com/fnamazing/uiKit',
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
  onClick?: (e: Event) => void;
  pathname: string;
};

export default function DefaultNav({ pathname, onClick }: DefaultNavProps) {
  return <div>{renderNav(defaultNavGroups, { pathname, onClick })}</div>;
}
