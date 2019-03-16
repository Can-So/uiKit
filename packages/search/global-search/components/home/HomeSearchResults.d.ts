import * as React from 'react';
import { Result } from '../../model/Result';
export interface Props {
    query: string;
    isLoading: boolean;
    isError: boolean;
    keepPreQueryState: boolean;
    retrySearch(): any;
    recentlyViewedItems: Result[];
    recentResults: Result[];
    jiraResults: Result[];
    confluenceResults: Result[];
    peopleResults: Result[];
}
export default class HomeSearchResults extends React.Component<Props> {
    render(): JSX.Element;
}
