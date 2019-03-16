import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsListener } from '@findable/analytics-next';
import { sendEvent } from '../analytics-web-client-wrapper';
import { FabricChannel } from '../types';
import processEvent from './process-event';
var AtlaskitListener = /** @class */ (function (_super) {
    tslib_1.__extends(AtlaskitListener, _super);
    function AtlaskitListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listenerHandler = function (event) {
            var _a = _this.props, client = _a.client, logger = _a.logger;
            logger.debug('Received Atlaskit event', event);
            var payload = processEvent(event, logger);
            logger.debug('Processed Atlaskit event', payload);
            if (payload) {
                sendEvent(logger, client)(payload);
            }
        };
        return _this;
    }
    AtlaskitListener.prototype.render = function () {
        return (React.createElement(AnalyticsListener, { onEvent: this.listenerHandler, channel: FabricChannel.atlaskit }, this.props.children));
    };
    return AtlaskitListener;
}(React.Component));
export default AtlaskitListener;
//# sourceMappingURL=AtlaskitListener.js.map