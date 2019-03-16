var WebBridge = /** @class */ (function () {
    function WebBridge() {
    }
    WebBridge.prototype.setPadding = function (top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        if (left === void 0) { left = 0; }
        var root = this.getRootElement();
        if (root) {
            root.style.padding = top + "px " + right + "px " + bottom + "px " + left + "px";
        }
    };
    return WebBridge;
}());
export default WebBridge;
//# sourceMappingURL=web-bridge.js.map