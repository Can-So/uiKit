import * as React from 'react';
import {
  injectIntl,
  InjectedIntlProps,
  FormattedHTMLMessage,
} from 'react-intl';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { withAnalytics } from '@atlaskit/analytics';
import StickyFooter from '../common/StickyFooter';
import { CreateAnalyticsEventFn } from '../analytics/types';
import { SearchScreenCounter } from '../../util/ScreenCounter';
import { JiraClient } from '../../api/JiraClient';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import { Scope } from '../../api/types';
import {
  LinkComponent,
  ReferralContextIdentifiers,
  Logger,
} from '../GlobalQuickSearchWrapper';
import QuickSearchContainer from '../common/QuickSearchContainer';
import { sliceResults } from './JiraSearchResultsMapper';
import SearchResultsComponent from '../common/SearchResults';
import NoResultsState from './NoResultsState';
import JiraAdvancedSearch from './JiraAdvancedSearch';
import {
  mapRecentResultsToUIGroups,
  mapSearchResultsToUIGroups,
} from './JiraSearchResultsMapper';
import {
  handlePromiseError,
  JiraEntityTypes,
  redirectToJiraAdvancedSearch,
} from '../SearchResultsUtil';
import {
  ContentType,
  JiraResult,
  Result,
  ResultsWithTiming,
  GenericResultMap,
  JiraResultsMap,
} from '../../model/Result';
import {
  CrossProductSearchClient,
  CrossProductSearchResults,
  ABTest,
} from '../../api/CrossProductSearchClient';
import performanceNow from '../../util/performance-now';

const AdvancedSearchContainer = styled.div`
  margin-top: ${4 * gridSize()}px;
`;

export interface Props {
  createAnalyticsEvent?: CreateAnalyticsEventFn;
  linkComponent?: LinkComponent;
  referralContextIdentifiers?: ReferralContextIdentifiers;
  jiraClient: JiraClient;
  peopleSearchClient: PeopleSearchClient;
  crossProductSearchClient: CrossProductSearchClient;
  logger: Logger;
}

const contentTypeToSection = {
  [ContentType.JiraIssue]: 'issues',
  [ContentType.JiraBoard]: 'boards',
  [ContentType.JiraFilter]: 'filters',
  [ContentType.JiraProject]: 'projects',
};

const scopes = [Scope.JiraIssue, Scope.JiraBoardProjectFilter];

export interface State {
  selectedAdvancedSearchType: JiraEntityTypes;
}

const LOGGER_NAME = 'AK.GlobalSearch.JiraQuickSearchContainer';

/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export class JiraQuickSearchContainer extends React.Component<
  Props & InjectedIntlProps,
  State
