import * as tslib_1 from "tslib";
import { TokenType } from '.';
import { commonMacro } from './common-macro';
import { parseAttrs } from '../utils/attrs';
import { parseString } from '../text';
import { getEditorColor } from '../color';
import { hasAnyOfMarks } from '../utils/text';
export var colorMacro = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    return commonMacro(input.substring(position), schema, {
        keyword: 'color',
        paired: true,
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
var rawContentProcessor = function (rawAttrs, rawContent, length, schema, context) {
    var ignoreTokenTypes = [
        TokenType.DOUBLE_DASH_SYMBOL,
        TokenType.TRIPLE_DASH_SYMBOL,
        TokenType.QUADRUPLE_DASH_SYMBOL,
        TokenType.ISSUE_KEY,
    ];
    var parsedAttrs = parseAttrs(rawAttrs);
    var content = parseString({
        ignoreTokenTypes: ignoreTokenTypes,
        schema: schema,
        context: context,
        input: rawContent,
    });
    var decoratedContent = content.map(function (n) {
        var mark = schema.marks.textColor.create({
            color: getEditorColor(parsedAttrs) || '#000000',
        });
        // We don't want to mix `code` mark with others
        if (n.type.name === 'text' && !hasAnyOfMarks(n, ['textColor', 'code'])) {
            return n.mark(tslib_1.__spread(n.marks, [mark]));
        }
        return n;
    });
    return {
        type: 'pmnode',
        nodes: decoratedContent,
        length: length,
    };
};
//# sourceMappingURL=color-macro.js.map