import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
  withAnalytics,
  FireAnalyticsEvent,
} from '../../../../../core/analytics/src';
import { ConfluenceClient } from '../../api/ConfluenceClient';
import {
  CrossProductSearchClient,
  Scope,
} from '../../api/CrossProductSearchClient';
import { Result } from '../../model/Result';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import ConfluenceSearchResults, {
  MAX_PAGES_BLOGS_ATTACHMENTS,
  MAX_SPACES,
  MAX_PEOPLE,
} from './ConfluenceSearchResults';
import { SearchScreenCounter, ScreenCounter } from '../../util/ScreenCounter';
import {
  LinkComponent,
  ReferralContextIdentifiers,
} from '../GlobalQuickSearchWrapper';
import {
  redirectToConfluenceAdvancedSearch,
  handlePromiseError,
} from '../SearchResultsUtil';
import {
  ShownAnalyticsAttributes,
  buildShownEventDetails,
  SearchPerformanceTiming,
} from '../../util/analytics-util';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { take } from '../SearchResultsUtil';
import {
  firePreQueryShownEvent,
  firePostQueryShownEvent,
} from '../../util/analytics-event-helper';
import { CreateAnalyticsEventFn } from '../analytics/types';
import performanceNow from '../../util/performance-now';
import { QuickSearchContainer } from '../common/QuickSearchContainer';
import SearchResults from '../SearchResults';
export interface Props {
  crossProductSearchClient: CrossProductSearchClient;
  peopleSearchClient: PeopleSearchClient;
  confluenceClient: ConfluenceClient;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
  linkComponent?: LinkComponent;
  createAnalyticsEvent?: CreateAnalyticsEventFn;
  referralContextIdentifiers?: ReferralContextIdentifiers;
  isSendSearchTermsEnabled?: boolean;
  useAggregatorForConfluenceObjects: boolean;
}

/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export class ConfluenceQuickSearchContainer extends React.Component<
  Props & InjectedIntlProps
