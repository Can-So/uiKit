import { utils, } from '@atlaskit/util-service-support';
export var DEFAULT_SHARE_PATH = 'share';
export var SHARE_CONFIG_PATH = 'share/config';
// TODO: replace with the real stargate namespace
export var DEFAULT_SHARE_SERVICE_URL = '/gateway/api';
var ShareServiceClient = /** @class */ (function () {
    function ShareServiceClient(serviceConfig) {
        this.serviceConfig = serviceConfig || {
            url: DEFAULT_SHARE_SERVICE_URL,
        };
    }
    /**
     * To send a POST request to the share endpoint in Share service
     */
    ShareServiceClient.prototype.share = function (content, recipients, metadata, comment) {
        var options = {
            path: DEFAULT_SHARE_PATH,
            requestInit: {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    content: content,
                    recipients: recipients,
                    metadata: metadata,
                    comment: comment,
                }),
            },
        };
        return utils.requestService(this.serviceConfig, options);
    };
    ShareServiceClient.prototype.getConfig = function (product, cloudId) {
        var options = {
            path: SHARE_CONFIG_PATH,
            queryParams: { product: product, cloudId: cloudId },
            requestInit: { method: 'get' },
        };
        return utils.requestService(this.serviceConfig, options);
    };
    return ShareServiceClient;
}());
export { ShareServiceClient };
//# sourceMappingURL=ShareServiceClient.js.map