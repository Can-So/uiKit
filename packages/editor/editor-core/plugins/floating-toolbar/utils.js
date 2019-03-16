export var shallowEqual = function (objA, objB) {
    if (objA === objB) {
        return true;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var idx = 0; idx < keysA.length; idx++) {
        var key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        if (objA[key] !== objB[key]) {
            return false;
        }
    }
    return true;
};
export var compareArrays = function (left, right) {
    if (left.length !== right.length) {
        return false;
    }
    for (var idx = 0; idx < left.length; idx++) {
        if (!shallowEqual(left[idx], right[idx])) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=utils.js.map