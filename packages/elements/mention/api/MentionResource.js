import * as tslib_1 from "tslib";
import { utils as serviceUtils, } from '@findable/util-service-support';
import { isAppMention, isTeamMention, } from '../types';
import debug from '../util/logger';
var MAX_QUERY_ITEMS = 100;
var MAX_NOTIFIED_ITEMS = 20;
var emptySecurityProvider = function () {
    return {
        params: {},
        headers: {},
    };
};
var AbstractResource = /** @class */ (function () {
    function AbstractResource() {
        this.changeListeners = new Map();
        this.allResultsListeners = new Map();
        this.errListeners = new Map();
        this.infoListeners = new Map();
    }
    AbstractResource.prototype.subscribe = function (key, callback, errCallback, infoCallback, allResultsCallback) {
        if (callback) {
            this.changeListeners.set(key, callback);
        }
        if (errCallback) {
            this.errListeners.set(key, errCallback);
        }
        if (infoCallback) {
            this.infoListeners.set(key, infoCallback);
        }
        if (allResultsCallback) {
            this.allResultsListeners.set(key, allResultsCallback);
        }
    };
    AbstractResource.prototype.unsubscribe = function (key) {
        this.changeListeners.delete(key);
        this.errListeners.delete(key);
        this.infoListeners.delete(key);
        this.allResultsListeners.delete(key);
    };
    return AbstractResource;
}());
var AbstractMentionResource = /** @class */ (function (_super) {
    tslib_1.__extends(AbstractMentionResource, _super);
    function AbstractMentionResource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractMentionResource.prototype.shouldHighlightMention = function (_mention) {
        return false;
    };
    // eslint-disable-next-line class-methods-use-this
    AbstractMentionResource.prototype.filter = function (query) {
        throw new Error("not yet implemented.\nParams: query=" + query);
    };
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    AbstractMentionResource.prototype.recordMentionSelection = function (_mention) {
        // Do nothing
    };
    AbstractMentionResource.prototype.isFiltering = function (_query) {
        return false;
    };
    AbstractMentionResource.prototype._notifyListeners = function (mentionsResult, stats) {
        debug('ak-mention-resource._notifyListeners', mentionsResult &&
            mentionsResult.mentions &&
            mentionsResult.mentions.length, this.changeListeners);
        this.changeListeners.forEach(function (listener, key) {
            try {
                listener(mentionsResult.mentions.slice(0, MAX_NOTIFIED_ITEMS), mentionsResult.query, stats);
            }
            catch (e) {
                // ignore error from listener
                debug("error from listener '" + key + "', ignoring", e);
            }
        });
    };
    AbstractMentionResource.prototype._notifyAllResultsListeners = function (mentionsResult) {
        debug('ak-mention-resource._notifyAllResultsListeners', mentionsResult &&
            mentionsResult.mentions &&
            mentionsResult.mentions.length, this.changeListeners);
        this.allResultsListeners.forEach(function (listener, key) {
            try {
                listener(mentionsResult.mentions.slice(0, MAX_NOTIFIED_ITEMS), mentionsResult.query);
            }
            catch (e) {
                // ignore error from listener
                debug("error from listener '" + key + "', ignoring", e);
            }
        });
    };
    AbstractMentionResource.prototype._notifyErrorListeners = function (error, query) {
        this.errListeners.forEach(function (listener, key) {
            try {
                listener(error, query);
            }
            catch (e) {
                // ignore error from listener
                debug("error from listener '" + key + "', ignoring", e);
            }
        });
    };
    AbstractMentionResource.prototype._notifyInfoListeners = function (info) {
        this.infoListeners.forEach(function (listener, key) {
            try {
                listener(info);
            }
            catch (e) {
                // ignore error fromr listener
                debug("error from listener '" + key + "', ignoring", e);
            }
        });
    };
    return AbstractMentionResource;
}(AbstractResource));
/**
 * Provides a Javascript API
 */
