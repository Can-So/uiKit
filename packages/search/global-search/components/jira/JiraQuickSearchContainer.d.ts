import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { CancelableEvent } from '@findable/quick-search';
import { CreateAnalyticsEventFn } from '../analytics/types';
import { SearchScreenCounter } from '../../util/ScreenCounter';
import { JiraClient } from '../../api/JiraClient';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import { LinkComponent, ReferralContextIdentifiers, Logger } from '../GlobalQuickSearchWrapper';
import { JiraEntityTypes } from '../SearchResultsUtil';
import { JiraResult, Result, ResultsWithTiming, GenericResultMap } from '../../model/Result';
import { CrossProductSearchClient, ABTest } from '../../api/CrossProductSearchClient';
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
    onAdvancedSearch?: (e: CancelableEvent, entity: string, query: string, searchSessionId: string) => void;
}
export interface State {
    selectedAdvancedSearchType: JiraEntityTypes;
    selectedResultId?: string;
}
/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export declare class JiraQuickSearchContainer extends React.Component<Props & InjectedIntlProps, State> {
    state: State;
    screenCounters: {
        preQueryScreenCounter: SearchScreenCounter;
        postQueryScreenCounter: SearchScreenCounter;
    };
    handleSearchSubmit: (event: React.KeyboardEvent<HTMLInputElement>, searchSessionId: string) => void;
    getSearchResultsComponent: ({ retrySearch, latestSearchQuery, isError, searchResults, isLoading, recentItems, keepPreQueryState, searchSessionId, }: {
        retrySearch: any;
        latestSearchQuery: any;
        isError: any;
        searchResults: any;
        isLoading: any;
        recentItems: any;
        keepPreQueryState: any;
        searchSessionId: any;
    }) => JSX.Element;
    getRecentlyInteractedPeople: () => Promise<Result[]>;
    getJiraRecentItems: (sessionId: string) => Promise<GenericResultMap<Result>>;
    getAbTestData: (sessionId: string) => Promise<ABTest | undefined>;
    canSearchUsers: () => Promise<boolean>;
    getRecentItems: (sessionId: string) => Promise<ResultsWithTiming>;
    getSearchResults: (query: string, sessionId: string, startTime: number) => Promise<ResultsWithTiming>;
    highlightMatchingFirstResult(query: string, issueResults: JiraResult[]): void;
    handleSelectedResultIdChanged(newSelectedId: any): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
