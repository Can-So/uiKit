import * as tslib_1 from "tslib";
import { EventEmitter2 } from 'eventemitter2';
import { SpecialEventType, } from './apiTypes';
import { EventType } from './types';
import PubNubProtocol from './protocols/pubnub';
import NoopProtocol from './protocols/noop';
import { logDebug, logError, logInfo } from './util/logger';
import { utils as serviceUtils } from '@atlaskit/util-service-support';
import { FeatureFlags } from './featureFlags';
import { version } from './version.json';
var PLATFORM = 'WEB';
export var RETRY_STEP_IN_MILLISECONDS = 1000;
export var MAX_RETRY = 10;
var SUBSCRIBE_DEBOUNCE_TIME_IN_MILLISECONDS = 10;
var Client = /** @class */ (function () {
    function Client(config, protocols) {
        var _this = this;
        this.eventEmitter = new EventEmitter2({
            maxListeners: 500,
            wildcard: true,
            delimiter: ':',
        });
        this.currentChannels = new Set();
        this.capabilities = [];
        this.protocols = new Map();
        this.retryCount = 0;
        this.subscribeDebounced = null;
        this.subscribeBaseRequest = {
            clientInfo: {
                version: version,
                platform: PLATFORM,
                capabilities: this.capabilities,
            },
        };
        this.onMessage = function (event, data) {
            _this.eventEmitter.emit(event, event, data);
        };
        this.onAccessDenied = function () {
            logDebug('Access denied');
            if (_this.retryCount > MAX_RETRY) {
                logError('Retry count exceeded');
                return;
            }
            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    _this.subscribeToCurrentChannels()
                        .then(function () { return resolve(_this); })
                        .catch(reject);
                }, RETRY_STEP_IN_MILLISECONDS * Math.pow(2, _this.retryCount));
                _this.retryCount++;
            });
        };
        this.onNetworkUp = function () {
            _this.retryCount = 0;
            _this.eventEmitter.emit(SpecialEventType.CONNECTED);
        };
        this.onReconnect = function () {
            _this.eventEmitter.emit(SpecialEventType.RECONNECT);
        };
        this.config = config;
        this.featureFlags = new FeatureFlags(this.config.featureFlags);
        if (!protocols) {
            protocols = [new PubNubProtocol(this.featureFlags)];
        }
        this.subscribeBaseRequest.clientInfo.capabilities = this.registerProtocols(protocols);
    }
    Client.prototype.on = function (event, listener) {
        this.eventEmitter.on(event, listener);
        return this;
    };
    Client.prototype.off = function (event, listener) {
        this.eventEmitter.removeListener(event, listener);
        return this;
    };
    Client.prototype.join = function (aris) {
        var _this = this;
        var channelsChanged = false;
        aris.forEach(function (ari) {
            if (!_this.currentChannels.has(ari)) {
                _this.currentChannels.add(ari);
                channelsChanged = true;
            }
        });
        if (channelsChanged) {
            return this.debouncedSubscribeToCurrentChannels();
        }
        return Promise.resolve(this);
    };
    Client.prototype.leave = function (aris) {
        var _this = this;
        var channelsChanged = false;
        aris.forEach(function (ari) {
            if (_this.currentChannels.has(ari)) {
                _this.currentChannels.delete(ari);
                channelsChanged = true;
            }
        });
        if (channelsChanged) {
            return this.debouncedSubscribeToCurrentChannels();
        }
        return Promise.resolve(this);
    };
    Client.prototype.networkUp = function () {
        this.retryCount = 0;
        if (this.currentProtocol) {
            this.currentProtocol.networkUp();
        }
    };
    Client.prototype.networkDown = function () {
        if (this.currentProtocol) {
            this.currentProtocol.networkDown();
        }
    };
    Client.prototype.debouncedSubscribeToCurrentChannels = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.subscribeDebounced) {
                window.clearTimeout(_this.subscribeDebounced);
            }
            _this.subscribeDebounced = window.setTimeout(function () {
                _this.subscribeToCurrentChannels()
                    .then(function () { return resolve(_this); })
                    .catch(reject);
            }, SUBSCRIBE_DEBOUNCE_TIME_IN_MILLISECONDS);
        });
    };
    Client.prototype.registerProtocols = function (protocols) {
        var _this = this;
        var capabilities = [];
        protocols.forEach(function (protocol) {
            _this.protocols.set(protocol.getType(), protocol);
            capabilities = capabilities.concat(protocol.getCapabilities());
            protocol.on(EventType.MESSAGE, _this.onMessage);
            protocol.on(EventType.ACCESS_DENIED, _this.onAccessDenied);
            protocol.on(EventType.NETWORK_UP, _this.onNetworkUp);
            protocol.on(EventType.RECONNECT, _this.onReconnect);
        });
        return capabilities;
    };
    Client.prototype.subscribeToCurrentChannels = function () {
        var _this = this;
        var channels = Array.from(this.currentChannels.values());
        if (channels.length === 0) {
            if (this.currentProtocol) {
                this.currentProtocol.unsubscribeAll();
                this.currentProtocol = undefined;
            }
            this.eventEmitter.removeAllListeners();
            return Promise.resolve();
        }
        return this.fetchSubscribeProtocol(channels).then(function (subscribeProtocol) {
            var protocolConfig = subscribeProtocol.protocol;
            if (!protocolConfig) {
                logError('Failed to retrieve subscription configuration', subscribeProtocol.errors);
                return;
            }
            _this.currentProtocol = _this.protocols.get(protocolConfig.type);
            if (!_this.currentProtocol) {
                logInfo("Unknown protocol " + protocolConfig.type + ", using noop one.");
                _this.currentProtocol = new NoopProtocol();
            }
            _this.currentProtocol.subscribe(protocolConfig);
        });
    };
    Client.prototype.fetchSubscribeProtocol = function (aris) {
        return serviceUtils
            .requestService(this.config, {
            path: 'subscribe',
            requestInit: {
                method: 'POST',
                body: JSON.stringify(tslib_1.__assign({}, this.subscribeBaseRequest, { product: this.config.product, channels: aris })),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        })
            .then(function (data) {
            return data;
        });
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=client.js.map