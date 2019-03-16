import * as tslib_1 from "tslib";
import { rawContentProcessor } from './quote-macro';
// bq. foobarbaz
var BLOCKQUOTE_REGEXP = /^bq\.(.*)/;
export var blockquote = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    var match = input.substring(position).match(BLOCKQUOTE_REGEXP);
    if (!match) {
        return fallback(input, position);
    }
    var _b = tslib_1.__read(match, 2), rawContent = _b[1];
    return rawContentProcessor('', rawContent, match[0].length, schema, context);
};
function fallback(input, position) {
    return {
        type: 'text',
        text: input.substr(position, 1),
        length: 1,
    };
}
//# sourceMappingURL=blockquote.js.map