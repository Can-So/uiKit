// @flow

import React, { Component } from 'react';
import AppSwitcher from '@atlaskit/app-switcher';
import EmojiAtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import {
  GlobalItem,
  LayoutManager,
  NavigationProvider,
} from '@atlaskit/navigation-next';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import { ToggleStateless } from '@atlaskit/toggle';
import fetchMock from 'fetch-mock';

import GlobalNavigation from '../src';

const appSwitcherData = {
  recentContainers: [
    {
      name: 'Recent container 1 without icon',
      url: 'https://www.atlassian.com/#1',
      iconUrl: '',
      type: 'confluence-space',
    },
    {
      name: 'Recent container 2',
      url: 'https://www.atlassian.com/#2',
      iconUrl:
        'data:image/png;base64,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',
      type: 'jira-project',
    },
    {
      name: 'Recent container 3',
      url: 'https://www.atlassian.com/#3',
      iconUrl:
        'data:image/png;base64,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',
      type: 'confluence-space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://www.atlassian.com/#4',
        product: 'jira',
      },
      {
        name: 'Confluence',
        url: 'https://www.atlassian.com/#5',
        product: 'confluence',
      },
    ],
    error: false,
  },
  isAnonymousUser: false,
  i18n: {
    home: 'Home',
    'site-admin': 'Site administration',
    apps: 'Apps',
    recent: 'Recent',
    configure: 'Configure',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'applinks.error': 'Unable to load linked applications.',
    'try.lozenge': 'try',
  },
};
const appSwitcherDropdownOptions = {
  position: 'right bottom',
};

const AppSwitcherComponent = itemProps => (
  <AppSwitcher
    {...appSwitcherData}
    isDropdownOpenInitially={false}
    dropdownOptions={appSwitcherDropdownOptions}
    trigger={isDropdownOpen => (
      <GlobalItem
        {...itemProps}
        icon={AppSwitcherIcon}
        isSelected={isDropdownOpen}
      />
    )}
  />
);

const ORIGINAL_MOCK_DATA = {
  RECENT_CONTAINERS_DATA: {
    data: [
      {
        objectId: 'some-id',
        type: 'jira-project',
        name: 'Jira Switcher',
        url: 'https://some-random-instance.atlassian.net/projects/CEN',
        iconUrl:
          'https://some-random-instance.atlassian.net/secure/secure/projectavatar?size=medium&avatarId=10324',
      },
    ],
  },
  CUSTOM_LINKS_DATA: [
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/secure',
      label: 'Jira',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/wiki',
      label: 'Confluence',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://bitbucket.org/my-team',
      label: 'Bitbucket - My Team',
      local: false,
      self: false,
      applicationType: 'jira',
    },
  ],
  LICENSE_INFORMATION_DATA: {
    hostname: 'https://some-random-instance.atlassian.net',
    firstActivationDate: 1492488658539,
    maintenanceEndDate: '2017-04-24',
    maintenanceStartDate: '2017-04-17',
    products: {
      'confluence.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'hipchat.cloud': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'jira-core.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'jira-incident-manager.ondemand': {
        billingPeriod: 'ANNUAL',
        state: 'ACTIVE',
      },
      'jira-servicedesk.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
      'jira-software.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
    },
  },
  USER_PERMISSION_DATA: {
    permitted: true,
  },
  XFLOW_SETTINGS: {},
};

const mockEndpoints = () => {
  const {
    RECENT_CONTAINERS_DATA,
    CUSTOM_LINKS_DATA,
    LICENSE_INFORMATION_DATA,
    USER_PERMISSION_DATA,
    XFLOW_SETTINGS,
  } = ORIGINAL_MOCK_DATA;
  fetchMock.get(
    '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
    () =>
      new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    '/rest/menu/latest/appswitcher',
    () => new Promise(res => setTimeout(() => res(CUSTOM_LINKS_DATA), 2500)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/xflow/some-cloud-id/license-information',
    () =>
      new Promise(res => setTimeout(() => res(LICENSE_INFORMATION_DATA), 2000)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.post(
    '/gateway/api/permissions/permitted',
    () => new Promise(res => setTimeout(() => res(USER_PERMISSION_DATA), 500)),
    { method: 'POST', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/site/some-cloud-id/setting/xflow',
    () => new Promise(res => setTimeout(() => res(XFLOW_SETTINGS), 2000)),
    { method: 'GET', overwriteRoutes: true },
  );
};

// TODO: make onClicks targets show up on page instead of console.logs
const getGlobalNavigation = enableAtlassianSwitcher => () => (
  <GlobalNavigation
    cloudId="some-cloud-id"
    productIcon={EmojiAtlassianIcon}
    appSwitcherComponent={AppSwitcherComponent}
    appSwitcherTooltip="Switch to ..."
    enableAtlassianSwitcher={enableAtlassianSwitcher}
  />
);

export default class extends Component {
  state = {
    enableAtlassianSwitcher: true,
  };

  componentDidMount() {
    mockEndpoints();
  }

  toggleAppSwitcher = () => {
    const { enableAtlassianSwitcher } = this.state;
    this.setState({
      enableAtlassianSwitcher: !enableAtlassianSwitcher,
    });
  };

  render() {
    const { enableAtlassianSwitcher } = this.state;
    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={getGlobalNavigation(enableAtlassianSwitcher)}
          productNavigation={() => null}
          containerNavigation={() => null}
        >
          <div css={{ padding: '32px 40px' }}>
            Using Centralised App Switcher:
            <ToggleStateless
              isChecked={enableAtlassianSwitcher}
              onChange={this.toggleAppSwitcher}
            />
          </div>
        </LayoutManager>
      </NavigationProvider>
    );
  }
}
