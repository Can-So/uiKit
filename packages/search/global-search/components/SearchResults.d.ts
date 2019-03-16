import * as React from 'react';
export interface Props {
    query: string;
    isError: boolean;
    isLoading: boolean;
    retrySearch(): any;
    keepPreQueryState: boolean;
    shouldRenderNoResultsState: () => boolean;
    renderPreQueryStateComponent: () => JSX.Element;
    renderNoResultsStateComponent: () => JSX.Element;
    renderSearchResultsStateComponent: () => JSX.Element;
}
export default class SearchResults extends React.Component<Props> {
    render(): JSX.Element | null;
}
