import React, { Component } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import Navigation, { AkGlobalItem } from '@atlaskit/navigation';
import Tooltip from '@atlaskit/tooltip';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import { colors } from '@atlaskit/theme';
import AkDrawer from '@atlaskit/drawer';
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

fetchMock.get(
  '/gateway/api/activity/api/client/recent/containers?cloudId=some-cloud-id',
  () => new Promise(res => setTimeout(() => res(RECENT_CONTAINERS_DATA), 1500)),
);
fetchMock.get(
  '/wiki/rest/menu/latest/appswitcher',
  () => new Promise(res => setTimeout(() => res(CUSTOM_LINKS_DATA), 2500)),
);

export default class ConfluenceAppSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () => {
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
      <Navigation
        drawers={[
          <AkDrawer
            key="app-switcher"
            isOpen={this.state.isDrawerOpen}
            onClose={this.onClose}
          >
            <ConfluenceAppSwitcher cloudId="some-cloud-id" />
          </AkDrawer>,
        ]}
        globalPrimaryIcon={<AtlassianIcon size="large" label="Atlassian" />}
        globalPrimaryItemHref="/"
        globalSecondaryActions={[
          <AkGlobalItem
            key="app-switcher-global-item"
            onClick={this.openDrawer}
          >
            <Tooltip content="Switch apps" position="right">
              <AppSwitcherIcon
                label="Switch apps"
                size="medium"
                primaryColor={colors.N0}
                secondaryColor={colors.N800}
              />
            </Tooltip>
          </AkGlobalItem>,
        ]}
      />
    );
  }
}
