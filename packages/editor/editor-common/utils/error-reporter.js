var ErrorReporter = /** @class */ (function () {
    function ErrorReporter() {
        this.handlerStorage = null;
    }
    ErrorReporter.prototype.captureMessage = function (msg, tags) {
        if (this.handlerStorage) {
            this.handlerStorage.captureMessage(msg, tags);
        }
    };
    ErrorReporter.prototype.captureException = function (err, tags) {
        if (this.handlerStorage) {
            this.handlerStorage.captureException(err, tags);
        }
    };
    Object.defineProperty(ErrorReporter.prototype, "handler", {
        set: function (handler) {
            this.handlerStorage = handler;
        },
        enumerable: true,
        configurable: true
    });
    return ErrorReporter;
}());
export default ErrorReporter;
//# sourceMappingURL=error-reporter.js.map