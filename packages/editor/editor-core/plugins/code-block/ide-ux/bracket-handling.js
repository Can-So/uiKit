var BRACKET_MAP = {
    '{': '}',
    '[': ']',
    '(': ')',
};
export var getAutoClosingBracketInfo = function (before, after) {
    var left = Object.keys(BRACKET_MAP).find(function (item) {
        return before.endsWith(item);
    });
    var right = left ? BRACKET_MAP[left] : undefined;
    var hasTrailingMatchingBracket = right ? after.startsWith(right) : false;
    return { left: left, right: right, hasTrailingMatchingBracket: hasTrailingMatchingBracket };
};
export var isCursorBeforeClosingBracket = function (after) {
    return Object.keys(BRACKET_MAP).some(function (leftBracket) {
        return after.startsWith(BRACKET_MAP[leftBracket]);
    });
};
export var isClosingBracket = function (text) {
    return Object.keys(BRACKET_MAP).some(function (leftBracket) { return text === BRACKET_MAP[leftBracket]; });
};
//# sourceMappingURL=bracket-handling.js.map