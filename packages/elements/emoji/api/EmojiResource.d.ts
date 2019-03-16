import { AbstractResource, OnProviderChange, Provider, ServiceConfig } from '@atlaskit/util-service-support';
import { CategoryId } from '../components/picker/categories';
import { EmojiDescription, EmojiId, EmojiResponse, EmojiSearchResult, EmojiUpload, OptionalEmojiDescription, OptionalUser, SearchOptions, ToneSelection, User } from '../types';
import EmojiRepository from './EmojiRepository';
import SiteEmojiResource from './media/SiteEmojiResource';
export interface EmojiResourceConfig {
    /**
     * The service configuration for remotely recording emoji selections.
     * A post will be performed to this URL with the EmojiId as the body.
     */
    recordConfig?: ServiceConfig;
    /**
     * This defines the different providers. Later providers will override earlier
     * providers when performing shortName based look up.
     */
    providers: ServiceConfig[];
    /**
     * Must be set to true to enable upload support in the emoji components.
     *
     * Can be used for the restriction of the upload UI based on permissions, or feature flags.
     *
     * Note this also requires that other conditions are met (for example, one of the providers
     * must support upload for the UploadingEmojiResource implementation of UploadingEmojiProvider).
     */
    allowUpload?: boolean;
    /**
     * Logged user in the Product.
     */
    currentUser?: User;
}
export interface OnEmojiProviderChange extends OnProviderChange<EmojiSearchResult, any, void> {
}
export interface Retry<T> {
    (): Promise<T> | T;
}
export interface ResolveReject<T> {
    resolve(result: T): void;
    reject(reason?: any): void;
}
export interface EmojiProvider extends Provider<string, EmojiSearchResult, any, undefined, SearchOptions> {
    /**
     * Returns the first matching emoji matching the shortName, or null if none found.
     *
     * Will load media api images before returning.
     */
    findByShortName(shortName: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    /**
     * Returns the first matching emoji matching the emojiId.id.
     *
     * If not found or emojiId.id is undefined, fallback to a search by shortName.
     *
     * Will load media api images before returning.
     */
    findByEmojiId(emojiId: EmojiId): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    /**
     * Return the emoji that matches the supplied id or undefined. As with findByEmojiId, this call should load
     * the media api images before returning.
     */
    findById(id: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    /**
     * Finds emojis belonging to specified category.
     *
     * Does not automatically load Media API images.
     */
    findInCategory(categoryId: string): Promise<EmojiDescription[]>;
    /**
     * Returns a map matching ascii representations to their corresponding EmojiDescription.
     */
    getAsciiMap(): Promise<Map<string, EmojiDescription>>;
    /**
     * Returns, in a Promise, an array of the most frequently used emoji, ordered from most frequent to least frequent.
     * If there is no frequently used data then an empty array should be returned.
     *
     * @param options supply options to be applied to the request.
     */
    getFrequentlyUsed(options?: SearchOptions): Promise<EmojiDescription[]>;
    /**
     * Records an emoji selection, for example for using in tracking recent emoji.
     * If no recordConfig is configured then a resolved promise should be returned
     *
     * Optional.
     */
    recordSelection?(emoji: EmojiDescription): Promise<any>;
    /**
     * Deletes the given emoji from the site emoji service
     * No changes are made if it is not a media emoji, no siteEmojiResource has been initialised
     * or the user is not authorised.
     * It should also be removed from the EmojiResource so it cannot be returned via search
     *
     * Optional.
     *
     * @return a boolean indicating whether the delete was successful
     */
    deleteSiteEmoji(emoji: EmojiDescription): Promise<boolean>;
    /**
     * Load media emoji that may require authentication to download, producing
     * a new EmojiDescription to be used for rendering, if necessary.
     *
     * Future results may be returned from a cache.
     *
     * Acts as a no-op if not a media emoji.
     *
     * Downloads and caches the altRepresentation image if useAlt is passed in
     *
     * @return an OptionalEmojiDescription or a promise for one, may be the same as the input,
     *   or updated with a new url to cached image data. Will return the original EmojiDescription
     *   if not a custom emoji.
     */
    loadMediaEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    /**
     * Indicates if media emoji should be rendered optimistically,
     * i.e. assume the url can be rendered directly from the URL, and
     * only explicitly loaded via loadEmojiImageData if it fails to load.
     *
     * If useAlt is provided, the altRepresentation image URL is used
     */
    optimisticMediaRendering(emoji: EmojiDescription, useAlt?: boolean): boolean;
    /**
     * Used by the picker and typeahead to obtain a skin tone preference
     * if the user has previously selected one via the Tone Selector
     */
    getSelectedTone(): ToneSelection;
    /**
     * Used by Tone Selector to indicate to the provider that the user
     * has selected a skin tone preference that should be remembered
     */
    setSelectedTone(tone: ToneSelection): void;
    /**
     * Returns a list of all the non-standard categories with emojis in the EmojiRepository
     * e.g. 'FREQUENT', 'ATLASSIAN' and 'CUSTOM'
     */
    calculateDynamicCategories?(): Promise<string[]>;
    /**
     * Returns the logged user passed by the Product
     */
    getCurrentUser(): OptionalUser;
}
export interface UploadingEmojiProvider extends EmojiProvider {
    /**
     * Returns true if upload is supported.
     *
     * Waits until resources have loaded before returning.
     */
    isUploadSupported(): Promise<boolean>;
    /**
     * Uploads an emoji to the configured repository.
     *
     * Will return a promise with the EmojiDescription once completed.
     *
     * The last search will be re-run to ensure the new emoji is considered in the search.
     */
    uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription>;
    /**
     * Allows the preloading of data (e.g. authentication tokens) to speed the uploading of emoji.
     */
    prepareForUpload(): Promise<void>;
}
/**
 * Checks if the emojiProvider can support uploading at a feature level.
 *
 * Follow this up with an isUploadSupported() check to see if the provider is actually
 * configured to support uploads.
 */
export declare const supportsUploadFeature: (emojiProvider: EmojiProvider) => emojiProvider is UploadingEmojiProvider;
export interface LastQuery {
    query?: string;
    options?: SearchOptions;
}
export declare class EmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
    protected recordConfig?: ServiceConfig;
    protected emojiRepository?: EmojiRepository;
    protected lastQuery?: LastQuery;
    protected activeLoaders: number;
    protected retries: Map<Retry<any>, ResolveReject<any>>;
    protected siteEmojiResource?: SiteEmojiResource;
    protected selectedTone: ToneSelection;
    protected currentUser?: User;
    constructor(config: EmojiResourceConfig);
    protected initEmojiRepository(emojiResponses: EmojiResponse[]): void;
    protected initSiteEmojiResource(emojiResponse: EmojiResponse, provider: ServiceConfig): Promise<void>;
    private performRetries;
    private loadStoredTone;
    protected refreshLastFilter(): void;
    protected isLoaded: () => false | EmojiRepository | undefined;
    protected retryIfLoading<T>(retry: Retry<T>, defaultResponse: T): Promise<T>;
    protected notifyResult(result: EmojiSearchResult): void;
    loadMediaEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticMediaRendering(emoji: EmojiDescription, useAlt?: boolean): boolean;
    filter(query?: string, options?: SearchOptions): void;
    findByShortName(shortName: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    findByEmojiId(emojiId: EmojiId): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    findById(id: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    findInCategory(categoryId: CategoryId): Promise<EmojiDescription[]>;
    getAsciiMap(): Promise<Map<string, EmojiDescription>>;
    getFrequentlyUsed(options?: SearchOptions): Promise<EmojiDescription[]>;
    /**
     * Record the selection of an emoji to a remote service if 'recordConfig' has been supplied.
     * Regardless of the recordConfig, emoji selections will always be recorded on the EmojiRepository
     * for the purposes of tracking the frequency of use.
     *
     * @param emoji The full description of the emoji to record usage for.
     */
    recordSelection(emoji: EmojiDescription): Promise<any>;
    deleteSiteEmoji(emoji: EmojiDescription): Promise<boolean>;
    getSelectedTone(): ToneSelection;
    setSelectedTone(tone: ToneSelection): void;
    calculateDynamicCategories(): Promise<CategoryId[]>;
    getCurrentUser(): OptionalUser;
    protected addUnknownEmoji(emoji: EmojiDescription): void;
}
export default class UploadingEmojiResource extends EmojiResource implements UploadingEmojiProvider {
    protected allowUpload: boolean;
    constructor(config: EmojiResourceConfig);
    isUploadSupported(): Promise<boolean>;
    uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription>;
    prepareForUpload(): Promise<void>;
}
