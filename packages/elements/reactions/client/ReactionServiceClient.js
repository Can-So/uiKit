import * as tslib_1 from "tslib";
import { utils, } from '@atlaskit/util-service-support';
var ReactionServiceClient = /** @class */ (function () {
    function ReactionServiceClient(baseUrl, sessionToken) {
        var _this = this;
        this.requestService = function (path, options) {
            return utils.requestService(_this.serviceConfig, tslib_1.__assign({}, options, { path: path }));
        };
        this.serviceConfig = { url: baseUrl };
        this.sessionToken = sessionToken;
    }
    ReactionServiceClient.prototype.getHeaders = function (hasBody) {
        if (hasBody === void 0) { hasBody = true; }
        var headers = {};
        headers['Accept'] = 'application/json';
        if (hasBody) {
            headers['Content-Type'] = 'application/json';
        }
        if (this.sessionToken) {
            headers['Authorization'] = this.sessionToken;
        }
        return headers;
    };
    ReactionServiceClient.prototype.getReactions = function (containerAri, aris) {
        if (aris.length === 0) {
            return Promise.resolve({});
        }
        return this.requestService('reactions/view', {
            requestInit: {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ containerAri: containerAri, aris: aris }),
            },
        });
    };
    ReactionServiceClient.prototype.getDetailedReaction = function (containerAri, ari, emojiId) {
        var reactionId = containerAri + "|" + ari + "|" + emojiId;
        var headers = this.getHeaders(false);
        return this.requestService('reactions', {
            queryParams: { reactionId: reactionId },
            requestInit: {
                headers: headers,
                method: 'GET',
                credentials: 'include',
            },
        });
    };
    ReactionServiceClient.prototype.addReaction = function (containerAri, ari, emojiId) {
        return this.requestService('reactions', {
            requestInit: {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ emojiId: emojiId, ari: ari, containerAri: containerAri }),
                credentials: 'include',
            },
        }).then(function (_a) {
            var reactions = _a.reactions;
            return reactions;
        });
    };
    ReactionServiceClient.prototype.deleteReaction = function (containerAri, ari, emojiId) {
        return this.requestService('reactions', {
            queryParams: {
                ari: ari,
                emojiId: emojiId,
                containerAri: containerAri,
            },
            requestInit: {
                method: 'DELETE',
                headers: this.getHeaders(),
                credentials: 'include',
            },
        }).then(function (_a) {
            var reactions = _a.reactions;
            return reactions;
        });
    };
    return ReactionServiceClient;
}());
export { ReactionServiceClient };
//# sourceMappingURL=ReactionServiceClient.js.map