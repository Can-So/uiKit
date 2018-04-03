import * as React from 'react';
import * as debounce from 'lodash.debounce';
import { withAnalytics, FireAnalyticsEvent } from '@atlaskit/analytics';
import GlobalQuickSearch from './GlobalQuickSearch';
import { RecentSearchClient } from '../api/RecentSearchClient';
import {
  CrossProductSearchClient,
  CrossProductResults,
} from '../api/CrossProductSearchClient';
import { Result } from '../model/Result';
import { PeopleSearchClient } from '../api/PeopleSearchClient';
import * as uuid from 'uuid/v4';

export interface Props {
  recentSearchClient: RecentSearchClient;
  crossProductSearchClient: CrossProductSearchClient;
  peopleSearchClient: PeopleSearchClient;
  debounceMillis?: number; // for testing only
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export interface State {
  query: string;
  searchSessionId: string;
  isLoading: boolean;
  isError: boolean;
  recentlyViewedItems: Result[];
  recentResults: Result[];
  jiraResults: Result[];
  confluenceResults: Result[];
  peopleResults: Result[];
}

/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export class GlobalQuickSearchContainer extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    debounceMillis: 350,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      query: '',
      searchSessionId: uuid(), // unique id for search attribution
      recentlyViewedItems: [],
      recentResults: [],
      jiraResults: [],
      confluenceResults: [],
      peopleResults: [],
    };
  }

  handleSearch = (query: string) => {
    this.setState({
      query: query,
    });

    if (query.length < 2) {
      // reset search results so that internal state between query and results stays consistent
      this.setState({
        isError: false,
        recentResults: [],
        jiraResults: [],
        confluenceResults: [],
      });
    } else {
      this.doDebouncedSearch(query);
    }
  };

  async searchRecent(query: string): Promise<Result[]> {
    const results = await this.props.recentSearchClient.search(query);

    if (this.state.query === query) {
      this.setState({
        recentResults: results,
      });
    }

    return results;
  }

  async searchCrossProduct(query: string): Promise<CrossProductResults> {
    const results = await this.props.crossProductSearchClient.search(
      query,
      this.state.searchSessionId,
    );

    if (this.state.query === query) {
      this.setState({
        jiraResults: results.jira,
        confluenceResults: results.confluence,
      });
    }

    return results;
  }

  async searchPeople(query: string): Promise<Result[]> {
    const results = await this.props.peopleSearchClient.search(query);

    if (this.state.query === query) {
      this.setState({
        peopleResults: results,
      });
    }

    return results;
  }

  handleSearchErrorAnalytics(source: string) {
    return error => {
      const { firePrivateAnalyticsEvent } = this.props;

      if (firePrivateAnalyticsEvent) {
        firePrivateAnalyticsEvent(
          'atlassian.fabric.global-search.search-error',
          {
            name: error.name,
            message: error.message,
            source: source,
          },
        );
      }
    };
  }

  doSearch = async (query: string) => {
    const searchRecentPromise = this.searchRecent(query);
    const searchCrossProductPromise = this.searchCrossProduct(query);
    const searchPeoplePromise = this.searchPeople(query);

    // trigger error analytics when a search fails
    searchRecentPromise.catch(this.handleSearchErrorAnalytics('recent'));
    searchCrossProductPromise.catch(
      this.handleSearchErrorAnalytics('xpsearch'),
    );
    searchPeoplePromise.catch(this.handleSearchErrorAnalytics('people'));

    /*
    * Handle error state: Only show the error state when searching recent and xpsearch together fails.
    * For a better degraded experience we still want to display partial results when it makes sense.
    * So, if only recent or if only people search fails we can still display xpsearch results. However, if recent AND xpsearch
    * fails, then we show the error state.
    */
    (async () => {
      const criticalPromises = [searchRecentPromise, searchCrossProductPromise];
      const promiseResults = await Promise.all(
        criticalPromises.map(p => p.catch(Error)),
      );
      const allCriticalPromisesFailed = promiseResults.every(
        p => p instanceof Error,
      );
      this.setState({
        isError: allCriticalPromisesFailed,
      });
    })();

    // handle loading state. true at the beginning, false only after all promises have settled.
    (async () => {
      try {
        this.setState({
          isLoading: true,
        });

        await Promise.all(
          [
            searchRecentPromise,
            searchCrossProductPromise,
            searchPeoplePromise,
          ].map(p => p.catch(Error)),
        );
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    })();
  };

  // leading:true so that we start searching as soon as the user typed in 2 characters since we don't search before that
  doDebouncedSearch = debounce(this.doSearch, this.props.debounceMillis, {
    leading: true,
  });

  handleGetRecentItems = async () => {
    this.setState({
      recentlyViewedItems: await this.props.recentSearchClient.getRecentItems(),
    });
  };

  render() {
    return (
      <GlobalQuickSearch
        getRecentlyViewedItems={this.handleGetRecentItems}
        onSearch={this.handleSearch}
        {...this.state}
      />
    );
  }
}

export default withAnalytics(GlobalQuickSearchContainer, {}, {});
