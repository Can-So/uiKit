// @flow

import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '../src';
import GlobalSearch from '@atlaskit/global-search';

type State = {
  isDrawerOpen: boolean,
};
export default class DrawersExample extends Component<{}, State> {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  closeDrawer = () =>
    this.setState({
      isDrawerOpen: false,
    });

  render() {
    return (
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <GlobalSearch
            addSessionIdToJiraResult={true}
            cloudId="cloudId"
            context={'jira'}
            referralContextIdentifiers={{
              currentContentId: '123',
              searchReferrerId: '123',
            }}
          />
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
