import * as React from 'react';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import { RecentSearchClient } from '../../api/RecentSearchClient';
import { CrossProductSearchClient } from '../../api/CrossProductSearchClient';
import { Scope } from '../../api/types';
import { Result } from '../../model/Result';
import { PeopleSearchClient } from '../../api/PeopleSearchClient';
import { LinkComponent } from '../GlobalQuickSearchWrapper';
export interface Props {
    recentSearchClient: RecentSearchClient;
    crossProductSearchClient: CrossProductSearchClient;
    peopleSearchClient: PeopleSearchClient;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
    linkComponent?: LinkComponent;
}
export interface State {
    latestSearchQuery: string;
    searchSessionId: string;
    isLoading: boolean;
    isError: boolean;
    keepPreQueryState: boolean;
    recentlyViewedItems: Result[];
    recentResults: Result[];
    jiraResults: Result[];
    confluenceResults: Result[];
    peopleResults: Result[];
}
/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export declare class HomeQuickSearchContainer extends React.Component<Props, State> {
    constructor(props: Props);
    handleSearch: (query: string) => void;
    searchRecent(query: string): Promise<Result[]>;
    searchCrossProduct(query: string): Promise<Map<Scope, Result[]>>;
    searchPeople(query: string): Promise<Result[]>;
    handleSearchErrorAnalytics(source: string): (error: any) => void;
    doSearch: (query: string) => Promise<void>;
    handleGetRecentItems: () => Promise<void>;
    retrySearch: () => void;
    render(): JSX.Element;
}
declare const _default: typeof HomeQuickSearchContainer;
export default _default;
