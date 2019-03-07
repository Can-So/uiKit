import * as React from 'react';
import {
  injectIntl,
  InjectedIntlProps,
  FormattedHTMLMessage,
} from 'react-intl';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { withAnalytics } from '@atlaskit/analytics';
import { CancelableEvent } from '@atlaskit/quick-search';
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
import { messages } from '../../messages';
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
import { getUniqueResultId } from '../ResultList';
import {
  CrossProductSearchClient,
  CrossProductSearchResults,
  ABTest,
} from '../../api/CrossProductSearchClient';
import performanceNow from '../../util/performance-now';
import AdvancedIssueSearchLink from './AdvancedIssueSearchLink';

const JIRA_RESULT_LIMIT = 6;

const NoResultsAdvancedSearchContainer = styled.div`
  margin-top: ${4 * gridSize()}px;
`;

const BeforePreQueryStateContainer = styled.div`
  margin-top: ${gridSize()}px;
`;

export interface Props {
  createAnalyticsEvent?: CreateAnalyticsEventFn;
  linkComponent?: LinkComponent;
  referralContextIdentifiers?: ReferralContextIdentifiers;
  jiraClient: JiraClient;
  peopleSearchClient: PeopleSearchClient;
  crossProductSearchClient: CrossProductSearchClient;
  disableJiraPreQueryPeopleSearch?: boolean;
  logger: Logger;
  isSendSearchTermsEnabled?: boolean;
  onAdvancedSearch?: (
    e: CancelableEvent,
    entity: string,
    query: string,
    searchSessionId: string,
  ) => void;
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
  selectedResultId?: string;
}

const LOGGER_NAME = 'AK.GlobalSearch.JiraQuickSearchContainer';

/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export class JiraQuickSearchContainer extends React.Component<
  Props & InjectedIntlProps,
  State
