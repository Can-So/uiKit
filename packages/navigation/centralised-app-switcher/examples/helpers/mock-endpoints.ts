import fetchMock from 'fetch-mock';

const RECENT_CONTAINERS_DATA = {
  data: [
    {
      objectId: 'some-id',
      type: 'jira-project',
      name: 'Jira App Switcher',
      url: 'https://hello.atlassian.net/projects/CEN',
      iconUrl:
        'https://hello.atlassian.net/secure/projectavatar?size=medium&avatarId=some-id',
    },
  ],
};

const CUSTOM_LINKS_DATA = [
  {
    key: 'home',
    link: 'https://hello.atlassian.net/secure',
    label: 'Jira',
    local: true,
    self: false,
    applicationType: 'jira',
  },
  {
    key: 'home',
    link: 'https://hello.atlassian.net/wiki',
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
];

const LICENSE_INFORMATION_DATA = {
  hostname: 'https://someinstance.atlassian.net',
  firstActivationDate: 1492488658539,
  maintenanceEndDate: '2017-04-24',
  maintenanceStartDate: '2017-04-17',
  products: {
    'confluence.ondemand': { billingPeriod: 'ANNUAL', state: 'DEACTIVATED' },
    'hipchat.cloud': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
    'jira-core.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
    'jira-incident-manager.ondemand': {
      billingPeriod: 'ANNUAL',
      state: 'ACTIVE',
    },
    'jira-servicedesk.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
    'jira-software.ondemand': { billingPeriod: 'ANNUAL', state: 'ACTIVE' },
  },
};

const USER_PERMISSION_DATA = {
  permitted: true,
};

export const mockEndpoints = (product: string) => {
  fetchMock.get(
    '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
    new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
  );
  fetchMock.get(
    `${product === 'confluence' ? '/wiki' : ''}/rest/menu/latest/appswitcher`,
    new Promise(res => setTimeout(() => res(CUSTOM_LINKS_DATA), 2500)),
  );
  fetchMock.get(
    '/gateway/api/xflow/some-cloud-id/license-information',
    new Promise(res => setTimeout(() => res(LICENSE_INFORMATION_DATA), 2000)),
  );
  fetchMock.post(
    '/gateway/api/permissions/permitted',
    new Promise(res => setTimeout(() => res(USER_PERMISSION_DATA), 500)),
  );
};
