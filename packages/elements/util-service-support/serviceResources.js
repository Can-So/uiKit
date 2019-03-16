var AbstractResource = /** @class */ (function () {
    function AbstractResource() {
        this.listeners = new Set();
    }
    AbstractResource.prototype.subscribe = function (onChange) {
        this.listeners.add(onChange);
        if (this.lastResult) {
            // Notify subscribe of last result (i.e. initial state)
            onChange.result(this.lastResult);
        }
    };
    AbstractResource.prototype.unsubscribe = function (onChange) {
        this.listeners.delete(onChange);
    };
    AbstractResource.prototype.notifyResult = function (result) {
        this.listeners.forEach(function (onChange) {
            onChange.result(result);
        });
    };
    AbstractResource.prototype.notifyError = function (error) {
        this.listeners.forEach(function (onChange) {
            if (onChange.error) {
                onChange.error(error);
            }
        });
    };
    AbstractResource.prototype.notifyInfo = function (info) {
        this.listeners.forEach(function (onChange) {
            if (onChange.info) {
                onChange.info(info);
            }
        });
    };
    AbstractResource.prototype.notifyNotReady = function () {
        this.listeners.forEach(function (onChange) {
            if (onChange.notReady) {
                onChange.notReady();
            }
        });
    };
    return AbstractResource;
}());
export { AbstractResource };
//# sourceMappingURL=serviceResources.js.map