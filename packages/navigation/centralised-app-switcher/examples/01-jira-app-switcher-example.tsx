import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import JiraAppSwitcher from '../src/components/jira-app-switcher';
import fetchMock from 'fetch-mock';

const RECENT_CONTAINERS_DATA = {
  data: [
    {
      objectId:
        'ari:cloud:jira:a436116f-02ce-4520-8fbb-7301462a1674:project/30255',
      type: 'jira-project',
      name: 'Centralised App Switcher',
      url: 'https://hello.atlassian.net/projects/CEN',
      iconUrl:
        'https://hello.atlassian.net/secure/projectavatar?size=medium&avatarId=24523',
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
