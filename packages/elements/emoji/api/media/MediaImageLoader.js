import { imageAcceptHeader } from '../../util/image';
var defaultConcurrentDownloadLimit = 16;
var MediaImageLoader = /** @class */ (function () {
    function MediaImageLoader(tokenManager, options) {
        this.mediaImageQueue = [];
        this.activeProcessing = 0;
        this.pendingRequests = new Map();
        this.concurrentDownloadLimit =
            (options && options.concurrentDownloadLimit) ||
                defaultConcurrentDownloadLimit;
        this.tokenManager = tokenManager;
    }
    MediaImageLoader.prototype.loadMediaImage = function (url) {
        var _this = this;
        var maybePending = this.pendingRequests.get(url);
        if (maybePending !== undefined) {
            return maybePending;
        }
        var pending = new Promise(function (resolve, reject) {
            _this.mediaImageQueue.push({
                url: url,
                resolve: resolve,
                reject: reject,
            });
            _this.processFromQueue();
        })
            .then(function (result) {
            _this.pendingRequests.delete(url);
            return result;
        })
            .catch(function (error) {
            _this.pendingRequests.delete(url);
            throw error;
        });
        this.pendingRequests.set(url, pending);
        return pending;
    };
    MediaImageLoader.prototype.getQueueSize = function () {
        return this.mediaImageQueue.length;
    };
    MediaImageLoader.prototype.getActiveDownloads = function () {
        return this.activeProcessing;
    };
    MediaImageLoader.prototype.processFromQueue = function () {
        var _this = this;
        var _loop_1 = function () {
            this_1.activeProcessing++;
            var item = this_1.mediaImageQueue.shift();
            var url = item.url, resolve = item.resolve, reject = item.reject;
            this_1.tokenManager
                .getToken('read', false)
                .then(function (token) {
                _this.requestMediaEmoji(url, token, true)
                    .then(function (dataURL) {
                    resolve(dataURL);
                    _this.completedItem();
                })
                    .catch(function (error) {
                    reject(error);
                    _this.completedItem();
                });
            })
                .catch(function (error) {
                // Failed to load, just resolve to original emoji
                reject(error);
                _this.completedItem();
            });
        };
        var this_1 = this;
        while (this.activeProcessing < this.concurrentDownloadLimit &&
            this.mediaImageQueue.length > 0) {
            _loop_1();
        }
    };
    MediaImageLoader.prototype.completedItem = function () {
        this.activeProcessing--;
        this.processFromQueue();
    };
    MediaImageLoader.prototype.requestMediaEmoji = function (url, token, retryOnAuthError) {
        var _this = this;
        return imageAcceptHeader().then(function (acceptHeader) {
            // Media REST API: https://media-api-internal.atlassian.io/api.html#file__fileId__image_get
            var options = {
                headers: {
                    Authorization: "Bearer " + token.jwt,
                    'X-Client-Id': token.clientId,
                    Accept: acceptHeader,
                },
            };
            return fetch(url, options).then(function (response) {
                if (response.status === 403 && retryOnAuthError) {
                    // retry once if 403
                    return _this.tokenManager
                        .getToken('read', true)
                        .then(function (newToken) { return _this.requestMediaEmoji(url, newToken, false); });
                }
                else if (response.ok) {
                    return response.blob().then(function (blob) { return _this.readBlob(blob); });
                }
                throw new Error("Unable to load media image. Status=" + response.status + " " + response.statusText);
            });
        });
    };
    MediaImageLoader.prototype.readBlob = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            // TODO: [ts30] Add proper handling for null and ArrayBuffer
            reader.addEventListener('load', function () { return resolve(reader.result); });
            reader.addEventListener('error', function () { return reject(reader.error); });
            reader.readAsDataURL(blob);
        });
    };
    return MediaImageLoader;
}());
export default MediaImageLoader;
//# sourceMappingURL=MediaImageLoader.js.map