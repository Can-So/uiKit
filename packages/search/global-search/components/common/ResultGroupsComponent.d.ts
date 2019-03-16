import * as React from 'react';
import { ScreenCounter } from '../../util/ScreenCounter';
import { ReferralContextIdentifiers } from '../GlobalQuickSearchWrapper';
import { ResultsGroup } from '../../model/Result';
export declare enum ResultGroupType {
    PreQuery = "PreQuery",
    PostQuery = "PostQuery"
}
export interface Props {
    resultsGroups: ResultsGroup[];
    type: ResultGroupType;
    renderAdvancedSearch: (analyticsData?: any) => JSX.Element;
    searchSessionId: string;
    screenCounter?: ScreenCounter;
    referralContextIdentifiers?: ReferralContextIdentifiers;
}
export default class ResultGroupsComponent extends React.Component<Props> {
    getAnalyticsComponent(): JSX.Element;
    getAnalyticsData: () => {
        resultCount: number;
    };
    render(): JSX.Element;
}
