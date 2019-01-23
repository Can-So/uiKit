import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import ConfluenceAppSwitcher from '../src/components/confluence-app-switcher';
import fetchMock from 'fetch-mock';

const RECENT_CONTAINERS_DATA = {
  data: [
    {
      objectId: 'some-id',
      type: 'jira-project',
      name: 'Confluence App Switcher',
      url: 'https://hello.atlassian.net/projects/CEN',
      iconUrl:
        'https://hello.atlassian.net/secure/projectavatar?size=medium&avatarId=some-id',
    },
  ],
};

const CUSTOM_LINKS_DATA = [
  {
    key: 'home',
    link: 'https://hello.atlassian.net/wiki',
    label: 'Hello Confluence',
    local: true,
    self: false,
    applicationType: 'confluence',
  },
];

export default class ConfluenceAppSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () => {
    fetchMock.get(
      '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
      new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
    );
    fetchMock.get(
      '/wiki/rest/menu/latest/appswitcher',
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
          <ConfluenceAppSwitcher cloudId="some-cloud-id" />
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
