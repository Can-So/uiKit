import * as React from 'react';
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
  componentWillMount() {
    setupMocks();
  }

  componentWillUnmount() {
    teardownMocks();
  }

  render() {
    return (
      <AnalyticsListener onEvent={logEvent} channel="fabric-elements">
        <GlobalQuickSearchWrapper />
      </AnalyticsListener>
    );
  }
}
