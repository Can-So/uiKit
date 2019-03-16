var MULTI_DASH_REGEX = /^-{4,}(\s|$)/;
export var quadrupleDashSymbol = function (_a) {
    var input = _a.input, position = _a.position;
    // This won't be a ruler because ruler has been checked at leadingKeywordMapping
    var match = input.substring(position).match(MULTI_DASH_REGEX);
    if (!match) {
        return {
            type: 'text',
            text: '----',
            length: 4,
        };
    }
    return {
        type: 'text',
        text: input.substr(position, match[0].length),
        length: match[0].length,
    };
};
//# sourceMappingURL=quadruple-dash-symbol.js.map