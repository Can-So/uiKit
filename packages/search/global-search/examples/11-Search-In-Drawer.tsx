import * as React from 'react';
import Button from '@atlaskit/button';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import Drawer from '@atlaskit/drawer';
import { GlobalQuickSearch } from '../src';
import LocaleIntlProvider from '../example-helpers/LocaleIntlProvider';

type State = {
  isDrawerOpen: boolean;
};

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
      <div css={{ padding: '2rem' }}>
        <Drawer
          onClose={this.closeDrawer}
          isOpen={this.state.isDrawerOpen}
          width="wide"
        >
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
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}
