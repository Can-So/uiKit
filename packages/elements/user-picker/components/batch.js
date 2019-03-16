export function batchByKey(callback) {
    var calls = {};
    return function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!calls[key]) {
            window.setTimeout(function () {
                callback(key, calls[key]);
                delete calls[key];
            });
            calls[key] = [];
        }
        calls[key].push(args);
    };
}
//# sourceMappingURL=batch.js.map