import { EmojiDescription, OptionalEmojiDescription } from '../../types';
import MediaImageLoader from './MediaImageLoader';
import TokenManager from './TokenManager';
export interface EmojiCacheStrategy {
    loadEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticRendering(): boolean;
}
/**
 * For browsers that support caching for resources
 * regardless of originally supplied headers (basically everything but Firefox).
 */
export declare class BrowserCacheStrategy implements EmojiCacheStrategy {
    private cachedImageUrls;
    private mediaImageLoader;
    constructor(mediaImageLoader: MediaImageLoader);
    loadEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticRendering(): boolean;
    static supported(mediaPath: string, mediaImageLoader: MediaImageLoader): Promise<boolean>;
}
/**
 * For browsers that do no cache images without equivalent headers (e.g. Firefox).
 *
 * Images are cached in memory in a LRU cache. Images considered too large,
 * are not cached, but retrieved each time.
 *
 * Images are still cached by the browser, but loading in asynchronous with
 * small delay noticable to the end user.
 */
export declare class MemoryCacheStrategy implements EmojiCacheStrategy {
    private dataURLCache;
    private mediaImageLoader;
    constructor(mediaImageLoader: MediaImageLoader);
    loadEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticRendering(): boolean;
}
/**
 * Provides a cache for Media Emoji.
 *
 * Emoji are returned immediately if cached and ready to use by the browser.
 *
 * Otherwise, they are loaded and returned via a promise.
 */
export default class MediaEmojiCache {
    protected cache?: EmojiCacheStrategy;
    protected waitingInitUrls: string[];
    private cacheLoading;
    private mediaImageLoader;
    constructor(tokenManager: TokenManager);
    loadEmoji(emoji: EmojiDescription, useAlt?: boolean): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;
    optimisticRendering(url: string): boolean | Promise<boolean>;
    protected getCache(url: string): EmojiCacheStrategy | Promise<EmojiCacheStrategy>;
    private initCache;
}
