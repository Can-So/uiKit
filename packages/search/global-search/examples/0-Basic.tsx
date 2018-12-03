import * as React from 'react';
import Button from '@atlaskit/button';
import { AnalyticsListener } from '../../../core/analytics-next/src/';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import { GlobalQuickSearch } from '../src';
import withNavigation from '../example-helpers/withNavigation';

const GlobalQuickSearchInNavigation = withNavigation(GlobalQuickSearch);

const logEvent = event => {
  const { eventType, action, actionSubject, actionSubjectId } = event.payload;
  console.debug(
    `${eventType} | ${action} ${actionSubject} ${actionSubjectId}`,
    event.payload.attributes,
    event.payload,
  );
};

type State = {
  isDrawerOpen: boolean;
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
    return this.state.isDrawerOpen ? (
      <div style={{ padding: '2rem' }}>
        <AnalyticsListener onEvent={logEvent} channel="fabric-elements">
          <GlobalQuickSearchInNavigation />
        </AnalyticsListener>
      </div>
    ) : (
      <Button type="button" onClick={this.openDrawer}>
        Open example
      </Button>
    );
  }
}
