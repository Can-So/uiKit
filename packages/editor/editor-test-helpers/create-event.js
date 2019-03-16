/**
 * Test if we could use `new Event()` to create an event
 *
 * In IE, doing `new Event()` would throw an error.
 */
var supportsEvent = (function (event) {
    if (event) {
        try {
            // tslint:disable-next-line:no-unused-expression
            new event('emit-init');
        }
        catch (e) {
            return false;
        }
    }
    return true;
})(Event);
/**
 * Build an event object in a cross-browser manner
 *
 * Usage:
 *    const event = createEvent('paste', options);
 */
export default (function (name, options) {
    if (options === void 0) { options = {}; }
    var event;
    if (options.bubbles === undefined) {
        options.bubbles = true;
    }
    if (options.cancelable === undefined) {
        options.cancelable = true;
    }
    if (options.composed === undefined) {
        options.composed = true;
    }
    if (supportsEvent) {
        event = new Event(name, options);
    }
    else {
        event = document.createEvent('Event');
        event.initEvent(name, options.bubbles, options.cancelable);
    }
    return event;
});
//# sourceMappingURL=create-event.js.map