> {
  state: State = {
    selectedAdvancedSearchType: JiraEntityTypes.Issues,
  };

  screenCounters = {
    preQueryScreenCounter: new SearchScreenCounter(),
    postQueryScreenCounter: new SearchScreenCounter(),
  };

  handleSearchSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>,
    searchSessionId: string,
  ) => {
    const { onAdvancedSearch = () => {} } = this.props;
    const target = event.target as HTMLInputElement;
    const query = target.value;
    let defaultPrevented = false;

    onAdvancedSearch(
      Object.assign({}, event, {
        preventDefault() {
          defaultPrevented = true;
          event.preventDefault();
          event.stopPropagation();
        },
        stopPropagation() {},
      }),
      this.state.selectedAdvancedSearchType,
      query,
      searchSessionId,
    );

    if (!defaultPrevented) {
      redirectToJiraAdvancedSearch(
        this.state.selectedAdvancedSearchType,
        query,
      );
    }
  };

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
    const isPreQuery = !query; // it's true if the query is empty
    const {
      referralContextIdentifiers,
      onAdvancedSearch = () => {},
    } = this.props;
    return (
      <SearchResultsComponent
        query={query}
        isError={isError}
        isLoading={isLoading}
        retrySearch={retrySearch}
        keepPreQueryState={keepPreQueryState}
        searchSessionId={searchSessionId}
        {...this.screenCounters}
        referralContextIdentifiers={referralContextIdentifiers}
        renderNoRecentActivity={() => (
          <>
            <FormattedHTMLMessage {...messages.jira_no_recent_activity_body} />
            <NoResultsAdvancedSearchContainer>
              <JiraAdvancedSearch
                query={query}
                analyticsData={{ resultsCount: 0, wasOnNoResultsScreen: true }}
                onClick={(mouseEvent, entity) =>
                  onAdvancedSearch(mouseEvent, entity, query, searchSessionId)
                }
              />
            </NoResultsAdvancedSearchContainer>
          </>
        )}
        renderAdvancedSearchGroup={(analyticsData?) => (
          <StickyFooter style={{ marginTop: `${2 * gridSize()}px` }}>
            <JiraAdvancedSearch
              analyticsData={analyticsData}
              query={query}
              showKeyboardLozenge={!isPreQuery && !keepPreQueryState}
              showSearchIcon
              onClick={(mouseEvent, entity) =>
                onAdvancedSearch(mouseEvent, entity, query, searchSessionId)
              }
            />
          </StickyFooter>
        )}
        renderBeforePreQueryState={() => (
          <BeforePreQueryStateContainer>
            <AdvancedIssueSearchLink
              onClick={({ event }) =>
                onAdvancedSearch(
                  event,
                  JiraEntityTypes.Issues,
                  query,
                  searchSessionId,
                )
              }
            />
          </BeforePreQueryStateContainer>
        )}
        getPreQueryGroups={() => mapRecentResultsToUIGroups(recentItems)}
        getPostQueryGroups={() =>
          mapSearchResultsToUIGroups(searchResults as JiraResultsMap)
        }
        renderNoResult={() => (
          <NoResultsState
            query={query}
            onAdvancedSearch={(mouseEvent, entity) =>
              onAdvancedSearch(mouseEvent, entity, query, searchSessionId)
            }
          />
        )}
      />
    );
  };

  getRecentlyInteractedPeople = (): Promise<Result[]> => {
    /*
      the following code is temporarily feature flagged for performance reasons and will be shortly reinstated.
      https://product-fabric.atlassian.net/browse/QS-459
    */
    if (this.props.disableJiraPreQueryPeopleSearch) {
      return Promise.resolve([]);
    } else {
      const peoplePromise: Promise<
        Result[]
      > = this.props.peopleSearchClient.getRecentPeople();
      return handlePromiseError<Result[]>(
        peoplePromise,
        [] as Result[],
        error =>
          this.props.logger.safeError(
            LOGGER_NAME,
            'error in recently interacted people promise',
            error,
          ),
      ) as Promise<Result[]>;
    }
  };

  getJiraRecentItems = (sessionId: string): Promise<GenericResultMap> => {
    const jiraRecentItemsPromise = this.props.jiraClient
      .getRecentItems(sessionId)
      .then(items =>
        items.reduce<GenericResultMap<JiraResult>>((acc, item) => {
          if (item.contentType) {
            const section = contentTypeToSection[item.contentType];
            acc[section] = ([] as JiraResult[]).concat(
              acc[section] || [],
              item,
            );
          }
          return acc;
        }, {}),
      )
      .then(({ issues = [], boards = [], projects = [], filters = [] }) => ({
        objects: issues,
        containers: [...boards, ...projects, ...filters],
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

  canSearchUsers = (): Promise<boolean> => {
    /*
      the following code is temporarily feature flagged for performance reasons and will be shortly reinstated.
      https://product-fabric.atlassian.net/browse/QS-459
    */
    if (this.props.disableJiraPreQueryPeopleSearch) {
      return Promise.resolve(false);
    } else {
      return handlePromiseError(
        this.props.jiraClient.canSearchUsers(),
        false,
        error =>
          this.props.logger.safeError(
            LOGGER_NAME,
            'error fetching browse user permission',
            error,
          ),
      );
    }
  };

  getRecentItems = (sessionId: string): Promise<ResultsWithTiming> => {
    return Promise.all([
      this.getJiraRecentItems(sessionId),
      this.getRecentlyInteractedPeople(),
      this.canSearchUsers(),
    ])
      .then(([jiraItems, people, canSearchUsers]) => {
        return { ...jiraItems, people: canSearchUsers ? people : [] };
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
      JIRA_RESULT_LIMIT,
    );

    const searchPeoplePromise = Promise.resolve([] as Result[]);

    const mapPromiseToPerformanceTime = (p: Promise<any>) =>
      p.then(() => performanceNow() - startTime);

    return Promise.all<
      CrossProductSearchResults,
      Result[],
      number,
      number,
      boolean
    >([
      crossProductSearchPromise,
      searchPeoplePromise,
      mapPromiseToPerformanceTime(crossProductSearchPromise),
      mapPromiseToPerformanceTime(searchPeoplePromise),
      this.canSearchUsers(),
    ]).then(
      ([
        xpsearchResults,
        peopleResults,
        crossProductSearchElapsedMs,
        peopleElapsedMs,
        canSearchPeople,
      ]) => {
        this.highlightMatchingFirstResult(query, xpsearchResults.results.get(
          Scope.JiraIssue,
        ) as JiraResult[]);
        return {
          results: {
            objects: xpsearchResults.results.get(Scope.JiraIssue) || [],
            containers:
              xpsearchResults.results.get(Scope.JiraBoardProjectFilter) || [],
            people: canSearchPeople ? peopleResults : [],
          },
          timings: {
            crossProductSearchElapsedMs,
            peopleElapsedMs,
          },
          abTest: xpsearchResults.abTest,
        };
      },
    );
  };

  highlightMatchingFirstResult(query: string, issueResults: JiraResult[]) {
    if (
      issueResults &&
      issueResults.length > 0 &&
      typeof issueResults[0].objectKey === 'string' &&
      (issueResults[0].objectKey!.toLowerCase() === query.toLowerCase() ||
        (!!+query &&
          issueResults[0].objectKey!.toLowerCase().endsWith(`${-query}`)))
    ) {
      this.setState({
        selectedResultId: getUniqueResultId(issueResults[0]),
      });
    }
  }

  handleSelectedResultIdChanged(newSelectedId) {
    this.setState({
      selectedResultId: newSelectedId,
    });
  }

  render() {
    const {
      linkComponent,
      createAnalyticsEvent,
      isSendSearchTermsEnabled,
      logger,
    } = this.props;
    const { selectedResultId } = this.state;

    return (
      <QuickSearchContainer
        placeholder={this.props.intl.formatMessage(
          messages.jira_search_placeholder,
        )}
        linkComponent={linkComponent}
        getDisplayedResults={sliceResults}
        getSearchResultsComponent={this.getSearchResultsComponent}
        getRecentItems={this.getRecentItems}
        getSearchResults={this.getSearchResults}
        getAbTestData={this.getAbTestData}
        handleSearchSubmit={this.handleSearchSubmit}
        createAnalyticsEvent={createAnalyticsEvent}
        logger={logger}
        selectedResultId={selectedResultId}
        onSelectedResultIdChanged={newId =>
          this.handleSelectedResultIdChanged(newId)
        }
        isSendSearchTermsEnabled={isSendSearchTermsEnabled}
      />
    );
  }
}

export default injectIntl<Props>(
  withAnalytics(JiraQuickSearchContainer, {}, {}),
);
