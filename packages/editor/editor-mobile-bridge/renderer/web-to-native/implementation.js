import * as tslib_1 from "tslib";
import { sendToBridge } from '../../bridge-utils';
var WebRendererBridge = /** @class */ (function () {
    function WebRendererBridge() {
    }
    WebRendererBridge.prototype.call = function (bridge, event) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        sendToBridge.apply(void 0, tslib_1.__spread([bridge, event], args));
    };
    return WebRendererBridge;
}());
export var toNativeBridge = new WebRendererBridge();
//# sourceMappingURL=implementation.js.map