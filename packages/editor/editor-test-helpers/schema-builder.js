import * as tslib_1 from "tslib";
import { Fragment, Node, Slice, } from 'prosemirror-model';
import matches from './matches';
import sampleSchema from './schema';
/**
 * ProseMirror doesn't support empty text nodes, which can be quite
 * inconvenient when you want to capture a position ref without introducing
 * text.
 *
 * Take a couple of examples:
 *
 *     p('{<>}')
 *     p('Hello ', '{<>}', 'world!')
 *
 * After the ref syntax is stripped you're left with:
 *
 *     p('')
 *     p('Hello ', '', 'world!')
 *
 * This violates the rule of text nodes being non-empty. This class solves the
 * problem by providing an alternative data structure that *only* stores refs,
 * and can be used in scenarios where an empty text would be forbidden.
 *
 * This is done under the hood when using `text()` factory, and instead of
 * always returning a text node, it'll instead return one of two things:
 *
 * - a text node -- when given a non-empty string
 * - a refs tracker -- when given a string that *only* contains refs.
 */
var RefsTracker = /** @class */ (function () {
    function RefsTracker() {
    }
    return RefsTracker;
}());
export { RefsTracker };
/**
 * Create a text node.
 *
 * Special markers called "refs" can be put in the text. Refs provide a way to
 * declaratively describe a position within some text, and then access the
 * position in the resulting node.
 */
