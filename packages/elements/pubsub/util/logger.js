import * as tslib_1 from "tslib";
var debugEnabled = false;
var stacktracesEnabled = false;
var LOG_PREFIX = '[Frontend PubSub] ';
export function enableLogger(enable) {
    debugEnabled = enable;
}
export function enableStacktraces(enable) {
    stacktracesEnabled = enable;
}
export function logStacktrace() {
    if (stacktracesEnabled) {
        // tslint:disable-next-line:no-console
        console.log(new Error().stack);
    }
}
export function logDebug(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (debugEnabled) {
        // tslint:disable-next-line:no-console
        console.log.apply(console, tslib_1.__spread([LOG_PREFIX + msg], args));
    }
}
export function logInfo(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // tslint:disable-next-line:no-console
    console.info.apply(console, tslib_1.__spread([LOG_PREFIX + msg], args));
}
export function logError(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // tslint:disable-next-line:no-console
    console.error.apply(console, tslib_1.__spread([LOG_PREFIX + msg], args));
}
//# sourceMappingURL=logger.js.map