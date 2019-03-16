import * as tslib_1 from "tslib";
import { commonMacro } from './common-macro';
import { hasAnyOfMarks } from '../utils/text';
import { normalizePMNodes } from '../utils/normalize';
import { parseString } from '../text';
export var quoteMacro = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    return commonMacro(input.substring(position), schema, {
        keyword: 'quote',
        paired: true,
        rawContentProcessor: rawContentProcessor,
        context: context,
    });
};
export var rawContentProcessor = function (rawAttrs, rawContent, length, schema, context) {
    if (!rawContent.length) {
        var emptyQuote = emptyBlockquote(schema);
        return {
            type: 'pmnode',
            nodes: [emptyQuote],
            length: length,
        };
    }
    var parsedContent = parseString({
        schema: schema,
        context: context,
        ignoreTokenTypes: [],
        input: rawContent,
    });
    var normalizedContent = normalizePMNodes(parsedContent, schema);
    return {
        type: 'pmnode',
        nodes: sanitize(normalizedContent, schema),
        length: length,
    };
};
function emptyBlockquote(schema) {
    var p = schema.nodes.paragraph.createChecked({}, []);
    return schema.nodes.blockquote.createChecked({}, p);
}
function sanitize(nodes, schema) {
    var e_1, _a;
    var output = [];
    var contentBuffer = [];
    try {
        for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
            var n = nodes_1_1.value;
            switch (n.type.name) {
                case 'paragraph': {
                    /**
                     * blockquote is happy with paragraph
                     */
                    contentBuffer.push(n);
                    break;
                }
                case 'heading': {
                    /**
                     * If a heading is inside a list item
                     * - h1. Bold, Uppercase
                     * - h2. Bold, Italic
                     * - h3. Bold
                     * - h4. Bold, Gray
                     * - h5. Gray, Italic
                     * - h6. Gray
                     */
                    contentBuffer.push(transformHeading(n, schema));
                    break;
                }
                default:
                    /**
                     * Anything else should be lifted
                     */
                    if (contentBuffer.length) {
                        var blockquote = schema.nodes.blockquote.createChecked({}, contentBuffer);
                        output.push(blockquote);
                        contentBuffer = [];
                    }
                    output.push(n);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (contentBuffer.length) {
        var blockquote = schema.nodes.blockquote.createChecked({}, contentBuffer);
        output.push(blockquote);
    }
    return output;
}
function transformHeading(heading, schema) {
    var contentBuffer = [];
    heading.content.forEach(function (n) {
        var strong = schema.marks.strong.create();
        var italic = schema.marks.em.create();
        var gray = schema.marks.textColor.create({ color: '#97a0af' });
        if (n.type.name === 'text') {
            if (n.text && heading.attrs.level === 1) {
                n.text = n.text.toUpperCase();
            }
            if (heading.attrs.level <= 4 && !hasAnyOfMarks(n, ['strong', 'code'])) {
                n = n.mark(tslib_1.__spread(n.marks, [strong]));
            }
            if ((heading.attrs.level === 5 || heading.attrs.level === 2) &&
                !hasAnyOfMarks(n, ['em', 'code'])) {
                n = n.mark(tslib_1.__spread(n.marks, [italic]));
            }
            if (heading.attrs.level > 3 && !hasAnyOfMarks(n, ['textColor', 'code'])) {
                n = n.mark(tslib_1.__spread(n.marks, [gray]));
            }
        }
        contentBuffer.push(n);
    });
    return schema.nodes.paragraph.createChecked({}, contentBuffer);
}
//# sourceMappingURL=quote-macro.js.map