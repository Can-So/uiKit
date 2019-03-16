import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsListener } from '@findable/analytics-next';
import { DEFAULT_SOURCE } from '@findable/analytics-gas-types';
import { sendEvent } from '../analytics-web-client-wrapper';
import { FabricChannel } from '../types';
var MediaAnalyticsListener = /** @class */ (function (_super) {
    tslib_1.__extends(MediaAnalyticsListener, _super);
    function MediaAnalyticsListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listenerHandler = function (event) {
            var _a = _this.props, client = _a.client, logger = _a.logger;
            logger.debug('Received Media event', event);
            if (event.payload) {
                var payload = tslib_1.__assign({ source: DEFAULT_SOURCE }, event.payload, { tags: event.payload.tags
                        ? Array.from(new Set(tslib_1.__spread(event.payload.tags, ['media'])))
                        : ['media'] });
                sendEvent(logger, client)(payload);
            }
        };
        return _this;
    }
    MediaAnalyticsListener.prototype.render = function () {
        return (React.createElement(AnalyticsListener, { onEvent: this.listenerHandler, channel: FabricChannel.media }, this.props.children));
    };
    return MediaAnalyticsListener;
}(React.Component));
export default MediaAnalyticsListener;
//# sourceMappingURL=MediaAnalyticsListener.js.map