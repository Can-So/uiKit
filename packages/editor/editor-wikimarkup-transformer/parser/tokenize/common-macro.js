import * as tslib_1 from "tslib";
export function commonMacro(input, schema, opt) {
    /**
     * Forging the opening regex, the result would look something like
     * /^\{(quote)(?::([^\{\n\}]*))?\}/i
     */
    var opening = new RegExp("^{(" + opt.keyword + ")(?::([^{\n}]*))?}", 'i');
    var matchOpening = input.match(opening);
    if (!matchOpening) {
        return fallback(input);
    }
    var _a = tslib_1.__read(matchOpening, 3), name = _a[1], rawAttrs = _a[2];
    var openingLength = matchOpening[0].length;
    if (!opt.paired) {
        /**
         * Some macros do not have a closing symbol, for example
         * {anchor:here} {loremipsum}
         */
        return opt.rawContentProcessor(rawAttrs, '', openingLength, schema, opt.context);
    }
    /**
     * Forging the closing regex, the result would look something like
     * /\{quote\}/
     */
    var closing = new RegExp("{" + name + "}");
    var matchClosing = closing.exec(input.substring(openingLength));
    var rawContent = '';
    if (matchClosing) {
        rawContent = input.substring(openingLength, openingLength + matchClosing.index);
    }
    var length = matchClosing
        ? openingLength + matchClosing.index + matchClosing[0].length
        : openingLength;
    return opt.rawContentProcessor(rawAttrs, rawContent, length, schema, opt.context);
}
function fallback(input) {
    return {
        type: 'text',
        text: input.substr(0, 1),
        length: 1,
    };
}
//# sourceMappingURL=common-macro.js.map