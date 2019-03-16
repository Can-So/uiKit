import * as tslib_1 from "tslib";
var isPromise = function (c) {
    return typeof c.then === 'function';
};
export var sendEvent = function (logger, client) { return function (event) {
    if (client) {
        var gasEvent_1 = tslib_1.__assign({}, event);
        delete gasEvent_1.eventType;
        var withClient = function (cb) {
            if (isPromise(client)) {
                client
                    .then(cb)
                    .catch(function (e) { return logger.warn('There was an error sending the event', e); });
            }
            else {
                try {
                    cb(client);
                }
                catch (e) {
                    logger.warn('There was an error sending the event', e);
                }
            }
        };
        switch (event.eventType) {
            case 'ui':
                logger.debug('Sending UI Event via analytics client', gasEvent_1);
                withClient(function (client) { return client.sendUIEvent(gasEvent_1); });
                break;
            case 'operational':
                logger.debug('Sending Operational Event via analytics client', gasEvent_1);
                withClient(function (client) {
                    return client.sendOperationalEvent(gasEvent_1);
                });
                break;
            case 'track':
                logger.debug('Sending Track Event via analytics client', gasEvent_1);
                withClient(function (client) { return client.sendTrackEvent(gasEvent_1); });
                break;
            case 'screen':
                logger.debug('Sending Screen Event via analytics client', gasEvent_1);
                withClient(function (client) {
                    return client.sendScreenEvent(gasEvent_1);
                });
                break;
            default:
                logger.error("cannot map eventType " + event.eventType + " to an analytics-web-client function");
        }
    }
    else {
        logger.warn('AnalyticsWebClient instance is not provided');
    }
}; };
//# sourceMappingURL=analytics-web-client-wrapper.js.map