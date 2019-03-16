import { convertMediaToImageEmoji, isMediaRepresentation, isPromise, } from '../../type-helpers';
import MediaImageLoader from './MediaImageLoader';
import debug from '../../util/logger';
import { LRUCache } from 'lru-fast';
var getRequiredRepresentation = function (emoji, useAlt) {
    return useAlt ? emoji.altRepresentation : emoji.representation;
};
var isUnsupportedBrowser = function () {
    var isIE = /*@cc_on!@*/ false || !!document.documentMode; // Internet Explorer 6-11
    var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
    return isIE || isEdge;
};
/**
 * For browsers that support caching for resources
 * regardless of originally supplied headers (basically everything but Firefox).
 */
var BrowserCacheStrategy = /** @class */ (function () {
    function BrowserCacheStrategy(mediaImageLoader) {
        this.cachedImageUrls = new Set();
        debug('BrowserCacheStrategy');
        this.mediaImageLoader = mediaImageLoader;
    }
    BrowserCacheStrategy.prototype.loadEmoji = function (emoji, useAlt) {
        var _this = this;
        var representation = getRequiredRepresentation(emoji, useAlt);
        if (!isMediaRepresentation(representation)) {
            return emoji;
        }
        var mediaPath = representation.mediaPath;
        if (this.cachedImageUrls.has(mediaPath)) {
            // Already cached
            return emoji;
        }
        return this.mediaImageLoader
            .loadMediaImage(mediaPath)
            .then(function () {
            // Media is loaded, can use original URL now, so just return original emoji
            _this.cachedImageUrls.add(mediaPath);
            return emoji;
        })
            .catch(function () {
            return undefined;
        });
    };
    BrowserCacheStrategy.prototype.optimisticRendering = function () {
        return true;
    };
    BrowserCacheStrategy.supported = function (mediaPath, mediaImageLoader) {
        // IE/Edge uses memory cache strategy else images can fail to load
        // from a clean cache/if they are downloaded from the service
        // TODO: fix as a part of FS-1592
        if (isUnsupportedBrowser()) {
            return Promise.resolve(false);
        }
        return mediaImageLoader
            .loadMediaImage(mediaPath)
            .then(function () {
            // Image should be cached in browser, if supported it should be accessible from the cache by an <img/>
            // Try to load without via image to confirm this support (this fails in Firefox)
            return new Promise(function (resolve) {
                var img = new Image();
                img.addEventListener('load', function () {
                    resolve(true);
                });
                img.addEventListener('error', function () {
                    resolve(false);
                });
                img.src = mediaPath;
            });
        })
            .catch(function () { return false; });
    };
    return BrowserCacheStrategy;
}());
export { BrowserCacheStrategy };
var maxImageCached = 1000;
// Don't cache images large than this - dataUrl size in characters
var maxImageSize = 10000;
/**
 * For browsers that do no cache images without equivalent headers (e.g. Firefox).
 *
 * Images are cached in memory in a LRU cache. Images considered too large,
 * are not cached, but retrieved each time.
 *
 * Images are still cached by the browser, but loading in asynchronous with
 * small delay noticable to the end user.
 */
var MemoryCacheStrategy = /** @class */ (function () {
    function MemoryCacheStrategy(mediaImageLoader) {
        debug('MemoryCacheStrategy');
        this.mediaImageLoader = mediaImageLoader;
        this.dataURLCache = new LRUCache(maxImageCached);
    }
    MemoryCacheStrategy.prototype.loadEmoji = function (emoji, useAlt) {
        var _this = this;
        var representation = getRequiredRepresentation(emoji, useAlt);
        if (!isMediaRepresentation(representation)) {
            return emoji;
        }
        var mediaPath = representation.mediaPath;
        var dataURL = this.dataURLCache.get(mediaPath);
        if (dataURL) {
            // Already cached
            return convertMediaToImageEmoji(emoji, dataURL, useAlt);
        }
        // Not cached, load
        return this.mediaImageLoader
            .loadMediaImage(mediaPath)
            .then(function (dataURL) {
            var loadedEmoji = convertMediaToImageEmoji(emoji, dataURL, useAlt);
            if (dataURL.length <= maxImageSize) {
                // Only cache if not large than max size
                _this.dataURLCache.put(mediaPath, dataURL);
            }
            else {
                debug('No caching as image is too large', dataURL.length, dataURL.slice(0, 15), emoji.shortName);
            }
            return loadedEmoji;
        })
            .catch(function () {
            return undefined;
        });
    };
    MemoryCacheStrategy.prototype.optimisticRendering = function () {
        return false;
    };
    return MemoryCacheStrategy;
}());
export { MemoryCacheStrategy };
/**
 * Provides a cache for Media Emoji.
 *
 * Emoji are returned immediately if cached and ready to use by the browser.
 *
 * Otherwise, they are loaded and returned via a promise.
 */
var MediaEmojiCache = /** @class */ (function () {
    function MediaEmojiCache(tokenManager) {
        this.waitingInitUrls = [];
        debug('MediaEmojiCache');
        this.mediaImageLoader = new MediaImageLoader(tokenManager);
    }
    MediaEmojiCache.prototype.loadEmoji = function (emoji, useAlt) {
        var representation = getRequiredRepresentation(emoji, useAlt);
        if (!isMediaRepresentation(representation)) {
            return emoji;
        }
        var mediaPath = representation.mediaPath;
        var emojiCache = this.getCache(mediaPath);
        if (isPromise(emojiCache)) {
            // Promise based
            return emojiCache
                .then(function (cache) { return cache.loadEmoji(emoji, useAlt); })
                .catch(function () { return undefined; });
        }
        return emojiCache.loadEmoji(emoji, useAlt);
    };
    MediaEmojiCache.prototype.optimisticRendering = function (url) {
        var emojiCache = this.getCache(url);
        if (isPromise(emojiCache)) {
            // Promise based
            return emojiCache
                .then(function (cache) { return cache.optimisticRendering(); })
                .catch(function () { return false; });
        }
        return emojiCache.optimisticRendering();
    };
    MediaEmojiCache.prototype.getCache = function (url) {
        var _this = this;
        if (this.cache) {
            return this.cache;
        }
        this.waitingInitUrls.push(url);
        if (!this.cacheLoading) {
            this.cacheLoading = this.initCache()
                .then(function (cache) {
                _this.cache = cache;
                _this.cacheLoading = undefined;
                return cache;
            })
                .catch(function (err) {
                _this.cacheLoading = undefined;
                throw err;
            });
        }
        return this.cacheLoading;
    };
    MediaEmojiCache.prototype.initCache = function () {
        var _this = this;
        var url = this.waitingInitUrls.pop();
        if (!url) {
            return Promise.reject('Unable to initialise cache based on provided url(s)');
        }
        return BrowserCacheStrategy.supported(url, this.mediaImageLoader)
            .then(function (supported) {
            _this.waitingInitUrls = []; // clear
            _this.cacheLoading = undefined;
            if (supported) {
                return new BrowserCacheStrategy(_this.mediaImageLoader);
            }
            return new MemoryCacheStrategy(_this.mediaImageLoader);
        })
            .catch(function () {
            return _this.initCache();
        });
    };
    return MediaEmojiCache;
}());
export default MediaEmojiCache;
//# sourceMappingURL=MediaEmojiCache.js.map