var MobileMediaPicker = /** @class */ (function () {
    function MobileMediaPicker() {
        this.listeners = {};
    }
    MobileMediaPicker.prototype.on = function (event, cb) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(cb);
    };
    MobileMediaPicker.prototype.removeAllListeners = function (event) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = [];
    };
    MobileMediaPicker.prototype.emit = function (event, data) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(function (cb) { return cb(data); });
    };
    MobileMediaPicker.prototype.destroy = function () {
        this.listeners = {};
    };
    MobileMediaPicker.prototype.setUploadParams = function (uploadParams) { };
    return MobileMediaPicker;
}());
export default MobileMediaPicker;
//# sourceMappingURL=MobileMediaPicker.js.map