import { ShownAnalyticsAttributes, PerformanceTiming } from './analytics-util';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import { CreateAnalyticsEventFn } from '../components/analytics/types';
import { ABTest } from '../api/CrossProductSearchClient';
export declare function firePreQueryShownEvent(eventAttributes: ShownAnalyticsAttributes, elapsedMs: number, renderTimeMs: number, searchSessionId: string, createAnalyticsEvent: CreateAnalyticsEventFn, experimentRequestDurationMs?: number): void;
export declare function fireExperimentExposureEvent(abTest: ABTest, searchSessionId: string, createAnalyticsEvent: CreateAnalyticsEventFn): void;
export declare function fireTextEnteredEvent(query: string, searchSessionId: string, queryVersion: number, isSendSearchTermsEnabled?: boolean, createAnalyticsEvent?: CreateAnalyticsEventFn): void;
export declare function fireDismissedEvent(searchSessionId: string, createAnalyticsEvent?: CreateAnalyticsEventFn): void;
export declare function firePostQueryShownEvent(resultsDetails: ShownAnalyticsAttributes, timings: PerformanceTiming, searchSessionId: string, query: string, createAnalyticsEvent: CreateAnalyticsEventFn): void;
export interface SearchResultEvent {
    resultId: string;
    type: string;
    contentType: string;
    sectionIndex: string;
    index: string;
    indexWithinSection: string;
    containerId?: string;
    resultCount?: string;
    experimentId?: string;
}
export interface KeyboardControlEvent extends SearchResultEvent {
    key: string;
}
export interface SelectedSearchResultEvent extends SearchResultEvent {
    method: string;
    newTab: boolean;
    query: string;
    queryVersion: number;
    queryId: null | string;
}
export interface AdvancedSearchSelectedEvent extends SelectedSearchResultEvent {
    wasOnNoResultsScreen: boolean;
    trigger?: string;
    isLoading: boolean;
}
export declare type AnalyticsNextEvent = {
    payload: GasPayload;
    context: Array<any>;
    update: (GasPayload: any) => AnalyticsNextEvent;
    fire: (string: any) => AnalyticsNextEvent;
};
export declare function fireSelectedSearchResult(eventData: SelectedSearchResultEvent, searchSessionId: string, createAnalyticsEvent?: CreateAnalyticsEventFn): void;
export declare function fireSelectedAdvancedSearch(eventData: AdvancedSearchSelectedEvent, searchSessionId: string, createAnalyticsEvent?: CreateAnalyticsEventFn): void;
export declare function fireHighlightedSearchResult(eventData: KeyboardControlEvent, searchSessionId: string, createAnalyticsEvent?: CreateAnalyticsEventFn): void;
