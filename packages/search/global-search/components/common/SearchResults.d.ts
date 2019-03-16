import * as React from 'react';
import { ScreenCounter } from '../../util/ScreenCounter';
import { ReferralContextIdentifiers } from '../GlobalQuickSearchWrapper';
import { ResultsGroup } from '../../model/Result';
export interface Props {
    query: string;
    isError: boolean;
    isLoading: boolean;
    renderNoResult: () => JSX.Element;
    renderNoRecentActivity: () => JSX.Element;
    renderBeforePreQueryState?: () => JSX.Element;
    retrySearch(): any;
    getPreQueryGroups: () => ResultsGroup[];
    getPostQueryGroups: () => ResultsGroup[];
    renderAdvancedSearchGroup: (analyticsData?: any) => JSX.Element;
    keepPreQueryState: boolean;
    searchSessionId: string;
    preQueryScreenCounter?: ScreenCounter;
    postQueryScreenCounter?: ScreenCounter;
    referralContextIdentifiers?: ReferralContextIdentifiers;
}
export default class SearchResults extends React.Component<Props> {
    hasNoResult(): boolean;
    renderNoResult(): JSX.Element;
    renderPreQueryState(): JSX.Element;
    renderSearchResultsState(): JSX.Element;
    render(): JSX.Element | null;
}
