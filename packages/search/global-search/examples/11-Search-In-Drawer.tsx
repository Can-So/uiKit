import * as React from 'react';
import Button from '@atlaskit/button';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import Drawer, { DrawerItemTheme } from '@atlaskit/drawer';
import { GlobalQuickSearch } from '../src';
import LocaleIntlProvider from '../example-helpers/LocaleIntlProvider';

export default class extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  componentWillMount() {
    setupMocks();
  }

  componentWillUnmount() {
    teardownMocks();
  }

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
      <div style={{ padding: '2rem' }}>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
          <DrawerItemTheme>
            <LocaleIntlProvider locale={'en'}>
              <GlobalQuickSearch
                addSessionIdToJiraResult={true}
                cloudId="cloudId"
                context={'jira'}
                referralContextIdentifiers={{
                  currentContentId: '123',
                  searchReferrerId: '123',
                }}
              />
            </LocaleIntlProvider>
          </DrawerItemTheme>
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
