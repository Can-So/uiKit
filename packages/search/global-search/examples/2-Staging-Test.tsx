import * as React from 'react';
import styled from 'styled-components';
import { GlobalQuickSearch } from '../src/index';
import { Config } from '../src/api/configureSearchClients';
import withNavigation from '../example-helpers/withNavigation';

const message = (
  <p>
    To get search results from{' '}
    <a
      href="https://jdog.jira-dev.com"
      target="_blank"
      title="497ea592-beb4-43c3-9137-a6e5fa301088"
    >
      jdog
    </a>{' '}
    please login to{' '}
    <a href="https://id.stg.internal.atlassian.com" target="_blank">
      Staging Identity
    </a>
  </p>
);
const GlobalQuickSearchInNavigation = withNavigation(GlobalQuickSearch, {
  hideLocale: true,
  message,
});
const config: Partial<Config> = {
  activityServiceUrl: 'https://api-private.stg.atlassian.com/activity',
  searchAggregatorServiceUrl:
    'https://api-private.stg.atlassian.com/xpsearch-aggregator',
  directoryServiceUrl: 'https://api-private.stg.atlassian.com/directory',
};

const cloudId = '497ea592-beb4-43c3-9137-a6e5fa301088'; // JDOG
export default class extends React.Component<{}, { cloudId: string }> {
  render() {
    return <GlobalQuickSearchInNavigation cloudId={cloudId} {...config} />;
  }
}