export function text(value, schema) {
    var e_1, _a;
    var stripped = '';
    var textIndex = 0;
    var refs = {};
    // Helpers
    var isEven = function (n) { return n % 2 === 0; };
    try {
        for (var _b = tslib_1.__values(matches(value, /([\\]+)?{(\w+|<|>|<>|<cell|cell>)}/g)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var match = _c.value;
            var _d = tslib_1.__read(match, 3), refToken = _d[0], skipChars = _d[1], refName = _d[2];
            var index = match.index;
            var skipLen = skipChars && skipChars.length;
            if (skipLen) {
                if (isEven(skipLen)) {
                    index += skipLen / 2;
                }
                else {
                    stripped += value.slice(textIndex, index + (skipLen - 1) / 2);
                    stripped += value.slice(index + skipLen, index + refToken.length);
                    textIndex = index + refToken.length;
                    continue;
                }
            }
            stripped += value.slice(textIndex, index);
            refs[refName] = stripped.length;
            textIndex = match.index + refToken.length;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    stripped += value.slice(textIndex);
    var node = stripped === '' ? new RefsTracker() : schema.text(stripped);
    node.refs = refs;
    return node;
}
/**
 * Offset ref position values by some amount.
 */
export function offsetRefs(refs, offset) {
    var result = {};
    for (var name_1 in refs) {
        result[name_1] = refs[name_1] + offset;
    }
    return result;
}
/**
 * Given a collection of nodes, sequence them in an array and return the result
 * along with the updated refs.
 */
export function sequence() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    var e_2, _a;
    var position = 0;
    var refs = {};
    var nodes = [];
    // It's bizarre that this is necessary. An if/else in the for...of should have
    // sufficient but it did not work at the time of writing.
    var isRefsTracker = function (n) { return n instanceof RefsTracker; };
    var isRefsNode = function (n) { return !isRefsTracker(n); };
    try {
        for (var content_1 = tslib_1.__values(content), content_1_1 = content_1.next(); !content_1_1.done; content_1_1 = content_1.next()) {
            var node = content_1_1.value;
            if (isRefsTracker(node)) {
                refs = tslib_1.__assign({}, refs, offsetRefs(node.refs, position));
            }
            if (isRefsNode(node)) {
                var thickness = node.isText ? 0 : 1;
                refs = tslib_1.__assign({}, refs, offsetRefs(node.refs, position + thickness));
                position += node.nodeSize;
                nodes.push(node);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (content_1_1 && !content_1_1.done && (_a = content_1.return)) _a.call(content_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return { nodes: nodes, refs: refs };
}
/**
 * Given a jagged array, flatten it down to a single level.
 */
export function flatten(deep) {
    var e_3, _a;
    var flat = [];
    try {
        for (var deep_1 = tslib_1.__values(deep), deep_1_1 = deep_1.next(); !deep_1_1.done; deep_1_1 = deep_1.next()) {
            var item = deep_1_1.value;
            if (Array.isArray(item)) {
                flat.splice.apply(flat, tslib_1.__spread([flat.length, 0], item));
            }
            else {
                flat.push(item);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (deep_1_1 && !deep_1_1.done && (_a = deep_1.return)) _a.call(deep_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return flat;
}
/**
 * Coerce builder content into ref nodes.
 */
export function coerce(content, schema) {
    var refsContent = content.map(function (item) {
        return typeof item === 'string' ? text(item, schema) : item(schema);
    });
    return sequence.apply(void 0, tslib_1.__spread(flatten(refsContent)));
}
/**
 * Create a factory for nodes.
 */
export function nodeFactory(type, attrs, marks) {
    if (attrs === void 0) { attrs = {}; }
    return function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        return function (schema) {
            var _a = coerce(content, schema), nodes = _a.nodes, refs = _a.refs;
            var nodeBuilder = schema.nodes[type.name];
            if (!nodeBuilder) {
                throw new Error("Node: \"" + type.name + "\" doesn't exist in schema. It's usually caused by lacking of a plugin that contributes this node. Schema contains following nodes: " + Object.keys(schema.nodes).join(', '));
            }
            var node = nodeBuilder.createChecked(attrs, nodes, marks);
            node.refs = refs;
            return node;
        };
    };
}
/**
 * Create a factory for marks.
 */
export function markFactory(type, attrs, allowDupes) {
    if (attrs === void 0) { attrs = {}; }
    if (allowDupes === void 0) { allowDupes = false; }
    return function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        return function (schema) {
            var markBuilder = schema.marks[type.name];
            if (!markBuilder) {
                throw new Error("Mark: \"" + type.name + "\" doesn't exist in schema. It's usually caused by lacking of a plugin that contributes this mark. Schema contains following marks: " + Object.keys(schema.marks).join(', '));
            }
            var mark = markBuilder.create(attrs);
            var nodes = coerce(content, schema).nodes;
            return nodes.map(function (node) {
                if (!allowDupes && mark.type.isInSet(node.marks)) {
                    return node;
                }
                else {
                    var refNode = node.mark(mark.addToSet(node.marks));
                    refNode.refs = node.refs;
                    return refNode;
                }
            });
        };
    };
}
export var fragment = function () {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    return flatten(content);
};
export var slice = function () {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    return new Slice(Fragment.from(coerce(content, sampleSchema).nodes), 0, 0);
};
/**
 * Builds a 'clean' version of the nodes, without Refs or RefTrackers
 */
export var clean = function (content) { return function (schema) {
    var node = content(schema);
    if (Array.isArray(node)) {
        return node.reduce(function (acc, next) {
            if (next instanceof Node) {
                acc.push(Node.fromJSON(schema, next.toJSON()));
            }
            return acc;
        }, []);
    }
    return node instanceof Node
        ? Node.fromJSON(schema, node.toJSON())
        : undefined;
}; };
//
// Nodes
//
export var doc = nodeFactory(sampleSchema.nodes.doc, {});
export var p = nodeFactory(sampleSchema.nodes.paragraph, {});
export var blockquote = nodeFactory(sampleSchema.nodes.blockquote, {});
export var h1 = nodeFactory(sampleSchema.nodes.heading, { level: 1 });
export var h2 = nodeFactory(sampleSchema.nodes.heading, { level: 2 });
export var h3 = nodeFactory(sampleSchema.nodes.heading, { level: 3 });
export var h4 = nodeFactory(sampleSchema.nodes.heading, { level: 4 });
export var h5 = nodeFactory(sampleSchema.nodes.heading, { level: 5 });
export var h6 = nodeFactory(sampleSchema.nodes.heading, { level: 6 });
export var li = nodeFactory(sampleSchema.nodes.listItem, {});
export var ul = nodeFactory(sampleSchema.nodes.bulletList, {});
export var ol = nodeFactory(sampleSchema.nodes.orderedList, {});
export var br = nodeFactory(sampleSchema.nodes.hardBreak, {});
export var hr = nodeFactory(sampleSchema.nodes.rule, {});
export var panel = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return nodeFactory(sampleSchema.nodes.panel, attrs);
};
export var panelNote = panel({ panelType: 'note' });
export var hardBreak = nodeFactory(sampleSchema.nodes.hardBreak, {});
export var code_block = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return nodeFactory(sampleSchema.nodes.codeBlock, attrs);
};
export var img = function (attrs) {
    return nodeFactory(sampleSchema.nodes.image, attrs);
};
export var emoji = function (attrs) {
    var emojiNodeAttrs = {
        shortName: attrs.shortName,
        id: attrs.id,
        text: attrs.text || attrs.fallback,
    };
    return nodeFactory(sampleSchema.nodes.emoji, emojiNodeAttrs);
};
export var mention = function (attrs) {
    return nodeFactory(sampleSchema.nodes.mention, attrs);
};
export var table = function (attrs) {
    return nodeFactory(sampleSchema.nodes.table, attrs);
};
export var tr = nodeFactory(sampleSchema.nodes.tableRow, {});
export var td = function (attrs) {
    return nodeFactory(sampleSchema.nodes.tableCell, attrs);
};
export var th = function (attrs) {
    return nodeFactory(sampleSchema.nodes.tableHeader, attrs);
};
export var tdEmpty = td()(p(''));
export var thEmpty = th()(p(''));
export var tdCursor = td()(p('{<>}'));
export var thCursor = th()(p('{<>}'));
export var decisionList = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return nodeFactory(sampleSchema.nodes.decisionList, attrs);
};
export var decisionItem = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return nodeFactory(sampleSchema.nodes.decisionItem, attrs);
};
export var taskList = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return nodeFactory(sampleSchema.nodes.taskList, attrs);
};
export var taskItem = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    return nodeFactory(sampleSchema.nodes.taskItem, attrs);
};
export var confluenceUnsupportedBlock = function (cxhtml) {
    return nodeFactory(sampleSchema.nodes.confluenceUnsupportedBlock, { cxhtml: cxhtml })();
};
export var confluenceUnsupportedInline = function (cxhtml) {
    return nodeFactory(sampleSchema.nodes.confluenceUnsupportedInline, { cxhtml: cxhtml })();
};
export var confluenceJiraIssue = function (attrs) { return nodeFactory(sampleSchema.nodes.confluenceJiraIssue, attrs); };
export var inlineExtension = function (attrs) { return nodeFactory(sampleSchema.nodes.inlineExtension, attrs); };
export var extension = function (attrs) { return nodeFactory(sampleSchema.nodes.extension, attrs); };
export var bodiedExtension = function (attrs) { return nodeFactory(sampleSchema.nodes.bodiedExtension, attrs); };
export var date = function (attrs) {
    return nodeFactory(sampleSchema.nodes.date, attrs)();
};
export var status = function (attrs) { return nodeFactory(sampleSchema.nodes.status, attrs)(); };
export var mediaSingle = function (attrs) {
    if (attrs === void 0) { attrs = { layout: 'center' }; }
    return nodeFactory(sampleSchema.nodes.mediaSingle, attrs);
};
export var mediaGroup = nodeFactory(sampleSchema.nodes.mediaGroup);
export var media = function (attrs) {
    return nodeFactory(sampleSchema.nodes.media, attrs);
};
export var applicationCard = function (attrs) {
    return nodeFactory(sampleSchema.nodes.applicationCard, attrs);
};
export var placeholder = function (attrs) {
    return nodeFactory(sampleSchema.nodes.placeholder, attrs)();
};
export var layoutSection = nodeFactory(sampleSchema.nodes.layoutSection);
export var layoutColumn = function (attrs) {
    return nodeFactory(sampleSchema.nodes.layoutColumn, attrs);
};
export var inlineCard = function (attrs) {
    return nodeFactory(sampleSchema.nodes.inlineCard, attrs);
};
export var blockCard = function (attrs) {
    return nodeFactory(sampleSchema.nodes.blockCard, attrs);
};
export var unsupportedInline = function (attrs) {
    return nodeFactory(sampleSchema.nodes.unsupportedInline, attrs);
};
export var unsupportedBlock = function (attrs) {
    return nodeFactory(sampleSchema.nodes.unsupportedBlock, attrs);
};
//
// Marks
//
export var em = markFactory(sampleSchema.marks.em, {});
export var subsup = function (attrs) {
    return markFactory(sampleSchema.marks.subsup, attrs);
};
export var underline = markFactory(sampleSchema.marks.underline, {});
export var strong = markFactory(sampleSchema.marks.strong, {});
export var code = markFactory(sampleSchema.marks.code, {});
export var strike = markFactory(sampleSchema.marks.strike, {});
export var a = function (attrs) {
    return markFactory(sampleSchema.marks.link, attrs);
};
export var emojiQuery = markFactory(sampleSchema.marks.emojiQuery, {});
export var typeAheadQuery = function (attrs) {
    if (attrs === void 0) { attrs = { trigger: '', query: '' }; }
    return markFactory(sampleSchema.marks.typeAheadQuery, attrs);
};
export var textColor = function (attrs) {
    return markFactory(sampleSchema.marks.textColor, attrs);
};
export var confluenceInlineComment = function (attrs) {
    return markFactory(sampleSchema.marks.confluenceInlineComment, attrs ? attrs : {}, true);
};
//
// Block Marks
//
export var alignment = function (attrs) {
    return markFactory(sampleSchema.marks.alignment, attrs);
};
export var breakout = function (attrs) {
    return markFactory(sampleSchema.marks.breakout, attrs);
};
export var indentation = function (attrs) {
    return markFactory(sampleSchema.marks.indentation, attrs);
};
//# sourceMappingURL=schema-builder.js.map