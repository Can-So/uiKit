import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { sendEvent } from '../analytics-web-client-wrapper';
import { FabricChannel } from '../types';
import processEvent from './process-event';
var NavigationListener = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationListener, _super);
    function NavigationListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listenerHandler = function (event) {
            var _a = _this.props, client = _a.client, logger = _a.logger;
            logger.debug('Received Navigation event', event);
            var payload = processEvent(event, logger);
            logger.debug('Processed Navigation event', payload);
            if (payload) {
                sendEvent(logger, client)(payload);
            }
        };
        return _this;
    }
    NavigationListener.prototype.render = function () {
        return (React.createElement(AnalyticsListener, { onEvent: this.listenerHandler, channel: FabricChannel.navigation }, this.props.children));
    };
    return NavigationListener;
}(React.Component));
export default NavigationListener;
//# sourceMappingURL=NavigationListener.js.map