import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import { CreateAnalyticsEventFn } from '../analytics/types';
import { JiraClient } from '../../api/JiraClient';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import { LinkComponent } from '../GlobalQuickSearchWrapper';
import QuickSearchContainer from '../common/QuickSearchContainer';
import JiraSearchResults from './JiraSearchResults';
import { sliceResults } from './JiraSearchResultsMapper';

export interface Props {
  createAnalyticsEvent?: CreateAnalyticsEventFn;
  linkComponent?: LinkComponent;
  jiraClient: JiraClient;
  peopleSearchClient: PeopleSearchClient;
}
import {
  handlePromiseError,
  JiraEntityTypes,
  redirectToJiraAdvancedSearch,
} from '../SearchResultsUtil';
import {
  ContentType,
  JiraObjectResult,
  Result,
  ResultsWithTiming,
  GenericResultMap,
} from '../../model/Result';

const contentTypeToSection = {
  [ContentType.JiraIssue]: 'issues',
  [ContentType.JiraBoard]: 'boards',
  [ContentType.JiraFilter]: 'filters',
  [ContentType.JiraProject]: 'projects',
};

export interface State {
  selectedAdvancedSearchType: JiraEntityTypes;
}

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

  handleSearchSubmit = ({ target }) => {
    const query = target.value;
    redirectToJiraAdvancedSearch(this.state.selectedAdvancedSearchType, query);
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
    return (
      <JiraSearchResults
        retrySearch={retrySearch}
        query={latestSearchQuery}
        isError={isError}
        searchResults={searchResults}
        isLoading={isLoading}
        recentItems={recentItems}
        keepPreQueryState={keepPreQueryState}
        searchSessionId={searchSessionId}
        onAdvancedSearchChange={entityType =>
          this.setState({ selectedAdvancedSearchType: entityType })
        }
      />
    );
  };

  getRecentlyInteractedPeople = (): Promise<Result[]> => {
    const peoplePromise: Promise<
      Result[]
    > = this.props.peopleSearchClient.getRecentPeople();
    return handlePromiseError<Result[]>(
      peoplePromise,
      [] as Result[],
    ) as Promise<Result[]>;
  };

  getJiraRecentItems = (sessionId: string) => {
    const jiraRecentItemsPromise = this.props.jiraClient
      .getRecentItems(sessionId)
      .then(items =>
        items.reduce(
          (
            acc: { [key: string]: JiraObjectResult[] },
            item: JiraObjectResult,
          ) => {
            if (item.contentType) {
              const section = contentTypeToSection[item.contentType];
              acc[section] = ([] as JiraObjectResult[]).concat(
                acc[section] || [],
                item,
              );
            }
            return acc;
          },
          {} as GenericResultMap,
        ),
      );
    return handlePromiseError(jiraRecentItemsPromise, {
      issues: [],
      boards: [],
      filters: [],
      projects: [],
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
    return this.props.peopleSearchClient.search(query).then(people => ({
      results: {
        people,
        issues: [],
        boards: [],
        filters: [],
        projects: [],
      },
    }));
  };

  render() {
    const { linkComponent, createAnalyticsEvent } = this.props;

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
        handleSearchSubmit={this.handleSearchSubmit}
        createAnalyticsEvent={createAnalyticsEvent}
      />
    );
  }
}

export default injectIntl<Props>(
  withAnalytics(JiraQuickSearchContainer, {}, {}),
);
