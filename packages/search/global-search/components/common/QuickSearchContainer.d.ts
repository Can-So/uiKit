import * as React from 'react';
import { LinkComponent, Logger } from '../GlobalQuickSearchWrapper';
import { GenericResultMap, ResultsWithTiming } from '../../model/Result';
import { CreateAnalyticsEventFn } from '../analytics/types';
import { ABTest } from '../../api/CrossProductSearchClient';
export interface SearchResultProps extends State {
    retrySearch: Function;
}
export interface Props {
    logger: Logger;
    linkComponent?: LinkComponent;
    getSearchResultsComponent(state: SearchResultProps): React.ReactNode;
    getRecentItems(sessionId: string): Promise<ResultsWithTiming>;
    getSearchResults(query: string, sessionId: string, startTime: number): Promise<ResultsWithTiming>;
    getAbTestData(sessionId: string): Promise<ABTest | undefined>;
    /**
     * return displayed groups from result groups
     * Used by analytics to tell how many ui groups are displayed for user
     * for example in jira we pass (issues, boards, filters and projects but we display only 2 groups issues and others combined)
     * @param results
     */
    getDisplayedResults?(results: GenericResultMap | null): GenericResultMap;
    createAnalyticsEvent?: CreateAnalyticsEventFn;
    handleSearchSubmit?(event: React.KeyboardEvent<HTMLInputElement>, searchSessionId: string): void;
    isSendSearchTermsEnabled?: boolean;
    placeholder?: string;
    selectedResultId?: string;
    onSelectedResultIdChanged?: (id: string) => void;
}
export interface State {
    latestSearchQuery: string;
    searchSessionId: string;
    isLoading: boolean;
    isError: boolean;
    keepPreQueryState: boolean;
    searchResults: GenericResultMap | null;
    recentItems: GenericResultMap | null;
}
/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
export declare class QuickSearchContainer extends React.Component<Props, State> {
    static defaultProps: {
        getDisplayedResults: (results: any) => any;
    };
    unmounted: Boolean;
    constructor(props: any);
    componentDidCatch(error: any, info: any): void;
    componentWillUnmount(): void;
    doSearch: (query: string) => Promise<void>;
    fetchAbTestData: (searchSessionId: string) => Promise<{
        elapsedMs: number;
        abTest: ABTest | undefined;
    }>;
    fireExperimentExposureEvent: (searchSessionId: string, abTestPromise: Promise<ABTest | undefined>) => Promise<void>;
    fireShownPreQueryEvent: (searchSessionId: any, recentItems: any, requestStartTime?: number | undefined, experimentRequestDurationMs?: number | undefined, renderStartTime?: number | undefined) => void;
    fireShownPostQueryEvent: (startTime: any, elapsedMs: any, searchResults: any, timings: any, searchSessionId: any, latestSearchQuery: string) => void;
    handleSearch: (newLatestSearchQuery: string) => void;
    retrySearch: () => void;
    handleMount: () => Promise<void>;
    handleSearchSubmit: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
