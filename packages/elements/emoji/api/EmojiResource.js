import * as tslib_1 from "tslib";
import { AbstractResource, utils as serviceUtils, } from '@findable/util-service-support';
import { selectedToneStorageKey } from '../constants';
import { isMediaEmoji, isPromise, toEmojiId } from '../type-helpers';
import debug from '../util/logger';
import EmojiLoader from './EmojiLoader';
import EmojiRepository from './EmojiRepository';
import SiteEmojiResource from './media/SiteEmojiResource';
/**
 * Checks if the emojiProvider can support uploading at a feature level.
 *
 * Follow this up with an isUploadSupported() check to see if the provider is actually
 * configured to support uploads.
 */
export var supportsUploadFeature = function (emojiProvider) {
    var _a = emojiProvider, isUploadSupported = _a.isUploadSupported, prepareForUpload = _a.prepareForUpload, uploadCustomEmoji = _a.uploadCustomEmoji;
    return !!(isUploadSupported && prepareForUpload && uploadCustomEmoji);
};
var EmojiResource = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiResource, _super);
    function EmojiResource(config) {
        var _this = _super.call(this) || this;
        _this.activeLoaders = 0;
        _this.retries = new Map();
        _this.isLoaded = function () { return _this.activeLoaders === 0 && _this.emojiRepository; };
        _this.recordConfig = config.recordConfig;
        _this.currentUser = config.currentUser;
        // Ensure order is retained by tracking until all done.
        var emojiResponses = [];
        _this.activeLoaders = config.providers.length;
        config.providers.forEach(function (provider, index) {
            var loader = new EmojiLoader(provider);
            var emojis = loader.loadEmoji();
            emojis
                .then(function (emojiResponse) {
                emojiResponses[index] = emojiResponse;
                _this.initEmojiRepository(emojiResponses);
                _this.initSiteEmojiResource(emojiResponse, provider).then(function () {
                    _this.activeLoaders--;
                    _this.performRetries();
                    _this.refreshLastFilter();
                });
            })
                .catch(function (reason) {
                _this.activeLoaders--;
                _this.notifyError(reason);
            });
        });
        if (typeof window !== 'undefined' && window.localStorage) {
            _this.selectedTone = _this.loadStoredTone();
        }
        if (config.providers.length === 0) {
            throw new Error('No providers specified');
        }
        return _this;
    }
    EmojiResource.prototype.initEmojiRepository = function (emojiResponses) {
        var emojis = [];
        emojiResponses.forEach(function (emojiResponse) {
            emojis = emojis.concat(emojiResponse.emojis);
        });
        this.emojiRepository = new EmojiRepository(emojis);
    };
    EmojiResource.prototype.initSiteEmojiResource = function (emojiResponse, provider) {
        if (!this.siteEmojiResource && emojiResponse.mediaApiToken) {
            this.siteEmojiResource = new SiteEmojiResource(provider, emojiResponse.mediaApiToken);
            // Prime cache type + optimistic rendering by checking first Emoji.
            // If this is fails, it won't be primed until a good emoji is loaded later.
            var emojis = emojiResponse.emojis;
            if (emojis.length) {
                var done = this.siteEmojiResource.optimisticRendering(emojis[0]);
                if (isPromise(done)) {
                    return done
                        .then(function () {
                        debug('Primed siteEmojiResource');
                    })
                        .catch(function () {
                        debug('Failed to prime siteEmojiResource');
                    });
                }
                else {
                    debug('Already primed siteEmojiResource');
                }
            }
            else {
                debug('No emoji to prime siteEmojiResource with');
            }
        }
        return Promise.resolve();
    };
    EmojiResource.prototype.performRetries = function () {
        var currentRetries = this.retries;
        this.retries = new Map();
        currentRetries.forEach(function (resolveReject, retry) {
            var result = retry();
            if (isPromise(result)) {
                result
                    .then(function (response) {
                    resolveReject.resolve(response);
                })
                    .catch(function (reason) {
                    resolveReject.reject(reason);
                });
            }
            else {
                resolveReject.resolve(result);
            }
        });
    };
    EmojiResource.prototype.loadStoredTone = function () {
        var storedToneString = window.localStorage.getItem(selectedToneStorageKey);
        if (storedToneString) {
            var storedTone = parseInt(storedToneString, 10);
            return !isNaN(storedTone) ? storedTone : undefined;
        }
        return undefined;
    };
    EmojiResource.prototype.refreshLastFilter = function () {
        if (typeof this.lastQuery !== 'undefined') {
            var _a = this.lastQuery, query = _a.query, options = _a.options;
            this.filter(query, options);
        }
    };
    EmojiResource.prototype.retryIfLoading = function (retry, defaultResponse) {
        var _this = this;
        if (!this.isLoaded()) {
            return new Promise(function (resolve, reject) {
                _this.retries.set(retry, { resolve: resolve, reject: reject });
            });
        }
        return Promise.resolve(defaultResponse);
    };
    EmojiResource.prototype.notifyResult = function (result) {
        if (this.lastQuery && result.query === this.lastQuery.query) {
            _super.prototype.notifyResult.call(this, result);
        }
    };
    EmojiResource.prototype.loadMediaEmoji = function (emoji, useAlt) {
        if (!this.siteEmojiResource || !isMediaEmoji(emoji)) {
            return emoji;
        }
        return this.siteEmojiResource.loadMediaEmoji(emoji, useAlt);
    };
    EmojiResource.prototype.optimisticMediaRendering = function (emoji, useAlt) {
        if (!isMediaEmoji(emoji)) {
            return true;
        }
        if (!this.siteEmojiResource) {
            // Shouldn't have a media emoji without a siteEmojiResouce, but anyway ;)
            return false;
        }
        var optimistic = this.siteEmojiResource.optimisticRendering(emoji, useAlt);
        if (isPromise(optimistic)) {
            // Not sure yet, so lets say no for now (this should normally be primed in most/all cases)
            return false;
        }
        return optimistic;
    };
    EmojiResource.prototype.filter = function (query, options) {
        this.lastQuery = {
            query: query,
            options: options,
        };
        if (this.emojiRepository) {
            this.notifyResult(this.emojiRepository.search(query, options));
        }
        else {
            // not ready
            this.notifyNotReady();
        }
    };
    EmojiResource.prototype.findByShortName = function (shortName) {
        var _this = this;
        if (this.isLoaded()) {
            // Wait for all emoji to load before looking by shortName (to ensure correct priority)
            return this.emojiRepository.findByShortName(shortName);
        }
        return this.retryIfLoading(function () { return _this.findByShortName(shortName); }, undefined);
    };
    EmojiResource.prototype.findByEmojiId = function (emojiId) {
        var _this = this;
        var id = emojiId.id, shortName = emojiId.shortName;
        if (this.emojiRepository) {
            if (id) {
                var emoji = this.emojiRepository.findById(id);
                if (emoji) {
                    return emoji;
                }
                if (this.isLoaded()) {
                    // all loaded but not found by id, try server to see if
                    // this is a newly uploaded emoji
                    if (this.siteEmojiResource) {
                        return this.siteEmojiResource.findEmoji(emojiId).then(function (emoji) {
                            if (!emoji) {
                                // if not, fallback to searching by shortName to
                                // at least render an alternative
                                return _this.findByShortName(shortName);
                            }
                            _this.addUnknownEmoji(emoji);
                            return emoji;
                        });
                    }
                    // if not, fallback to searching by shortName to
                    // at least render an alternative
                    return this.findByShortName(shortName);
                }
            }
            else {
                // no id fallback to shortName
                return this.findByShortName(shortName);
            }
        }
        return this.retryIfLoading(function () { return _this.findByEmojiId(emojiId); }, undefined);
    };
    EmojiResource.prototype.findById = function (id) {
        var _this = this;
        if (this.isLoaded()) {
            return this.emojiRepository.findById(id);
        }
        return this.retryIfLoading(function () { return _this.findById(id); }, undefined);
    };
    EmojiResource.prototype.findInCategory = function (categoryId) {
        var _this = this;
        if (this.isLoaded()) {
            return Promise.resolve(this.emojiRepository.findInCategory(categoryId));
        }
        return this.retryIfLoading(function () { return _this.findInCategory(categoryId); }, []);
    };
    EmojiResource.prototype.getAsciiMap = function () {
        var _this = this;
        if (this.isLoaded()) {
            return Promise.resolve(this.emojiRepository.getAsciiMap());
        }
        return this.retryIfLoading(function () { return _this.getAsciiMap(); }, new Map());
    };
    EmojiResource.prototype.getFrequentlyUsed = function (options) {
        var _this = this;
        if (this.isLoaded()) {
            return Promise.resolve(this.emojiRepository.getFrequentlyUsed(options));
        }
        return this.retryIfLoading(function () { return _this.getFrequentlyUsed(options); }, []);
    };
    /**
     * Record the selection of an emoji to a remote service if 'recordConfig' has been supplied.
     * Regardless of the recordConfig, emoji selections will always be recorded on the EmojiRepository
     * for the purposes of tracking the frequency of use.
     *
     * @param emoji The full description of the emoji to record usage for.
     */
    EmojiResource.prototype.recordSelection = function (emoji) {
        var recordConfig = this.recordConfig;
        if (this.emojiRepository) {
            this.emojiRepository.used(emoji);
        }
        if (recordConfig) {
            var queryParams = {
                emojiId: toEmojiId(emoji),
            };
            var requestInit = {
                method: 'POST',
            };
            return serviceUtils.requestService(recordConfig, {
                queryParams: queryParams,
                requestInit: requestInit,
            });
        }
        return Promise.resolve();
    };
    EmojiResource.prototype.deleteSiteEmoji = function (emoji) {
        var _this = this;
        if (this.siteEmojiResource && emoji.id) {
            return this.siteEmojiResource
                .deleteEmoji(emoji)
                .then(function (success) {
                if (success && _this.emojiRepository) {
                    _this.emojiRepository.delete(emoji);
                    return true;
                }
                return false;
            })
                .catch(function (err) {
                // tslint:disable-next-line:no-console
                console.error('failed to delete site emoji', err);
                return false;
            });
        }
        return this.retryIfLoading(function () { return _this.deleteSiteEmoji(emoji); }, false);
    };
    EmojiResource.prototype.getSelectedTone = function () {
        return this.selectedTone;
    };
    EmojiResource.prototype.setSelectedTone = function (tone) {
        this.selectedTone = tone;
        if (window.localStorage) {
            try {
                window.localStorage.setItem(selectedToneStorageKey, tone ? tone.toString() : '');
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error('failed to store selected emoji skin tone', e);
            }
        }
    };
    EmojiResource.prototype.calculateDynamicCategories = function () {
        var _this = this;
        if (this.isLoaded()) {
            return Promise.resolve(this.emojiRepository.getDynamicCategoryList());
        }
        return this.retryIfLoading(function () { return _this.calculateDynamicCategories(); }, []);
    };
    EmojiResource.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    EmojiResource.prototype.addUnknownEmoji = function (emoji) {
        if (this.emojiRepository) {
            this.emojiRepository.addUnknownEmoji(emoji);
        }
    };
    return EmojiResource;
}(AbstractResource));
export { EmojiResource };
var UploadingEmojiResource = /** @class */ (function (_super) {
    tslib_1.__extends(UploadingEmojiResource, _super);
    function UploadingEmojiResource(config) {
        var _this = _super.call(this, config) || this;
        _this.allowUpload = !!config.allowUpload;
        return _this;
    }
    UploadingEmojiResource.prototype.isUploadSupported = function () {
        var _this = this;
        if (!this.allowUpload) {
            return Promise.resolve(false);
        }
        if (this.siteEmojiResource) {
            return this.siteEmojiResource.hasUploadToken();
        }
        return this.retryIfLoading(function () { return _this.isUploadSupported(); }, false);
    };
    UploadingEmojiResource.prototype.uploadCustomEmoji = function (upload) {
        var _this = this;
        return this.isUploadSupported().then(function (supported) {
            if (!supported || !_this.siteEmojiResource) {
                return Promise.reject('No media api support is configured');
            }
            return _this.siteEmojiResource.uploadEmoji(upload).then(function (emoji) {
                _this.addUnknownEmoji(emoji);
                _this.refreshLastFilter();
                return emoji;
            });
        });
    };
    UploadingEmojiResource.prototype.prepareForUpload = function () {
        var _this = this;
        if (this.siteEmojiResource) {
            this.siteEmojiResource.prepareForUpload();
        }
        return this.retryIfLoading(function () { return _this.prepareForUpload(); }, undefined);
    };
    return UploadingEmojiResource;
}(EmojiResource));
export default UploadingEmojiResource;
//# sourceMappingURL=EmojiResource.js.map