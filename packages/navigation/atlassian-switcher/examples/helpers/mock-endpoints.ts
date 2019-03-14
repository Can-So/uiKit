import fetchMock from 'fetch-mock';
const iconUrl =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iYmFja2dyb3VuZDojZmZmIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMEM3RTYiIGQ9Ik0wIDBoMTI4djEyOEgweiIvPjxwYXRoIGQ9Ik00MC4yODIgMTA5LjY2MmgtMi4xMTlhMy4xOTYgMy4xOTYgMCAwIDEtMy4xODYtMy4xODZWOTMuOTI4YTMuMTk2IDMuMTk2IDAgMCAxIDMuMTg2LTMuMTg2aDIuMTE5YTMuMTk2IDMuMTk2IDAgMCAxIDMuMTg2IDMuMTg2djEyLjU0OGEzLjE5NiAzLjE5NiAwIDAgMS0zLjE4NiAzLjE4NnpNODkuMDMyIDEwOS42NjJoLTIuMTE5YTMuMTk2IDMuMTk2IDAgMCAxLTMuMTg2LTMuMTg2VjkzLjkyOGEzLjE5NiAzLjE5NiAwIDAgMSAzLjE4Ni0zLjE4NmgyLjExOWEzLjE5NiAzLjE5NiAwIDAgMSAzLjE4NiAzLjE4NnYxMi41NDhhMy4xOTYgMy4xOTYgMCAwIDEtMy4xODYgMy4xODZ6IiBmaWxsPSIjNTI0M0FBIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48ZWxsaXBzZSBmaWxsPSIjNjU1NUMwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGN4PSI2My44NDIiIGN5PSI3NC43MDQiIHJ4PSI0My42MjIiIHJ5PSIzMC4wMTMiLz48ZWxsaXBzZSBmaWxsPSIjODc3N0Q5IiBmaWxsLXJ1bGU9Im5vbnplcm8iIGN4PSI2My45NjQiIGN5PSI2Ny42NTciIHJ4PSI1MC4zMDUiIHJ5PSIzMC4wMTMiLz48cGF0aCBkPSJNOTQuNzYyIDQ4LjU3OGMuMDM5LS42MjIuMDY1LTEuMjUzLjA2NS0xLjkwMSAwLTE3LjI0Ny0xMy45ODEtMzEuMjI4LTMxLjIyOC0zMS4yMjgtMTYuOTA1IDAtMzAuNjYzIDEzLjQzNS0zMS4yMDIgMzAuMjA4aC0uMDI2djguMjY4aC4wMjJjLjI2NiA5LjcxMSA1LjA2MiAxNi40NDEgMTIuMzc2IDIwLjM2NmwzNy42NjUuMDAyYzcuNTI5LTQuMDM3IDEyLjM5My0xMS4wNDQgMTIuMzkzLTIxLjIxNyAwLS42NDgtLjAyNi0xLjI5LS4wNjUtMS45Mjh2LTIuNTd6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNMzIuNDc3IDQ0LjI1OGMtLjAzNi40NjQtLjA2NS45My0uMDggMS4zOTloLS4wMjZ2OC4yNjhoLjAyMmMuNDU2IDE2LjY2MSAxNC4yNDcgMjQuNTQ3IDMxLjIwNiAyNC41NDcgMTcuMjQ3IDAgMzEuMjI4LTguMTQ5IDMxLjIyOC0yNS4zOTUgMC0uNjQ4LS4wMjYtMS4yOS0uMDY1LTEuOTI4di0yLjU3Yy4wMzktLjYyMi4wNjUtMS4yNTMuMDY1LTEuOTAxIDAtLjkzNS0uMDQ5LTEuODU4LS4xMjktMi43NzEtOC41MDEtMy45MjEtMTkuMTU3LTYuMjYxLTMwLjczNC02LjI2MS0xMS45MjItLjAwMi0yMi44NjcgMi40NzctMzEuNDg3IDYuNjEyeiIgZmlsbD0iIzdGNENCRiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIuMTUiLz48cGF0aCBkPSJNNjMuNTk5IDI4LjI1M2MtMTAuMzU5IDAtMTguODM0IDguNDc1LTE4LjgzNCAxOC44MzRWNzQuMjg5YzUuMjM2IDIuODA4IDExLjc1OSA0LjE4MiAxOC44MzQgNC4xODIgNy4wNzUgMCAxMy41OTgtMS4zNzQgMTguODM0LTQuMTgyVjQ3LjA4N2MwLTEwLjM1OS04LjQ3NS0xOC44MzQtMTguODM0LTE4LjgzNHoiIGZpbGw9IiMwMEM3RTYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxjaXJjbGUgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBjeD0iNjMuODYiIGN5PSI1MC43MzUiIHI9IjExLjEzOSIvPjxjaXJjbGUgZmlsbD0iIzQwMzI5NCIgZmlsbC1ydWxlPSJub256ZXJvIiBjeD0iNjMuNDcyIiBjeT0iNTAuNjA4IiByPSI0LjQxOCIvPjwvZz48L3N2Zz4=';

