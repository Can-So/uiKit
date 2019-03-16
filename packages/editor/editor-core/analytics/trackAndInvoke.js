import service from './service';
/**
 * Returns a sequence of tracking analytics event and the provided function.
 *
 * Usage:
 *
 *     let doSomething = function(a, b) { // ... }
 *     doSomething = trackAndInvoke('atlassian.editor.dosomething', doSomething);
 *
 *     doSomething(); // This will send analytics event and call the original function.
 *
 */
export default function trackAndInvoke(analyticsEventName, fn) {
    return function (a, b, c, d) {
        var result = fn(a, b, c, d);
        if (result) {
            service.trackEvent(analyticsEventName);
        }
        return result;
    };
}
//# sourceMappingURL=trackAndInvoke.js.map