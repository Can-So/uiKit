import fetchMock from 'fetch-mock';

interface MockData {
  RECENT_CONTAINERS_DATA: any;
  CUSTOM_LINKS_DATA: any;
  LICENSE_INFORMATION_DATA: any;
  USER_PERMISSION_DATA: any;
}

const ORIGINAL_MOCK_DATA: MockData = {
  RECENT_CONTAINERS_DATA: {
    data: [
      {
        objectId: 'some-id',
        type: 'jira-project',
        name: 'Jira App Switcher',
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
};

interface DataTransformer {
  (originalMockData: MockData): MockData;
}

export const mockEndpoints = (
  product: string,
  transformer?: DataTransformer,
) => {
  const mockData = transformer
    ? transformer(ORIGINAL_MOCK_DATA)
    : ORIGINAL_MOCK_DATA;

  const {
    RECENT_CONTAINERS_DATA,
    CUSTOM_LINKS_DATA,
    LICENSE_INFORMATION_DATA,
    USER_PERMISSION_DATA,
  } = mockData;
  fetchMock.get(
    '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
    new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    `${product === 'confluence' ? '/wiki' : ''}/rest/menu/latest/appswitcher`,
    new Promise(res => setTimeout(() => res(CUSTOM_LINKS_DATA), 2500)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/xflow/some-cloud-id/license-information',
    new Promise(res => setTimeout(() => res(LICENSE_INFORMATION_DATA), 2000)),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.post(
    '/gateway/api/permissions/permitted',
    new Promise(res => setTimeout(() => res(USER_PERMISSION_DATA), 500)),
    { method: 'POST', overwriteRoutes: true },
  );
};
