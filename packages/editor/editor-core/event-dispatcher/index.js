var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.listeners = {};
    }
    EventDispatcher.prototype.on = function (event, cb) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(cb);
    };
    EventDispatcher.prototype.off = function (event, cb) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = this.listeners[event].filter(function (callback) { return callback !== cb; });
    };
    EventDispatcher.prototype.emit = function (event, data) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(function (cb) { return cb(data); });
    };
    EventDispatcher.prototype.destroy = function () {
        this.listeners = {};
    };
    return EventDispatcher;
}());
export { EventDispatcher };
/**
 * Creates a dispatch function that can be called inside ProseMirror Plugin
 * to notify listeners about that plugin's state change.
 */
export function createDispatch(eventDispatcher) {
    return function (eventName, data) {
        if (!eventName) {
            throw new Error('event name is required!');
        }
        var event = typeof eventName === 'string'
            ? eventName
            : eventName.key;
        eventDispatcher.emit(event, data);
    };
}
//# sourceMappingURL=index.js.map