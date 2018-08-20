import * as React from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
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

export default class extends React.Component {
  componentWillMount() {
    setupMocks();
  }

  componentWillUnmount() {
    teardownMocks();
  }

  render() {
    return (
      <AnalyticsListener onEvent={logEvent} channel="fabric-elements">
        <GlobalQuickSearchInNavigation
          useAggregatorForConfluenceObjects={true}
        />
      </AnalyticsListener>
    );
  }
}
