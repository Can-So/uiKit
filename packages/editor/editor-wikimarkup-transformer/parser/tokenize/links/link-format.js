import { resolveLink } from './link-resolver';
import { parseContentLink } from './link-parser';
// [http://www.example.com] and [Example|http://www.example.com]
var LINK_FORMAT_REGEXP = /^\[([^\[\]\n]+)]/;
export var linkFormat = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    var match = input.substring(position).match(LINK_FORMAT_REGEXP);
    if (!match) {
        return fallback();
    }
    var content = parseContentLink(match[1]);
    return resolveLink(content, schema, context);
};
function fallback() {
    return {
        type: 'text',
        text: '[',
        length: 1,
    };
}
//# sourceMappingURL=link-format.js.map