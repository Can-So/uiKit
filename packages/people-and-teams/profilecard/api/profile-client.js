import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { LRUCache } from 'lru-fast';

/**
 * Transform response from GraphQL
 * - Prefix `timestring` with `remoteWeekdayString` depending on `remoteWeekdayIndex`
 * - Remove properties which will be not used later
 * @ignore
 * @param  {object} response
 * @return {object}
 */
export var modifyResponse = function modifyResponse(response) {
  var data = _objectSpread({}, response.User);

  var localWeekdayIndex = new Date().getDay().toString();

  if (data.remoteWeekdayIndex && data.remoteWeekdayIndex !== localWeekdayIndex) {
    data.remoteTimeString = "".concat(data.remoteWeekdayString, " ").concat(data.remoteTimeString);
  }

  data.timestring = data.remoteTimeString;
  delete data.remoteWeekdayIndex;
  delete data.remoteWeekdayString;
  delete data.remoteTimeString;
  delete data.id;
  return data;
};

var buildHeaders = function buildHeaders() {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
};
/**
 * @param  {string} userId
 * @param  {string} cloudId
 * @return {string} GraphQL Query String
 */


var buildUserQuery = function buildUserQuery(cloudId, userId) {
  return {
    query: "query User($userId: String!, $cloudId: String!) {\n    User: CloudUser(userId: $userId, cloudId: $cloudId) {\n      id,\n      isCurrentUser,\n      status,\n      statusModifiedDate,\n      isBot,\n      isNotMentionable,\n      fullName,\n      nickname,\n      email,\n      meta: title,\n      location,\n      companyName,\n      avatarUrl(size: 192),\n      remoteWeekdayIndex: localTime(format: \"d\"),\n      remoteWeekdayString: localTime(format: \"ddd\"),\n      remoteTimeString: localTime(format: \"h:mma\"),\n    }\n  }",
    variables: {
      cloudId: cloudId,
      userId: userId
    }
  };
};
/**
 * @param {string} serviceUrl - GraphQL service endpoint
 * @param {string} userId
 * @param {string} cloudId
 */


var requestService = function requestService(serviceUrl, cloudId, userId) {
  var headers = buildHeaders();
  var userQuery = buildUserQuery(cloudId, userId);
  return fetch(new Request(serviceUrl, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(userQuery)
  })).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        code: response.status,
        reason: response.statusText
      });
    }

    return response.json().then(function (json) {
      if (json.errors) {
        return Promise.reject({
          reason: json.errors[0].category || 'default'
        });
      }

      return modifyResponse(json.data);
    });
  });
};

var ProfileClient =
/*#__PURE__*/
function () {
  function ProfileClient(config) {
    _classCallCheck(this, ProfileClient);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "cache", void 0);

    var defaults = {
      cacheSize: 10,
      cacheMaxAge: 0
    };
    this.config = _objectSpread({}, defaults, config); // never set cacheSize or cacheMaxAge to negative numbers

    this.config.cacheSize = Math.max(parseInt(this.config.cacheSize, 10), 0);
    this.config.cacheMaxAge = Math.max(parseInt(this.config.cacheMaxAge, 10), 0); // DIR-474: cap cache at 30 days.

    if (this.config.cacheMaxAge) {
      this.config.cacheMaxAge = Math.min(this.config.cacheMaxAge, 30 * 24 * 60 * 60 * 1000);
    } // Only set cache if maxCacheAge and cacheSize are set


    this.cache = !this.config.cacheMaxAge || !this.config.cacheSize ? null : new LRUCache(this.config.cacheSize);
  }

  _createClass(ProfileClient, [{
    key: "makeRequest",
    value: function makeRequest(cloudId, userId) {
      if (!this.config.url) {
        throw new Error('config.url is a required parameter');
      }

      return requestService(this.config.url, cloudId, userId);
    }
  }, {
    key: "setCachedProfile",
    value: function setCachedProfile(cloudId, userId, cacheItem) {
      var cacheIdentifier = "".concat(cloudId, "/").concat(userId);
      this.cache.put(cacheIdentifier, cacheItem);
    }
  }, {
    key: "getCachedProfile",
    value: function getCachedProfile(cloudId, userId) {
      var cacheIdentifier = "".concat(cloudId, "/").concat(userId);
      var cached = this.cache && this.cache.get(cacheIdentifier);

      if (!cached) {
        return null;
      }

      if (cached.expire < Date.now()) {
        this.cache.remove(cacheIdentifier);
        return null;
      }

      this.cache.set(cacheIdentifier, {
        expire: Date.now() + this.config.cacheMaxAge,
        profile: cached.profile
      });
      return cached.profile;
    }
  }, {
    key: "flushCache",
    value: function flushCache() {
      if (this.cache) {
        this.cache.removeAll();
      }
    }
  }, {
    key: "getProfile",
    value: function getProfile(cloudId, userId) {
      var _this = this;

      if (!cloudId || !userId) {
        return Promise.reject(new Error('cloudId or userId missing'));
      }

      var cache = this.getCachedProfile(cloudId, userId);

      if (cache) {
        return Promise.resolve(cache);
      }

      return new Promise(function (resolve, reject) {
        _this.makeRequest(cloudId, userId).then(function (data) {
          if (_this.cache) {
            _this.setCachedProfile(cloudId, userId, {
              expire: Date.now() + _this.config.cacheMaxAge,
              profile: data
            });
          }

          resolve(data);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return ProfileClient;
}();

export default ProfileClient;