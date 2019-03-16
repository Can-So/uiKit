import * as tslib_1 from "tslib";
import { sendToBridge } from './bridge-utils';
var RuntimeBridgeImpl = /** @class */ (function () {
    function RuntimeBridgeImpl() {
    }
    RuntimeBridgeImpl.prototype.call = function (bridge, event) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        sendToBridge.apply(void 0, tslib_1.__spread([bridge, event], args));
    };
    return RuntimeBridgeImpl;
}());
export { RuntimeBridgeImpl };
export var toRuntimeBridge = new RuntimeBridgeImpl();
export function errorReporter(event) {
    var message = event.message, filename = event.filename, line = event.lineno, col = event.colno, error = event.error;
    toRuntimeBridge.call('errorBridge', 'sendError', {
        message: message,
        source: filename || '',
        line: line,
        col: col,
        stackTrace: (error &&
            error.stack &&
            error.stack.split('\n').map(function (trace) { return trace.trim(); })) ||
            [],
    });
}
window.addEventListener('error', errorReporter);
//# sourceMappingURL=error-reporter.js.map