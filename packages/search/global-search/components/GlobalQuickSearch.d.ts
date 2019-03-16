import * as React from 'react';
import { LinkComponent } from './GlobalQuickSearchWrapper';
import { SelectedSearchResultEvent } from '../util/analytics-event-helper';
import { CreateAnalyticsEventFn } from './analytics/types';
export interface Props {
    onMount(): any;
    onSearch(query: string): any;
    onSearchSubmit?(event: React.KeyboardEvent<HTMLInputElement>): any;
    isLoading: boolean;
    placeholder?: string;
    searchSessionId: string;
    children: React.ReactNode;
    linkComponent?: LinkComponent;
    createAnalyticsEvent?: CreateAnalyticsEventFn;
    isSendSearchTermsEnabled?: boolean;
    selectedResultId?: string;
    onSelectedResultIdChanged?: (id: string | number | null) => void;
}
export interface State {
    query: string;
}
/**
 * Presentational component that renders the search input and search results.
 */
export declare class GlobalQuickSearch extends React.Component<Props, State> {
    static defaultProps: Partial<Props>;
    queryVersion: number;
    resultSelected: boolean;
    state: {
        query: string;
    };
    componentDidMount(): void;
    handleSearchInput: ({ target }: {
        target: any;
    }) => void;
    debouncedSearch: any;
    doSearch(query: string): void;
    fireSearchResultSelectedEvent: (eventData: SelectedSearchResultEvent) => void;
    fireSearchResultEvents: (eventName: string, eventData: Object) => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
