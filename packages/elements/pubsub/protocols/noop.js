var NoopProtocol = /** @class */ (function () {
    function NoopProtocol() {
    }
    NoopProtocol.prototype.getType = function () {
        return 'noop';
    };
    NoopProtocol.prototype.subscribe = function (_) { };
    NoopProtocol.prototype.unsubscribeAll = function () { };
    NoopProtocol.prototype.getCapabilities = function () {
        return [];
    };
    NoopProtocol.prototype.on = function (_event, _handler) { };
    NoopProtocol.prototype.off = function (_event, _handler) { };
    NoopProtocol.prototype.networkUp = function () { };
    NoopProtocol.prototype.networkDown = function () { };
    return NoopProtocol;
}());
export default NoopProtocol;
//# sourceMappingURL=noop.js.map