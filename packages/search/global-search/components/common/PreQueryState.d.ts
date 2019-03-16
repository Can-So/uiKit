import * as React from 'react';
import { ScreenCounter } from '../../util/ScreenCounter';
import { ResultsGroup } from '../../model/Result';
import { ReferralContextIdentifiers } from '../GlobalQuickSearchWrapper';
export interface Props {
    query: string;
    resultsGroups: ResultsGroup[];
    searchSessionId: string;
    screenCounter?: ScreenCounter;
    referralContextIdentifiers?: ReferralContextIdentifiers;
    renderNoRecentActivity: () => JSX.Element;
    renderAdvancedSearchGroup: (analyticsData?: any) => JSX.Element;
}
export default class PreQueryState extends React.Component<Props> {
    render(): JSX.Element;
}
