import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsListener } from '@findable/analytics-next';
import { FabricChannel } from '../types';
import { handleEvent } from './handle-event';
export var ELEMENTS_TAG = 'fabricElements';
var FabricElementsListener = /** @class */ (function (_super) {
    tslib_1.__extends(FabricElementsListener, _super);
    function FabricElementsListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEventWrapper = function (event) {
            handleEvent(event, ELEMENTS_TAG, _this.props.logger, _this.props.client);
        };
        return _this;
    }
    FabricElementsListener.prototype.render = function () {
        return (React.createElement(AnalyticsListener, { onEvent: this.handleEventWrapper, channel: FabricChannel.elements }, this.props.children));
    };
    return FabricElementsListener;
}(React.Component));
export default FabricElementsListener;
//# sourceMappingURL=FabricElementsListener.js.map