interface MockData {
  RECENT_CONTAINERS_DATA: any;
  CUSTOM_LINKS_DATA: any;
  LICENSE_INFORMATION_DATA: any;
  USER_PERMISSION_DATA: any;
  XFLOW_SETTINGS: any;
}

const ORIGINAL_MOCK_DATA: MockData = {
  RECENT_CONTAINERS_DATA: {
    data: [
      {
        objectId: 'some-id-0',
        type: 'jira-project',
        name: 'Jira Switcher #1',
        url: 'https://some-random-instance.atlassian.net/projects/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-1',
        type: 'confluence-space',
        name: 'My Project Space #2',
        url: 'https://some-random-instance.atlassian.net/wiki/spaces/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-2',
        type: 'jira-project',
        name: 'Jira Switcher #3',
        url: 'https://some-random-instance.atlassian.net/projects/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-3',
        type: 'confluence-space',
        name: 'My Project Space #4',
        url: 'https://some-random-instance.atlassian.net/wiki/spaces/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-4',
        type: 'jira-project',
        name: 'Jira Switcher #5',
        url: 'https://some-random-instance.atlassian.net/projects/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-5',
        type: 'confluence-space',
        name: 'My Project Space #6',
        url: 'https://some-random-instance.atlassian.net/wiki/spaces/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-6',
        type: 'jira-project',
        name: 'Jira Switcher #7',
        url: 'https://some-random-instance.atlassian.net/projects/CEN',
        iconUrl,
      },
      {
        objectId: 'some-id-7',
        type: 'confluence-space',
        name: 'My Project Space #8',
        url: 'https://some-random-instance.atlassian.net/wiki/spaces/CEN',
        iconUrl,
      },
    ],
  },
  CUSTOM_LINKS_DATA: [
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/secure/MyJiraHome.jspa',
      label: 'Jira',
      local: true,
      self: false,
      applicationType: 'jira',
    },
    {
      key: 'home',
      link: 'https://some-random-instance.atlassian.net/wiki/',
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

interface DataTransformer {
  (originalMockData: MockData): MockData;
}

interface LoadTimes {
  containers?: number;
  xflow?: number;
  licenseInformation?: number;
  permitted?: number;
  appswitcher?: number;
}

export const REQUEST_SLOW = {
  containers: 2000,
  xflow: 1200,
  licenseInformation: 1000,
  permitted: 500,
  appswitcher: 1500,
};

export const REQUEST_MEDIUM = {
  containers: 1000,
  xflow: 600,
  licenseInformation: 400,
  permitted: 250,
  appswitcher: 750,
};

export const REQUEST_FAST = {
  containers: 500,
  xflow: 300,
  licenseInformation: 200,
  permitted: 125,
  appswitcher: 375,
};

export const mockEndpoints = (
  product: string,
  transformer?: DataTransformer,
  loadTimes?: LoadTimes,
) => {
  const mockData = transformer
    ? transformer(ORIGINAL_MOCK_DATA)
    : ORIGINAL_MOCK_DATA;

  const {
    RECENT_CONTAINERS_DATA,
    CUSTOM_LINKS_DATA,
    LICENSE_INFORMATION_DATA,
    USER_PERMISSION_DATA,
    XFLOW_SETTINGS,
  } = mockData;
  fetchMock.get(
    '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
    () =>
      new Promise(res =>
        setTimeout(
          () => res(RECENT_CONTAINERS_DATA),
          loadTimes && loadTimes.containers,
        ),
      ),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    `${product === 'confluence' ? '/wiki' : ''}/rest/menu/latest/appswitcher`,
    () =>
      new Promise(res =>
        setTimeout(
          () => res(CUSTOM_LINKS_DATA),
          loadTimes && loadTimes.appswitcher,
        ),
      ),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/xflow/some-cloud-id/license-information',
    () =>
      new Promise(res =>
        setTimeout(
          () => res(LICENSE_INFORMATION_DATA),
          loadTimes && loadTimes.licenseInformation,
        ),
      ),
    { method: 'GET', overwriteRoutes: true },
  );
  fetchMock.post(
    '/gateway/api/permissions/permitted',
    () =>
      new Promise(res =>
        setTimeout(
          () => res(USER_PERMISSION_DATA),
          loadTimes && loadTimes.permitted,
        ),
      ),
    { method: 'POST', overwriteRoutes: true },
  );
  fetchMock.get(
    '/gateway/api/site/some-cloud-id/setting/xflow',
    () =>
      new Promise(res =>
        setTimeout(() => res(XFLOW_SETTINGS), loadTimes && loadTimes.xflow),
      ),
    { method: 'GET', overwriteRoutes: true },
  );
};
