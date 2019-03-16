import { utils as serviceUtils, } from '@atlaskit/util-service-support';
// expire 30 seconds early to factor in latency, slow services, etc
export var expireAdjustment = 30;
var TokenManager = /** @class */ (function () {
    function TokenManager(siteServiceConfig) {
        this.siteServiceConfig = siteServiceConfig;
        this.tokens = new Map();
    }
    TokenManager.prototype.addToken = function (type, mediaApiToken) {
        this.tokens.set(type, {
            mediaApiToken: mediaApiToken,
        });
    };
    TokenManager.prototype.getToken = function (type, forceRefresh) {
        var tokenDetail = this.tokens.get(type);
        if (!tokenDetail) {
            tokenDetail = {};
            this.tokens.set(type, tokenDetail);
        }
        var mediaApiToken = tokenDetail.mediaApiToken, activeTokenRefresh = tokenDetail.activeTokenRefresh;
        if (mediaApiToken) {
            var nowInSeconds = Date.now() / 1000;
            var expiresAt = mediaApiToken.expiresAt - expireAdjustment;
            if (nowInSeconds < expiresAt && !forceRefresh) {
                // still valid
                return Promise.resolve(mediaApiToken);
            }
            if (activeTokenRefresh) {
                // refresh already active, return that
                return activeTokenRefresh;
            }
            // clear expired token
            tokenDetail.mediaApiToken = undefined;
        }
        var path = "token/" + type;
        // request a new token and track the promise for future requests until completed
        tokenDetail.activeTokenRefresh = serviceUtils
            .requestService(this.siteServiceConfig, { path: path })
            .then(function (mediaApiToken) {
            tokenDetail.activeTokenRefresh = undefined;
            tokenDetail.mediaApiToken = mediaApiToken;
            return mediaApiToken;
        });
        return tokenDetail.activeTokenRefresh;
    };
    return TokenManager;
}());
export default TokenManager;
//# sourceMappingURL=TokenManager.js.map