var MentionResource = /** @class */ (function (_super) {
    tslib_1.__extends(MentionResource, _super);
    function MentionResource(config) {
        var _this = _super.call(this) || this;
        _this.verifyMentionConfig(config);
        _this.config = config;
        _this.lastReturnedSearch = 0;
        _this.activeSearches = new Set();
        return _this;
    }
    MentionResource.prototype.shouldHighlightMention = function (mention) {
        if (this.config.shouldHighlightMention) {
            return this.config.shouldHighlightMention(mention);
        }
        return false;
    };
    MentionResource.prototype.notify = function (searchTime, mentionResult, query) {
        if (searchTime > this.lastReturnedSearch) {
            this.lastReturnedSearch = searchTime;
            this._notifyListeners(mentionResult, {
                duration: Date.now() - searchTime,
            });
        }
        else {
            var date = new Date(searchTime).toISOString().substr(17, 6);
            debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
        }
        this._notifyAllResultsListeners(mentionResult);
    };
    MentionResource.prototype.notifyError = function (error, query) {
        this._notifyErrorListeners(error, query);
        if (query) {
            this.activeSearches.delete(query);
        }
    };
    MentionResource.prototype.filter = function (query, contextIdentifier) {
        var _this = this;
        var searchTime = Date.now();
        if (!query) {
            this.initialState(contextIdentifier).then(function (results) { return _this.notify(searchTime, results, query); }, function (error) { return _this.notifyError(error, query); });
        }
        else {
            this.activeSearches.add(query);
            var searchResponse = this.search(query, contextIdentifier);
            searchResponse.mentions.then(function (results) {
                _this.notify(searchTime, results, query);
            }, function (error) { return _this.notifyError(error, query); });
        }
    };
    MentionResource.prototype.recordMentionSelection = function (mention, contextIdentifier) {
        return this.recordSelection(mention, contextIdentifier).then(function () { }, function (error) { return debug("error recording mention selection: " + error, error); });
    };
    MentionResource.prototype.isFiltering = function (query) {
        return this.activeSearches.has(query);
    };
    MentionResource.prototype.verifyMentionConfig = function (config) {
        if (!config.url) {
            throw new Error('config.url is a required parameter');
        }
        if (!config.securityProvider) {
            config.securityProvider = emptySecurityProvider;
        }
    };
    MentionResource.prototype.initialState = function (contextIdentifier) {
        return this.remoteInitialState(contextIdentifier);
    };
    MentionResource.prototype.getQueryParams = function (contextIdentifier) {
        var configParams = {};
        if (this.config.containerId) {
            configParams['containerId'] = this.config.containerId;
        }
        if (this.config.productId) {
            configParams['productIdentifier'] = this.config.productId;
        }
        // if contextParams exist then it will override configParams for containerId
        return tslib_1.__assign({}, configParams, contextIdentifier);
    };
    /**
     * Returns the initial mention display list before a search is performed for the specified
     * container.
     *
     * @param contextIdentifier
     * @returns Promise
     */
    MentionResource.prototype.remoteInitialState = function (contextIdentifier) {
        var _this = this;
        var queryParams = this.getQueryParams(contextIdentifier);
        var options = {
            path: 'bootstrap',
            queryParams: queryParams,
        };
        return serviceUtils
            .requestService(this.config, options)
            .then(function (result) { return _this.transformServiceResponse(result, ''); });
    };
    MentionResource.prototype.search = function (query, contextIdentifier) {
        return {
            mentions: this.remoteSearch(query, contextIdentifier),
        };
    };
    MentionResource.prototype.remoteSearch = function (query, contextIdentifier) {
        var _this = this;
        var options = {
            path: 'search',
            queryParams: tslib_1.__assign({ query: query, limit: MAX_QUERY_ITEMS }, this.getQueryParams(contextIdentifier)),
        };
        return serviceUtils
            .requestService(this.config, options)
            .then(function (result) { return _this.transformServiceResponse(result, query); });
    };
    MentionResource.prototype.transformServiceResponse = function (result, query) {
        var mentions = result.mentions.map(function (mention) {
            var lozenge;
            if (isAppMention(mention)) {
                lozenge = mention.userType;
            }
            else if (isTeamMention(mention)) {
                lozenge = mention.userType;
            }
            return tslib_1.__assign({}, mention, { lozenge: lozenge, query: query });
        });
        return tslib_1.__assign({}, result, { mentions: mentions, query: result.query || query });
    };
    MentionResource.prototype.recordSelection = function (mention, contextIdentifier) {
        var options = {
            path: 'record',
            queryParams: tslib_1.__assign({ selectedUserId: mention.id }, this.getQueryParams(contextIdentifier)),
            requestInit: {
                method: 'POST',
            },
        };
        return serviceUtils.requestService(this.config, options);
    };
    return MentionResource;
}(AbstractMentionResource));
export { MentionResource };
var HttpError = /** @class */ (function () {
    function HttpError(statusCode, statusMessage) {
        this.statusCode = statusCode;
        this.message = statusMessage;
        this.name = 'HttpError';
        this.stack = new Error().stack;
    }
    return HttpError;
}());
export { HttpError };
export { AbstractResource, AbstractMentionResource };
export default MentionResource;
//# sourceMappingURL=MentionResource.js.map