> {
  screenCounters: {
    preQueryScreenCounter: ScreenCounter;
    postQueryScreenCounter: ScreenCounter;
  };

  constructor(props) {
    super(props);
    const preQueryScreenCounter = new SearchScreenCounter();
    const postQueryScreenCounter = new SearchScreenCounter();
    this.screenCounters = {
      preQueryScreenCounter,
      postQueryScreenCounter,
    };
  }

  handleSearchSubmit = ({ target }) => {
    const query = target.value;
    redirectToConfluenceAdvancedSearch(query);
  };

  async searchQuickNav(
    query: string,
    searchSessionId: string,
  ): Promise<Result[]> {
    const results = await this.props.confluenceClient.searchQuickNav(
      query,
      searchSessionId,
    );
    return results;
  }

  async searchCrossProductConfluence(
    query: string,
    searchSessionId: string,
  ): Promise<Map<Scope, Result[]>> {
    const scopes = this.props.useAggregatorForConfluenceObjects
      ? [Scope.ConfluencePageBlogAttachment, Scope.ConfluenceSpace]
      : [Scope.ConfluenceSpace];

    const results = await this.props.crossProductSearchClient.search(
      query,
      searchSessionId,
      scopes,
    );
    return results;
  }

  async searchPeople(query: string): Promise<Result[]> {
    const results = await this.props.peopleSearchClient.search(query);
    return results;
  }

  // TODO extract
  handleSearchErrorAnalytics(error, source: string): void {
    const { firePrivateAnalyticsEvent } = this.props;
    if (firePrivateAnalyticsEvent) {
      try {
        firePrivateAnalyticsEvent(
          'atlassian.fabric.global-search.search-error',
          {
            name: error.name,
            message: error.message,
            source: source,
          },
        );
      } catch (error) {
        // TODO logging on error
      }
    }
  }

  handleSearchErrorAnalyticsThunk = (
    source: string,
  ): ((reason: any) => void) => error =>
    this.handleSearchErrorAnalytics(error, source);

  fireShownPreQueryEvent = (
    searchSessionId,
    recentItems,
    requestStartTime?: number,
  ) => {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      const elapsedMs: number = requestStartTime
        ? performanceNow() - requestStartTime
        : 0;

      const eventAttributes: ShownAnalyticsAttributes = buildShownEventDetails(
        take(recentItems.recentlyViewedPages, MAX_PAGES_BLOGS_ATTACHMENTS),
        take(recentItems.recentlyViewedSpaces, MAX_SPACES),
        take(recentItems.recentlyInteractedPeople, MAX_PEOPLE),
      );

      firePreQueryShownEvent(
        eventAttributes,
        elapsedMs,
        searchSessionId,
        createAnalyticsEvent,
      );
    }
  };

  fireShownPostQueryEvent = (
    startTime,
    elapsedMs,
    searchResult,
    searchSessionId,
    latestSearchQuery: string,
  ) => {
    const searchPerformanceTiming: SearchPerformanceTiming = {
      startTime,
      elapsedMs,
      ...searchResult.searchTimings,
    };

    const resultsDetails: ShownAnalyticsAttributes = buildShownEventDetails(
      take(searchResult.objectResults, MAX_PAGES_BLOGS_ATTACHMENTS),
      take(searchResult.spaceResults, MAX_SPACES),
      take(searchResult.peopleResults, MAX_PEOPLE),
    );

    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      firePostQueryShownEvent(
        resultsDetails,
        searchPerformanceTiming,
        searchSessionId,
        latestSearchQuery,
        createAnalyticsEvent,
      );
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      Object.keys({ ...nextProps, ...this.props })
        .map(key => this.props[key] !== nextProps[key])
        .reduce((acc, value) => acc || value, false) || this.state !== nextState
    );
  }

  getSearchResults = (query, sessionId, startTime) => {
    const useAggregator = this.props.useAggregatorForConfluenceObjects;

    const quickNavPromise = useAggregator
      ? Promise.resolve([])
      : this.searchQuickNav(query, sessionId).catch(error => {
          this.handleSearchErrorAnalytics(error, 'confluence.quicknav');
          // rethrow to fail the promise
          throw error;
        });
    const confXpSearchPromise = handlePromiseError(
      this.searchCrossProductConfluence(query, sessionId),
      new Map<Scope, Result[]>(),
      this.handleSearchErrorAnalyticsThunk('xpsearch-confluence'),
    );

    const searchPeoplePromise = handlePromiseError(
      this.searchPeople(query),
      [],
      this.handleSearchErrorAnalyticsThunk('search-people'),
    );

    const mapPromiseToPerformanceTime = p =>
      p.then(() => performanceNow() - startTime);

    const timingPromise = [
      quickNavPromise,
      confXpSearchPromise,
      searchPeoplePromise,
    ].map(mapPromiseToPerformanceTime);

    return Promise.all([
      quickNavPromise,
      confXpSearchPromise,
      searchPeoplePromise,
      ...timingPromise,
    ]).then(
      ([
        objectResults = [],
        xpsearchResultsMap = new Map<Scope, Result[]>(),
        peopleResults = [],
        quickNavElapsedMs,
        confSearchElapsedMs,
        peopleElapsedMs,
      ]) => ({
        objectResults: useAggregator
          ? xpsearchResultsMap.get(Scope.ConfluencePageBlogAttachment)
          : objectResults,
        spaceResults: xpsearchResultsMap.get(Scope.ConfluenceSpace) || [],
        peopleResults,
        searchTimings: {
          quickNavElapsedMs,
          confSearchElapsedMs,
          peopleElapsedMs,
        },
      }),
    );
  };

  getRecentItems = sessionId => {
    const { confluenceClient, peopleSearchClient } = this.props;

    const recentActivityPromisesMap = {
      'recent-confluence-items': confluenceClient.getRecentItems(sessionId),
      'recent-confluence-spaces': confluenceClient.getRecentSpaces(sessionId),
      'recent-people': peopleSearchClient.getRecentPeople(),
    };

    const recentActivityPromises = Object.keys(recentActivityPromisesMap).map(
      key =>
        handlePromiseError(
          recentActivityPromisesMap[key],
          [],
          this.handleSearchErrorAnalyticsThunk(key),
        ),
    );

    return Promise.all(recentActivityPromises).then(
      ([
        recentlyViewedPages = [],
        recentlyViewedSpaces = [],
        recentlyInteractedPeople = [],
      ]) => ({
        recentlyViewedPages,
        recentlyViewedSpaces,
        recentlyInteractedPeople,
      }),
    );
  };

  getSearchResultComponent = ({
    retrySearch,
    latestSearchQuery,
    isError,
    searchResult,
    isLoading,
    recentItems,
    keepPreQueryState,
    searchSessionId,
  }) => {
    const { objectResults = [], spaceResults = [], peopleResults = [] } =
      searchResult || {};

    const {
      recentlyViewedPages = [],
      recentlyViewedSpaces = [],
      recentlyInteractedPeople = [],
    } =
      recentItems || {};

    return (
      <ConfluenceSearchResults
        retrySearch={retrySearch}
        query={latestSearchQuery}
        isError={isError}
        objectResults={objectResults}
        spaceResults={spaceResults}
        peopleResults={peopleResults}
        isLoading={isLoading}
        recentlyViewedPages={recentlyViewedPages}
        recentlyViewedSpaces={recentlyViewedSpaces}
        recentlyInteractedPeople={recentlyInteractedPeople}
        keepPreQueryState={keepPreQueryState}
        searchSessionId={searchSessionId}
        referralContextIdentifiers={this.props.referralContextIdentifiers}
        {...this.screenCounters}
      />
    );
  };
  render() {
    const { linkComponent, isSendSearchTermsEnabled } = this.props;

    return (
      <QuickSearchContainer
        intl={this.props.intl}
        linkComponent={linkComponent}
        getSearchResultComponent={this.getSearchResultComponent}
        fireShownPreQueryEvent={this.fireShownPreQueryEvent}
        fireShownPostQueryEvent={this.fireShownPostQueryEvent}
        getRecentItems={this.getRecentItems}
        getSearchResult={this.getSearchResults}
        handleSearchSubmit={this.handleSearchSubmit}
        isSendSearchTermsEnabled={isSendSearchTermsEnabled}
      />
    );
  }
}

export default injectIntl<Props>(
  withAnalyticsEvents()(withAnalytics(ConfluenceQuickSearchContainer, {}, {})),
);
