var ADFTraversor = /** @class */ (function () {
    function ADFTraversor(doc) {
        this.subscribers = new Map();
        this.doc = doc;
    }
    ADFTraversor.prototype.subscribe = function (type, callback) {
        var callbacks = this.subscribers.get(type);
        if (!callbacks) {
            this.subscribers.set(type, [callback]);
        }
        else {
            callbacks.push(callback);
        }
    };
    ADFTraversor.prototype.exec = function () {
        if (!this.doc || !Array.isArray(this.doc.content)) {
            return;
        }
        var candidates = this.doc.content.slice(0);
        while (candidates.length) {
            var node = candidates.shift();
            if (Array.isArray(node.content)) {
                candidates = candidates.concat(node.content);
            }
            var callbacks = this.subscribers.get(node.type);
            if (!callbacks) {
                continue;
            }
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](node);
            }
        }
    };
    return ADFTraversor;
}());
export default ADFTraversor;
//# sourceMappingURL=traversor.js.map