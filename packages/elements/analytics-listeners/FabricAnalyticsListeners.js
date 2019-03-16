import * as tslib_1 from "tslib";
var _a;
import * as React from 'react';
import { FabricChannel } from './types';
import FabricElementsListener from './fabric/FabricElementsListener';
import AtlaskitListener from './atlaskit/AtlaskitListener';
import Logger from './helpers/logger';
import NavigationListener from './navigation/NavigationListener';
import FabricEditorListener from './fabric/FabricEditorListener';
import MediaAnalyticsListener from './media/MediaAnalyticsListener';
var listenerMap = (_a = {},
    _a[FabricChannel.elements] = FabricElementsListener,
    _a[FabricChannel.editor] = FabricEditorListener,
    _a[FabricChannel.atlaskit] = AtlaskitListener,
    _a[FabricChannel.navigation] = NavigationListener,
    _a[FabricChannel.media] = MediaAnalyticsListener,
    _a);
var FabricAnalyticsListeners = /** @class */ (function (_super) {
    tslib_1.__extends(FabricAnalyticsListeners, _super);
    function FabricAnalyticsListeners(props) {
        var _this = _super.call(this, props) || this;
        _this.logger = new Logger({ logLevel: props.logLevel });
        return _this;
    }
    FabricAnalyticsListeners.prototype.render = function () {
        var _this = this;
        var _a = this.props, client = _a.client, children = _a.children, logLevel = _a.logLevel, excludedChannels = _a.excludedChannels;
        if (typeof logLevel === 'number') {
            this.logger.setLogLevel(logLevel);
        }
        var listeners = Object.keys(listenerMap)
            .filter(function (channel) { return !excludedChannels || excludedChannels.indexOf(channel) < 0; })
            .map(function (channel) { return listenerMap[channel]; })
            .reduce(function (prev, Listener) { return (React.createElement(Listener, { client: client, logger: _this.logger }, prev)); }, children);
        return listeners;
    };
    return FabricAnalyticsListeners;
}(React.Component));
export default FabricAnalyticsListeners;
//# sourceMappingURL=FabricAnalyticsListeners.js.map