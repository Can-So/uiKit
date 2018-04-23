import * as React from 'react';
import { withAnalytics, FireAnalyticsEvent } from '@atlaskit/analytics';
import * as uuid from 'uuid/v4';
import GlobalQuickSearch from '../GlobalQuickSearch';
import { ConfluenceClient } from '../../api/ConfluenceClient';
import {
  CrossProductSearchClient,
  CrossProductResults,
} from '../../api/CrossProductSearchClient';
import { Result } from '../../model/Result';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import renderSearchResults from './ConfluenceSearchResults';
import settlePromises from '../../util/settle-promises';

export interface Props {
  crossProductSearchClient: CrossProductSearchClient;
  peopleSearchClient: PeopleSearchClient;
  confluenceClient: ConfluenceClient;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export interface State {
  query: string;
  searchSessionId: string;
  isLoading: boolean;
  isError: boolean;
  recentlyViewedPages: Result[];
  recentlyViewedSpaces: Result[];
  objectResults: Result[];
  spaceResults: Result[];
  peopleResults: Result[];
}

/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export class ConfluenceQuickSearchContainer extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      query: '',
      searchSessionId: uuid(), // unique id for search attribution
      recentlyViewedPages: [],
      recentlyViewedSpaces: [],
      objectResults: [],
      spaceResults: [],
      peopleResults: [],
    };
  }

  handleSearch = (query: string) => {
    this.setState({
      query: query,
    });

    if (query.length === 0) {
      // reset search results so that internal state between query and results stays consistent
      this.setState({
        isError: false,
        objectResults: [],
        spaceResults: [],
        peopleResults: [],
      });
    } else {
      this.doSearch(query);
    }
  };

  async searchCrossProductConfluence(
    query: string,
  ): Promise<CrossProductResults> {
    // TODO search for pages,blogs,attachments & search for spaces
    const results = await this.props.crossProductSearchClient.search(
      query,
      this.state.searchSessionId,
    );

    if (this.state.query === query) {
      this.setState({
        objectResults: results.confluence,
        spaceResults: results.confluence,
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

  // TODO extract
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
    const confXpSearchPromise = this.searchCrossProductConfluence(query);
    const searchPeoplePromise = this.searchPeople(query);

    // trigger error analytics when a search fails
    confXpSearchPromise.catch(this.handleSearchErrorAnalytics('confluence'));
    searchPeoplePromise.catch(this.handleSearchErrorAnalytics('people'));

    /*
    * Handle error state
    */
    (async () => {
      try {
        await confXpSearchPromise;
        this.setState({
          isError: false,
        });
      } catch (e) {
        this.setState({
          isError: true,
        });
      }
    })();

    // handle loading state. true at the beginning, false only after all promises have settled.
    (async () => {
      try {
        this.setState({
          isLoading: true,
        });

        await settlePromises([confXpSearchPromise, searchPeoplePromise]);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    })();
  };

  handleMount = async () => {
    const recentItemsPromise = this.props.confluenceClient.getRecentItems();
    const recentSpacesPromise = this.props.confluenceClient.getRecentSpaces();

    this.setState({
      recentlyViewedPages: await recentItemsPromise,
      recentlyViewedSpaces: await recentSpacesPromise,
    });
  };

  retrySearch = () => {
    this.handleSearch(this.state.query);
  };

  render() {
    const {
      query,
      isLoading,
      isError,
      recentlyViewedPages,
      recentlyViewedSpaces,
      objectResults,
      spaceResults,
      peopleResults,
    } = this.state;

    return (
      <GlobalQuickSearch
        onMount={this.handleMount}
        onSearch={this.handleSearch}
        isLoading={isLoading}
        query={query}
      >
        {renderSearchResults({
          query,
          isError,
          isLoading,
          retrySearch: this.retrySearch,
          recentlyViewedPages,
          recentlyViewedSpaces,
          objectResults,
          spaceResults,
          peopleResults,
        })}
      </GlobalQuickSearch>
    );
  }
}

export default withAnalytics(ConfluenceQuickSearchContainer, {}, {});
