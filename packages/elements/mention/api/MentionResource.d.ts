import { ServiceConfig } from '@atlaskit/util-service-support';
import { MentionDescription, MentionsResult } from '../types';
export declare type MentionStats = {
    [key: string]: any;
};
export interface ResultCallback<T> {
    (result: T, query?: string, stats?: MentionStats): void;
}
export interface ErrorCallback {
    (error: Error, query?: string): void;
}
export interface InfoCallback {
    (info: string): void;
}
export interface MentionResourceConfig extends ServiceConfig {
    containerId?: string;
    productId?: string;
    shouldHighlightMention?: (mention: MentionDescription) => boolean;
}
export interface ResourceProvider<Result> {
    /**
     * Subscribe to ResourceProvider results
     *
     * @param {string} key subscriber key used to unsubscribe
     * @param {ResultCallback<Result>} callback This callback only receives latest results
     * @param {ErrorCallback} errCallback This callback will errors
     * @param {InfoCallback} infoCallback This callback will info
     * @param {ResultCallback<Result>} allResultsCallback This callback will receive all results
     */
    subscribe(key: string, callback?: ResultCallback<Result>, errCallback?: ErrorCallback, infoCallback?: InfoCallback, allResultsCallback?: ResultCallback<Result>): void;
    /**
     * Unsubscribe to this resource provider results
     * @param {string} key key used when subscribing
     */
    unsubscribe(key: string): void;
}
export declare type MentionContextIdentifier = {
    containerId?: string;
    objectId?: string;
    childObjectId?: string;
    sessionId?: string;
};
export interface MentionProvider extends ResourceProvider<MentionDescription[]> {
    filter(query?: string, contextIdentifier?: MentionContextIdentifier): void;
    recordMentionSelection(mention: MentionDescription, contextIdentifier?: MentionContextIdentifier): void;
    shouldHighlightMention(mention: MentionDescription): boolean;
    isFiltering(query: string): boolean;
}
declare class AbstractResource<Result> implements ResourceProvider<Result> {
    protected changeListeners: Map<string, ResultCallback<Result>>;
    protected errListeners: Map<string, ErrorCallback>;
    protected infoListeners: Map<string, InfoCallback>;
    protected allResultsListeners: Map<string, ResultCallback<Result>>;
    constructor();
    subscribe(key: string, callback?: ResultCallback<Result>, errCallback?: ErrorCallback, infoCallback?: InfoCallback, allResultsCallback?: ResultCallback<Result>): void;
    unsubscribe(key: string): void;
}
declare class AbstractMentionResource extends AbstractResource<MentionDescription[]> implements MentionProvider {
    shouldHighlightMention(_mention: MentionDescription): boolean;
    filter(query?: string): void;
    recordMentionSelection(_mention: MentionDescription): void;
    isFiltering(_query: string): boolean;
    protected _notifyListeners(mentionsResult: MentionsResult, stats?: MentionStats): void;
    protected _notifyAllResultsListeners(mentionsResult: MentionsResult): void;
    protected _notifyErrorListeners(error: Error, query?: string): void;
    protected _notifyInfoListeners(info: string): void;
}
/**
 * Provides a Javascript API
 */
export declare class MentionResource extends AbstractMentionResource {
    private config;
    private lastReturnedSearch;
    private activeSearches;
    constructor(config: MentionResourceConfig);
    shouldHighlightMention(mention: MentionDescription): boolean;
    notify(searchTime: number, mentionResult: MentionsResult, query?: string): void;
    notifyError(error: Error, query?: string): void;
    filter(query?: string, contextIdentifier?: MentionContextIdentifier): void;
    recordMentionSelection(mention: MentionDescription, contextIdentifier?: MentionContextIdentifier): Promise<void>;
    isFiltering(query: string): boolean;
    protected verifyMentionConfig(config: MentionResourceConfig): void;
    private initialState;
    private getQueryParams;
    /**
     * Returns the initial mention display list before a search is performed for the specified
     * container.
     *
     * @param contextIdentifier
     * @returns Promise
     */
    protected remoteInitialState(contextIdentifier?: MentionContextIdentifier): Promise<MentionsResult>;
    private search;
    protected remoteSearch(query: string, contextIdentifier?: MentionContextIdentifier): Promise<MentionsResult>;
    private transformServiceResponse;
    protected recordSelection(mention: MentionDescription, contextIdentifier?: MentionContextIdentifier): Promise<void>;
}
export declare class HttpError implements Error {
    name: string;
    message: string;
    statusCode: number;
    stack?: string;
    constructor(statusCode: number, statusMessage: string);
}
export { AbstractResource, AbstractMentionResource };
export default MentionResource;
