import * as React from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { AnalyticsListener } from '../../../core/analytics-next/src/';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import { GlobalQuickSearch } from '../src';
import withNavigation from '../example-helpers/withNavigation';

const GlobalQuickSearchWrapper = withNavigation(GlobalQuickSearch);

const logEvent = event => {
  const { eventType, action, actionSubject, actionSubjectId } = event.payload;
  console.debug(
    `${eventType} | ${action} ${actionSubject} ${actionSubjectId}`,
    event.payload.attributes,
    event.payload,
  );
};

export default class GlobalQuickSearchExample extends React.Component {
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

  componentWillMount() {
    setupMocks();
  }

  componentWillUnmount() {
    teardownMocks();
  }

  render() {
    return (
      <>
        <Drawer isOpen={this.state.isDrawerOpen} onClose={this.closeDrawer}>
          <AnalyticsListener onEvent={logEvent} channel="fabric-elements">
            <GlobalQuickSearchWrapper />
          </AnalyticsListener>
        </Drawer>

        <Button type="button" onClick={this.openDrawer}>
          Open example
        </Button>
      </>
    );
  }
}
