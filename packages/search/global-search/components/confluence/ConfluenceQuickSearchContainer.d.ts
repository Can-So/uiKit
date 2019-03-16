import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import { CancelableEvent } from '@atlaskit/quick-search';
import { ConfluenceClient } from '../../api/ConfluenceClient';
import { CrossProductSearchClient, CrossProductSearchResults, ABTest } from '../../api/CrossProductSearchClient';
import { Result, ResultsWithTiming } from '../../model/Result';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import { SearchScreenCounter } from '../../util/ScreenCounter';
import { LinkComponent, ReferralContextIdentifiers, Logger } from '../GlobalQuickSearchWrapper';
import { CreateAnalyticsEventFn } from '../analytics/types';
export interface Props {
    crossProductSearchClient: CrossProductSearchClient;
    peopleSearchClient: PeopleSearchClient;
    confluenceClient: ConfluenceClient;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
    linkComponent?: LinkComponent;
    createAnalyticsEvent?: CreateAnalyticsEventFn;
    referralContextIdentifiers?: ReferralContextIdentifiers;
    isSendSearchTermsEnabled?: boolean;
    useQuickNavForPeopleResults?: boolean;
    useCPUSForPeopleResults?: boolean;
    logger: Logger;
    onAdvancedSearch?: (e: CancelableEvent, entity: string, query: string, searchSessionId: string) => void;
}
/**
 * Container Component that handles the data fetching when the user interacts with Search.
 */
export declare class ConfluenceQuickSearchContainer extends React.Component<Props & InjectedIntlProps> {
    screenCounters: {
        preQueryScreenCounter: SearchScreenCounter;
        postQueryScreenCounter: SearchScreenCounter;
    };
    handleSearchSubmit: (event: React.KeyboardEvent<HTMLInputElement>, searchSessionId: string) => void;
    searchCrossProductConfluence(query: string, sessionId: string): Promise<CrossProductSearchResults>;
    searchPeople(query: string, sessionId: string): Promise<Result[]>;
    handleSearchErrorAnalytics(error: any, source: string): void;
    handleSearchErrorAnalyticsThunk: (source: string) => (reason: any) => void;
    getSearchResults: (query: string, sessionId: string, startTime: number) => Promise<ResultsWithTiming>;
    getAbTestData: (sessionId: string) => Promise<ABTest | undefined>;
    getRecentItems: (sessionId: string) => Promise<ResultsWithTiming>;
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
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
