import * as tslib_1 from "tslib";
import { coerce, offsetRefs } from './schema-builder';
/**
 * Replace the given range, or the selection if no range is given, with a text node containing the given string
 */
export function insertText(view, text, from, to) {
    var pos = from;
    text.split('').forEach(function (character, index) {
        if (!view.someProp('handleTextInput', function (f) {
            return f(view, pos + index, pos + index, character);
        })) {
            view.dispatch(view.state.tr.insertText(character, pos + index, pos + index));
        }
    });
}
var processText = function (schema, content) {
    return coerce(content, schema);
};
var processNodeMark = function (schema, content) {
    var nodes = content(schema);
    var refs = []
        .concat(nodes)
        .reduce(function (acc, node) { return (tslib_1.__assign({}, acc, node.refs)); }, {});
    return { nodes: nodes, refs: refs };
};
/**
 * Replace the current selection with the given content, which may be a fragment, node, or array of nodes.
 *
 * @returns refs from the inserted nodes, made relative to the document
 *   insertion position
 */
export function insert(view, content) {
    var state = view.state;
    var _a = state.selection, from = _a.from, to = _a.to;
    var _b = Array.isArray(content)
        ? processText(state.schema, content)
        : processNodeMark(state.schema, content), nodes = _b.nodes, refs = _b.refs;
    var tr = state.tr.replaceWith(from, to, nodes);
    view.dispatch(tr);
    return offsetRefs(refs, from);
}
//# sourceMappingURL=transactions.js.map