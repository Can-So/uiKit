import * as tslib_1 from "tslib";
import debug from '../util/logger';
import { AbstractResource } from './MentionResource';
var CacheEntry = /** @class */ (function () {
    function CacheEntry(pres, timeout) {
        this.presence = pres;
        this.expiry = Date.now() + timeout;
    }
    CacheEntry.prototype.expired = function () {
        return Date.now() > this.expiry;
    };
    return CacheEntry;
}());
var AbstractPresenceResource = /** @class */ (function (_super) {
    tslib_1.__extends(AbstractPresenceResource, _super);
    function AbstractPresenceResource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractPresenceResource.prototype.refreshPresence = function (userIds) {
        throw new Error("not yet implemented.\nParams: userIds=" + userIds);
    };
    AbstractPresenceResource.prototype.notifyListeners = function (presences) {
        this.changeListeners.forEach(function (listener, key) {
            try {
                listener(presences);
            }
            catch (e) {
                // ignore error from listener
                debug("error from listener '" + key + "', ignoring", e);
            }
        });
    };
    return AbstractPresenceResource;
}(AbstractResource));
var PresenceResource = /** @class */ (function (_super) {
    tslib_1.__extends(PresenceResource, _super);
    function PresenceResource(config) {
        var _this = _super.call(this) || this;
        if (!config.url) {
            throw new Error('config.url is a required parameter');
        }
        if (!config.cloudId) {
            throw new Error('config.cloudId is a required parameter');
        }
        _this.config = config;
        _this.config.url = PresenceResource.cleanUrl(config.url);
        _this.presenceCache =
            config.cache || new DefaultPresenceCache(config.cacheExpiry);
        _this.presenceParser = config.parser || new DefaultPresenceParser();
        return _this;
    }
    PresenceResource.prototype.refreshPresence = function (userIds) {
        var cacheHits = this.presenceCache.getBulk(userIds);
        this.notifyListeners(cacheHits);
        var cacheMisses = this.presenceCache.getMissingUserIds(userIds);
        if (cacheMisses.length) {
            this.retrievePresence(cacheMisses);
        }
    };
    PresenceResource.prototype.retrievePresence = function (userIds) {
        var _this = this;
        this.queryDirectoryForPresences(userIds)
            .then(function (res) { return _this.presenceParser.parse(res); })
            .then(function (presences) {
            _this.notifyListeners(presences);
            _this.presenceCache.update(presences);
        });
    };
    PresenceResource.prototype.queryDirectoryForPresences = function (userIds) {
        var query = {
            query: "query getPresenceForMentions($organizationId: String!, $userIds: [String!], $productId: String) {\n                PresenceBulk(organizationId: $organizationId, product: $productId, userIds: $userIds) {\n                  userId\n                  state\n                  stateMetadata\n                }\n              }",
            variables: {
                organizationId: this.config.cloudId,
                userIds: userIds,
            },
        };
        if (this.config.productId) {
            query.variables['productId'] = this.config.productId;
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(query),
        };
        return fetch(this.config.url, options).then(function (response) { return response.json(); });
    };
    PresenceResource.cleanUrl = function (url) {
        if (url.substr(-1) !== '/') {
            url += '/';
        }
        return url;
    };
    return PresenceResource;
}(AbstractPresenceResource));
var DefaultPresenceCache = /** @class */ (function () {
    function DefaultPresenceCache(cacheTimeout, cacheTrigger) {
        this.expiryInMillis = cacheTimeout
            ? cacheTimeout
            : DefaultPresenceCache.defaultTimeout;
        this.flushTrigger = cacheTrigger
            ? cacheTrigger
            : DefaultPresenceCache.defaultFlushTrigger;
        this.cache = {};
        this.size = 0;
    }
    /**
     * Precondition: _delete is only called internally if userId exists in cache
     * Removes cache entry
     * @param userId
     */
    DefaultPresenceCache.prototype._delete = function (userId) {
        delete this.cache[userId];
        this.size--;
    };
    /**
     * Checks a cache entry and calls delete if the info has expired
     * @param userId
     */
    DefaultPresenceCache.prototype._deleteIfExpired = function (userId) {
        if (this.contains(userId) && this.cache[userId].expired()) {
            this._delete(userId);
        }
    };
    /**
     * Cleans expired entries from cache
     */
    DefaultPresenceCache.prototype._removeExpired = function () {
        var _this = this;
        Object.keys(this.cache).forEach(function (id) {
            _this._deleteIfExpired(id);
        });
    };
    /**
     * Checks if a user exists in the cache
     * @param userId
     */
    DefaultPresenceCache.prototype.contains = function (userId) {
        return this.cache.hasOwnProperty(userId);
    };
    /**
     * Retrieves a presence from the cache after checking for expired entries
     * @param userId - to index the cache
     * @returns Presence - the presence that matches the userId
     */
    DefaultPresenceCache.prototype.get = function (userId) {
        this._deleteIfExpired(userId);
        if (!this.contains(userId)) {
            return {};
        }
        return this.cache[userId].presence;
    };
    /**
     * Retrieve multiple presences at once from the cache
     * @param userIds - to index the cache
     * @returns PresenceMap - A map of userIds to cached Presences
     */
    DefaultPresenceCache.prototype.getBulk = function (userIds) {
        var e_1, _a;
        var presences = {};
        try {
            for (var userIds_1 = tslib_1.__values(userIds), userIds_1_1 = userIds_1.next(); !userIds_1_1.done; userIds_1_1 = userIds_1.next()) {
                var userId = userIds_1_1.value;
                if (this.contains(userId)) {
                    presences[userId] = this.get(userId);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (userIds_1_1 && !userIds_1_1.done && (_a = userIds_1.return)) _a.call(userIds_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return presences;
    };
    /**
     * For a given list of ids, returns a subset
     * of all the ids with missing cache entries.
     * @param userIds - to index the cache
     * @returns string[] - ids missing from the cache
     */
    DefaultPresenceCache.prototype.getMissingUserIds = function (userIds) {
        var _this = this;
        return userIds.filter(function (id) { return !_this.contains(id); });
    };
    /**
     * Precondition: presMap only contains ids of users not in cache
     *               expired users must first be removed then reinserted with updated presence
     * Updates the cache by adding the new Presence entries and setting the expiry time
     * @param presMap
     */
    DefaultPresenceCache.prototype.update = function (presMap) {
        var _this = this;
        if (this.size >= this.flushTrigger) {
            this._removeExpired();
        }
        Object.keys(presMap).forEach(function (userId) {
            _this.cache[userId] = new CacheEntry(presMap[userId], _this.expiryInMillis);
            _this.size++;
        });
    };
    DefaultPresenceCache.defaultTimeout = 20000;
    DefaultPresenceCache.defaultFlushTrigger = 50;
    return DefaultPresenceCache;
}());
export { DefaultPresenceCache };
var DefaultPresenceParser = /** @class */ (function () {
    function DefaultPresenceParser() {
    }
    DefaultPresenceParser.prototype.mapState = function (state) {
        if (state === 'unavailable') {
            return 'offline';
        }
        else if (state === 'available') {
            return 'online';
        }
        else {
            return state;
        }
    };
    DefaultPresenceParser.prototype.parse = function (response) {
        var e_2, _a;
        var presences = {};
        if (response.hasOwnProperty('data') &&
            response['data'].hasOwnProperty('PresenceBulk')) {
            var results = response['data'].PresenceBulk;
            try {
                // Store map of state and time indexed by userId.  Ignore null results.
                for (var results_1 = tslib_1.__values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                    var user = results_1_1.value;
                    if (user.userId && user.state) {
                        var state = DefaultPresenceParser.extractState(user) || user.state;
                        presences[user.userId] = {
                            status: this.mapState(state),
                        };
                    }
                    else if (!user.hasOwnProperty('userId') ||
                        !user.hasOwnProperty('state')) {
                        // tslint:disable-next-line:no-console
                        console.error('Unexpected response from presence service contains keys: ' +
                            Object.keys(user));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return presences;
    };
    DefaultPresenceParser.extractState = function (presence) {
        if (DefaultPresenceParser.isFocusState(presence)) {
            return DefaultPresenceParser.FOCUS_STATE;
        }
        return presence.state;
    };
    /*
      This is a bit of an odd exception. In the case where a user is in "Focus Mode", their presence state
      is returned as 'busy' along with a `stateMetadata` object containing a `focus` field.
      In this case we ignore the value of the `state` field and treat the presence as a 'focus' state.
     */
    DefaultPresenceParser.isFocusState = function (presence) {
        if (presence.stateMetadata) {
            try {
                var metadata = JSON.parse(presence.stateMetadata);
                return metadata && !!metadata.focus;
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error("Failed to parse presence's stateMetadata for user with id " + presence.userId + ": " + presence.stateMetadata);
                // tslint:disable-next-line:no-console
                console.error(e);
            }
        }
        return false;
    };
    DefaultPresenceParser.FOCUS_STATE = 'focus';
    return DefaultPresenceParser;
}());
export { DefaultPresenceParser };
export { AbstractPresenceResource };
export default PresenceResource;
//# sourceMappingURL=PresenceResource.js.map