> {
  state = {
    selectedAdvancedSearchType: JiraEntityTypes.Issues,
  };

  screenCounters = {
    preQueryScreenCounter: new SearchScreenCounter(),
    postQueryScreenCounter: new SearchScreenCounter(),
  };

  handleSearchSubmit = ({ target }) => {
    const query = target.value;
    redirectToJiraAdvancedSearch(this.state.selectedAdvancedSearchType, query);
  };

  onAdvancedSearchChange = entityType =>
    this.setState({ selectedAdvancedSearchType: entityType });

  getSearchResultsComponent = ({
    retrySearch,
    latestSearchQuery,
    isError,
    searchResults,
    isLoading,
    recentItems,
    keepPreQueryState,
    searchSessionId,
  }) => {
    const query = latestSearchQuery;
    return (
      <SearchResultsComponent
        query={query}
        isError={isError}
        isLoading={isLoading}
        retrySearch={retrySearch}
        keepPreQueryState={keepPreQueryState}
        searchSessionId={searchSessionId}
        {...this.screenCounters}
        referralContextIdentifiers={this.props.referralContextIdentifiers}
        renderNoRecentActivity={() => (
          <>
            <FormattedHTMLMessage id="global-search.jira.no-recent-activity-body" />
            <AdvancedSearchContainer>
              <JiraAdvancedSearch
                query={query}
                analyticsData={{ resultsCount: 0, wasOnNoResultsScreen: true }}
              />
            </AdvancedSearchContainer>
          </>
        )}
        renderAdvancedSearchGroup={(analyticsData?) => (
          <StickyFooter>
            <JiraAdvancedSearch
              analyticsData={analyticsData}
              query={query}
              showKeyboardLozenge
              showSearchIcon
              onAdvancedSearchChange={this.onAdvancedSearchChange}
            />
          </StickyFooter>
        )}
        getPreQueryGroups={() => mapRecentResultsToUIGroups(recentItems)}
        getPostQueryGroups={() =>
          mapSearchResultsToUIGroups(searchResults as JiraResultsMap)
        }
        renderNoResult={() => <NoResultsState query={query} />}
      />
    );
  };

  getRecentlyInteractedPeople = (): Promise<Result[]> => {
    const peoplePromise: Promise<
      Result[]
    > = this.props.peopleSearchClient.getRecentPeople();
    return handlePromiseError<Result[]>(peoplePromise, [] as Result[], error =>
      this.props.logger.safeError(
        LOGGER_NAME,
        'error in recently interacted people promise',
        error,
      ),
    ) as Promise<Result[]>;
  };

  getJiraRecentItems = (sessionId: string): Promise<GenericResultMap> => {
    const jiraRecentItemsPromise = this.props.jiraClient
      .getRecentItems(sessionId)
      .then(items =>
        items.reduce(
          (acc: { [key: string]: JiraResult[] }, item: JiraResult) => {
            if (item.contentType) {
              const section = contentTypeToSection[item.contentType];
              acc[section] = ([] as JiraResult[]).concat(
                acc[section] || [],
                item,
              );
            }
            return acc;
          },
          {} as GenericResultMap,
        ),
      )
      .then(({ issues = [], boards = [], projects = [], filters = [] }) => ({
        objects: issues,
        containers: [...boards, ...filters, ...projects],
      }));

    return handlePromiseError(
      jiraRecentItemsPromise,
      {
        objects: [],
        containers: [],
      },
      error =>
        this.props.logger.safeError(
          LOGGER_NAME,
          'error in recent Jira items promise',
          error,
        ),
    );
  };

  getAbTestData = (sessionId: string): Promise<ABTest | undefined> => {
    return this.props.crossProductSearchClient.getAbTestData(Scope.JiraIssue, {
      sessionId,
    });
  };

  getRecentItems = (sessionId: string): Promise<ResultsWithTiming> => {
    return Promise.all([
      this.getJiraRecentItems(sessionId),
      this.getRecentlyInteractedPeople(),
    ])
      .then(([jiraItems, people]) => {
        return { ...jiraItems, people };
      })
      .then(results => ({ results } as ResultsWithTiming));
  };

  getSearchResults = (
    query: string,
    sessionId: string,
    startTime: number,
  ): Promise<ResultsWithTiming> => {
    const referrerId =
      this.props.referralContextIdentifiers &&
      this.props.referralContextIdentifiers.searchReferrerId;
    const crossProductSearchPromise = this.props.crossProductSearchClient.search(
      query,
      { sessionId, referrerId },
      scopes,
    );

    const searchPeoplePromise = handlePromiseError(
      this.props.peopleSearchClient.search(query),
      [] as Result[],
      error =>
        this.props.logger.safeError(
          LOGGER_NAME,
          'error in search people promise',
          error,
        ),
    );

    const mapPromiseToPerformanceTime = (p: Promise<any>) =>
      p.then(() => performanceNow() - startTime);

    return Promise.all<CrossProductSearchResults, Result[], number, number>([
      crossProductSearchPromise,
      searchPeoplePromise,
      mapPromiseToPerformanceTime(crossProductSearchPromise),
      mapPromiseToPerformanceTime(searchPeoplePromise),
    ]).then(
      ([
        xpsearchResults,
        peopleResults,
        crossProductSearchElapsedMs,
        peopleElapsedMs,
      ]) => ({
        results: {
          objects: xpsearchResults.results.get(Scope.JiraIssue) || [],
          containers:
            xpsearchResults.results.get(Scope.JiraBoardProjectFilter) || [],
          people: peopleResults,
        },
        timings: {
          crossProductSearchElapsedMs,
          peopleElapsedMs,
        },
        abTest: xpsearchResults.abTest,
      }),
    );
  };

  render() {
    const { linkComponent, createAnalyticsEvent, logger } = this.props;

    return (
      <QuickSearchContainer
        placeholder={this.props.intl.formatMessage({
          id: 'global-search.jira.search-placeholder',
        })}
        linkComponent={linkComponent}
        getDisplayedResults={sliceResults}
        getSearchResultsComponent={this.getSearchResultsComponent}
        getRecentItems={this.getRecentItems}
        getSearchResults={this.getSearchResults}
        getAbTestData={this.getAbTestData}
        handleSearchSubmit={this.handleSearchSubmit}
        createAnalyticsEvent={createAnalyticsEvent}
        logger={logger}
      />
    );
  }
}

export default injectIntl<Props>(
  withAnalytics(JiraQuickSearchContainer, {}, {}),
);
