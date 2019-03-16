import * as tslib_1 from "tslib";
export var padArray = function (arr, size, value) {
    if (size === 0) {
        return arr;
    }
    var gap = new Array(size);
    gap.fill(value);
    return arr.length > 0 ? tslib_1.__spread(arr, gap) : gap;
};
//# sourceMappingURL=index.js.map