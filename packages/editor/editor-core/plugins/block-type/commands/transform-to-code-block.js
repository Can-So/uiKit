import { mapSlice } from '../../../utils/slice';
export function transformToCodeBlockAction(state, attrs) {
    var codeBlock = state.schema.nodes.codeBlock;
    if (state.selection.empty) {
        var startOfCodeBlockText = state.selection.$from;
        var parentPos = startOfCodeBlockText.before();
        var end = startOfCodeBlockText.end();
        var slice = mapSlice(state.doc.slice(startOfCodeBlockText.pos, end), function (node) {
            if (node.type === state.schema.nodes.hardBreak) {
                return state.schema.text('\n');
            }
            if (node.isText) {
                return node.mark([]);
            }
            else if (node.isInline) {
                return node.attrs.text ? state.schema.text(node.attrs.text) : null;
            }
            else {
                return node.content.childCount ? node.content : null;
            }
        });
        var tr = state.tr.replaceRange(startOfCodeBlockText.pos, end, slice);
        // If our offset isnt at 3 (backticks) at the start of line, cater for content.
        if (startOfCodeBlockText.parentOffset >= 3) {
            return tr.split(startOfCodeBlockText.pos, undefined, [
                { type: codeBlock, attrs: attrs },
            ]);
        }
        return tr.setNodeMarkup(parentPos, codeBlock, attrs);
    }
    return state.tr;
}
export function isConvertableToCodeBlock(state) {
    // Before a document is loaded, there is no selection.
    if (!state.selection) {
        return false;
    }
    var $from = state.selection.$from;
    var node = $from.parent;
    if (!node.isTextblock || node.type === state.schema.nodes.codeBlock) {
        return false;
    }
    var parentDepth = $from.depth - 1;
    var parentNode = $from.node(parentDepth);
    var index = $from.index(parentDepth);
    return parentNode.canReplaceWith(index, index + 1, state.schema.nodes.codeBlock);
}
//# sourceMappingURL=transform-to-code-block.js.map