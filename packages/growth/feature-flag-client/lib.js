export var isType = function (value, type) {
    return value !== null && typeof value === type;
};
export var isObject = function (value) { return isType(value, 'object'); };
export var isBoolean = function (value) { return isType(value, 'boolean'); };
export var isString = function (value) { return isType(value, 'string'); };
export var isFlagWithEvaluationDetails = function (flag) {
    return isObject(flag) && 'value' in flag && 'explanation' in flag;
};
export var isSimpleFlag = function (flag) {
    return isObject(flag) && 'value' in flag && !('explanation' in flag);
};
export var isOneOf = function (value, list) {
    return list.indexOf(value) > -1;
};
export var enforceAttributes = function (obj, attributes, identifier) {
    var title = identifier ? identifier + ": " : '';
    attributes.forEach(function (attribute) {
        if (!obj.hasOwnProperty(attribute) && obj[attribute] !== null) {
            throw new Error(title + "Missing " + attribute);
        }
    });
};
var validateFlag = function (flagKey, flag) {
    if (isSimpleFlag(flag) || isFlagWithEvaluationDetails(flag)) {
        return true;
    }
    // @ts-ignore
    if (process.env !== 'production') {
        throw new Error(flagKey + " is not a valid flag. Missing \"value\" attribute.");
    }
};
export var validateFlags = function (flags) {
    Object.keys(flags).forEach(function (key) { return validateFlag(key, flags[key]); });
};
//# sourceMappingURL=lib.js.map