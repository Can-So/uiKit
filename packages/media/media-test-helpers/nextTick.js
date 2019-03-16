export var nextTick = function () { return Promise.resolve(); };
export var sleep = function (time) {
    if (time === void 0) { time = 0; }
    return new Promise(function (resolve) { return window.setTimeout(resolve, time); });
};
//# sourceMappingURL=nextTick.js.map