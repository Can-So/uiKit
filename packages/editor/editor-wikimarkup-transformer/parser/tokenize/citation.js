import * as tslib_1 from "tslib";
import { TokenType } from './';
import { hasAnyOfMarks } from '../utils/text';
import { commonFormatter } from './common-formatter';
import { parseString } from '../text';
import { EM_DASH } from '../../char';
export var citation = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    /**
     * The following token types will be ignored in parsing
     * the content
     */
    var ignoreTokenTypes = [
        TokenType.DOUBLE_DASH_SYMBOL,
        TokenType.TRIPLE_DASH_SYMBOL,
        TokenType.QUADRUPLE_DASH_SYMBOL,
        TokenType.ISSUE_KEY,
    ];
    // Add code mark to each text
    var contentDecorator = function (n, index) {
        var mark = schema.marks.em.create();
        // We don't want to mix `code` mark with others
        if (n.type.name === 'text' && !hasAnyOfMarks(n, ['em', 'code'])) {
            if (index === 0) {
                n.text = EM_DASH + " " + n.text;
            }
            return n.mark(tslib_1.__spread(n.marks, [mark]));
        }
        return n;
    };
    var rawContentProcessor = function (raw, length) {
        var content = parseString({
            ignoreTokenTypes: ignoreTokenTypes,
            schema: schema,
            context: context,
            input: raw,
        });
        var decoratedContent = content.map(contentDecorator);
        return {
            type: 'pmnode',
            nodes: decoratedContent,
            length: length,
        };
    };
    return commonFormatter(input, position, schema, {
        opening: '??',
        closing: '??',
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
//# sourceMappingURL=citation.js.map