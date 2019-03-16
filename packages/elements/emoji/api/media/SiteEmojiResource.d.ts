import { ServiceConfig } from '@atlaskit/util-service-support';
import { EmojiDescription, EmojiId, EmojiServiceDescription, EmojiUpload, MediaApiToken, OptionalEmojiDescription } from '../../types';
import TokenManager from './TokenManager';
export interface EmojiUploadResponse {
    emojis: EmojiServiceDescription[];
}
export interface EmojiProgress {
    readonly percent: number;
}
export interface EmojiProgessCallback {
    (progress: EmojiProgress): void;
}
export declare const mediaProportionOfProgress: number;
export default class SiteEmojiResource {
    private siteServiceConfig;
    private mediaApiToken;
    private mediaEmojiCache;
    protected tokenManager: TokenManager;
    constructor(siteServiceConfig: ServiceConfig, mediaApiToken: MediaApiToken);
    /**
     * Will load media emoji, returning a new EmojiDescription if, for example,
     * the URL has changed.
     */
    loadMediaEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticRendering(emoji: EmojiDescription, useAlt?: boolean): boolean | Promise<boolean>;
    uploadEmoji(upload: EmojiUpload, progressCallback?: EmojiProgessCallback): Promise<EmojiDescription>;
    /**
     * Check if the MediaEmojiResource has been able to initialise an uploadToken. Retrieving an upload token
     * is asynchronous so the Promise will need to resolve before the state is known. If the token retrieval
     * completes with failure then the Promise will resolve to false.
     */
    hasUploadToken(): Promise<boolean>;
    prepareForUpload(): void;
    findEmoji(emojiId: EmojiId): Promise<OptionalEmojiDescription>;
    /**
     * Calls to site-scoped EmojiResource to delete emoji
     * @param emoji media emoji to delete
     * @returns Promise.resolve() if success and Promise.reject() for failure
     */
    deleteEmoji(emoji: EmojiDescription): Promise<boolean>;
    private postToEmojiService;
}
