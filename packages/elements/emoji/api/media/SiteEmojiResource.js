import * as tslib_1 from "tslib";
import { utils as serviceUtils, } from '@atlaskit/util-service-support';
import { buildEmojiDescriptionWithAltRepresentation, isMediaRepresentation, isMediaEmoji, convertImageToMediaRepresentation, isLoadedMediaEmoji, } from '../../type-helpers';
import MediaEmojiCache from './MediaEmojiCache';
import { denormaliseEmojiServiceResponse, emojiRequest, getAltRepresentation, } from '../EmojiUtils';
import TokenManager from './TokenManager';
import debug from '../../util/logger';
import { ContextFactory } from '@atlaskit/media-core';
// Assume media is 95% of total upload time.
export var mediaProportionOfProgress = 95 / 100;
var SiteEmojiResource = /** @class */ (function () {
    function SiteEmojiResource(siteServiceConfig, mediaApiToken) {
        var _this = this;
        this.postToEmojiService = function (upload, fileId) {
            var shortName = upload.shortName, name = upload.name;
            var width = upload.width, height = upload.height;
            var requestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shortName: shortName,
                    name: name,
                    width: width,
                    height: height,
                    fileId: fileId,
                }),
            };
            return serviceUtils
                .requestService(_this.siteServiceConfig, {
                requestInit: requestInit,
            })
                .then(function (response) {
                var emojis = response.emojis;
                if (emojis.length) {
                    var _a = emojis[0], altRepresentations = _a.altRepresentations, emoji = tslib_1.__rest(_a, ["altRepresentations"]);
                    var response_1 = tslib_1.__assign({}, emoji, { representation: convertImageToMediaRepresentation(emoji.representation) });
                    var altRepresentation = getAltRepresentation(altRepresentations || {});
                    var imgAltRepresentation = altRepresentation
                        ? convertImageToMediaRepresentation(altRepresentation)
                        : undefined;
                    return buildEmojiDescriptionWithAltRepresentation(response_1, imgAltRepresentation);
                }
                throw new Error('No emoji returns from upload. Upload failed.');
            });
        };
        this.siteServiceConfig = siteServiceConfig;
        this.mediaApiToken = mediaApiToken;
        this.tokenManager = new TokenManager(siteServiceConfig);
        this.tokenManager.addToken('read', mediaApiToken);
        this.mediaEmojiCache = new MediaEmojiCache(this.tokenManager);
    }
    /**
     * Will load media emoji, returning a new EmojiDescription if, for example,
     * the URL has changed.
     */
    SiteEmojiResource.prototype.loadMediaEmoji = function (emoji, useAlt) {
        if (!isMediaEmoji(emoji)) {
            throw new Error('Only supported for media emoji');
        }
        return this.mediaEmojiCache.loadEmoji(emoji, useAlt);
    };
    SiteEmojiResource.prototype.optimisticRendering = function (emoji, useAlt) {
        var representation = useAlt
            ? emoji.altRepresentation
            : emoji.representation;
        if (!isMediaRepresentation(representation)) {
            throw new Error('Only supported for media emoji');
        }
        var mediaPath = representation.mediaPath;
        return this.mediaEmojiCache.optimisticRendering(mediaPath);
    };
    SiteEmojiResource.prototype.uploadEmoji = function (upload, progressCallback) {
        var _this = this;
        var startTime = Date.now();
        return this.tokenManager.getToken('upload').then(function (uploadToken) {
            var tokenLoadTime = Date.now() - startTime;
            debug('upload token load time', tokenLoadTime);
            return new Promise(function (resolve, reject) {
                var url = uploadToken.url, clientId = uploadToken.clientId, collectionName = uploadToken.collectionName;
                var context = ContextFactory.create({
                    authProvider: function () {
                        return Promise.resolve({
                            clientId: clientId,
                            token: uploadToken.jwt,
                            baseUrl: url,
                        });
                    },
                });
                var subscription = context.file
                    .upload({
                    content: upload.dataURL,
                    name: upload.filename,
                    collection: collectionName,
                })
                    .subscribe({
                    next: function (state) {
                        if (state.status === 'uploading' && progressCallback) {
                            progressCallback({
                                percent: state.progress * mediaProportionOfProgress,
                            });
                        }
                        else if (state.status === 'processing') {
                            subscription.unsubscribe();
                            var totalUploadTime = Date.now() - startTime;
                            var mediaUploadTime = totalUploadTime - tokenLoadTime;
                            debug('total upload / media upload times', totalUploadTime, mediaUploadTime);
                            _this.postToEmojiService(upload, state.id)
                                .then(function (emoji) {
                                resolve(emoji);
                            })
                                .catch(function (httpError) {
                                reject(httpError.reason || httpError);
                            });
                        }
                    },
                    error: function (error) {
                        reject(error);
                    },
                });
            });
        });
    };
    /**
     * Check if the MediaEmojiResource has been able to initialise an uploadToken. Retrieving an upload token
     * is asynchronous so the Promise will need to resolve before the state is known. If the token retrieval
     * completes with failure then the Promise will resolve to false.
     */
    SiteEmojiResource.prototype.hasUploadToken = function () {
        var tokenPromise = this.tokenManager.getToken('upload');
        return tokenPromise.then(function (token) {
            return token !== undefined;
        }, function () {
            return false;
        });
    };
    SiteEmojiResource.prototype.prepareForUpload = function () {
        // make sure a token is loaded from the emoji service if we don't have one
        // as future request to uploadEmoji will use this, this to preload it, as it
        // usually takes 1-2 seconds to generate
        this.tokenManager.getToken('upload');
    };
    SiteEmojiResource.prototype.findEmoji = function (emojiId) {
        var path = "../" + emojiId.id;
        return emojiRequest(this.siteServiceConfig, { path: path })
            .then(function (serviceResponse) {
            var response = denormaliseEmojiServiceResponse(serviceResponse);
            return response.emojis[0];
        })
            .catch(function (error) {
            debug('failed to load emoji', emojiId, error);
            return undefined;
        });
    };
    /**
     * Calls to site-scoped EmojiResource to delete emoji
     * @param emoji media emoji to delete
     * @returns Promise.resolve() if success and Promise.reject() for failure
     */
    SiteEmojiResource.prototype.deleteEmoji = function (emoji) {
        if (!isMediaEmoji(emoji) && !isLoadedMediaEmoji(emoji)) {
            return Promise.reject(false);
        }
        var path = "" + emoji.id;
        var requestInit = {
            method: 'DELETE',
        };
        return (serviceUtils
            .requestService(this.siteServiceConfig, { path: path, requestInit: requestInit })
            // Successful delete on Promise.resolve
            .then(function () { return true; })
            // Unsuccessful delete on Promise.reject
            .catch(function () { return false; }));
    };
    return SiteEmojiResource;
}());
export default SiteEmojiResource;
//# sourceMappingURL=SiteEmojiResource.js.map