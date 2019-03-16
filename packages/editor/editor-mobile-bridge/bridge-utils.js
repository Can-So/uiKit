import * as tslib_1 from "tslib";
import { toNativeBridge } from './editor/web-to-native';
/**
 * Send an event to which ever bridge it can find.
 * @param bridgeName
 * @param eventName
 * @param props
 *
 * For this to work on both bridges their interfaces need to match.
 * We have two main identifiers we use, bridgeName and eventName.
 * For iOS this looks like:
 *  window.webkit.messageHandlers.<bridgeName>.postMessage({
 *    name: eventName,
 *    ...<props>
 *  })
 *
 * And for Android:
 * Props object is spread as args.
 *  window.<bridgeName>.<eventName>(...<props>)
 */
export var sendToBridge = function (bridgeName, eventName, props) {
    if (props === void 0) { props = {}; }
    if (window.webkit && window.webkit.messageHandlers[bridgeName]) {
        window.webkit.messageHandlers[bridgeName].postMessage(tslib_1.__assign({ name: eventName }, props));
    }
    else if (window[bridgeName]) {
        var args = Object.keys(props).map(function (key) { return props[key]; });
        var bridge = window[bridgeName];
        if (bridge && bridge.hasOwnProperty(eventName)) {
            bridge[eventName].apply(bridge, tslib_1.__spread(args));
        }
    }
    var logs = window.logBridge;
    if (logs) {
        var logName = bridgeName + ":" + eventName;
        logs[logName] = logs[logName] || [];
        logs[logName] = logs[logName].concat(props);
    }
    var log = toNativeBridge.log;
    if (log) {
        log(bridgeName, eventName, props);
    }
};
export var parseLocationSearch = function () {
    if (!window) {
        return {};
    }
    return window.location.search
        .slice(1)
        .split('&')
        .reduce(function (acc, current) {
        var _a = tslib_1.__read(current.split('='), 2), key = _a[0], value = _a[1];
        acc[key] = value;
        return acc;
    }, {});
};
//# sourceMappingURL=bridge-utils.js.map