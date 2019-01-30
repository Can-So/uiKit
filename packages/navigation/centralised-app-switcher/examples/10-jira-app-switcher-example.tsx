import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import JiraAppSwitcher from '../src/components/jira-app-switcher';
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
    label: 'Hello Jira',
    local: true,
    self: false,
    applicationType: 'jira',
  },
];

const LICENSE_INFORMATION_DATA = {
  hostname: 'https://some-instance.atlassian.net',
  firstActivationDate: 1541541873107,
  maintenanceEndDate: '2018-03-01',
  maintenanceStartDate: '2018-01-01',
  products: {
    'confluence.ondemand': {
      billingPeriod: 'MONTHLY',
      state: 'DEACTIVATED',
    },
    'jira-servicedesk.ondemand': {
      billingPeriod: 'MONTHLY',
      state: 'ACTIVE',
    },
    'jira-software.ondemand': {
      billingPeriod: 'MONTHLY',
      state: 'DEACTIVATED',
    },
  },
};

export default class JiraAppSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () => {
    fetchMock.get(
      '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
      new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
    );
    fetchMock.get(
      '/rest/menu/latest/appswitcher',
      new Promise(res => setTimeout(() => res(CUSTOM_LINKS_DATA), 2500)),
    );
    fetchMock.get(
      '/gateway/api/xflow/some-cloud-id/license-information',
      new Promise(res => setTimeout(() => res(LICENSE_INFORMATION_DATA), 2000)),
    );
    this.setState({
      isDrawerOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer
          onClose={this.onClose}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <JiraAppSwitcher cloudId="some-cloud-id" />
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
