import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsListener } from '@findable/analytics-next';
import { FabricChannel } from '../types';
import { handleEvent } from './handle-event';
export var EDITOR_TAG = 'fabricEditor';
var FabricEditorListener = /** @class */ (function (_super) {
    tslib_1.__extends(FabricEditorListener, _super);
    function FabricEditorListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEventWrapper = function (event) {
            handleEvent(event, EDITOR_TAG, _this.props.logger, _this.props.client);
        };
        return _this;
    }
    FabricEditorListener.prototype.render = function () {
        return (React.createElement(AnalyticsListener, { onEvent: this.handleEventWrapper, channel: FabricChannel.editor }, this.props.children));
    };
    return FabricEditorListener;
}(React.Component));
export default FabricEditorListener;
//# sourceMappingURL=FabricEditorListener.js.map