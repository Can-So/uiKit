import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { isEmptyNode } from '../../../utils';
/**
 * When there's any empty block before another paragraph with wrap-right
 * mediaSingle. Pressing backspace at the start of the paragraph will select
 * the media but visually it makes more sense to remove the empty paragraph.
 *
 * Structure of the document: doc(block(), mediaSingle(media()), paragraph('{<>}hello!'))
 * But, visually it looks like the following:
 *
 * [empty block] <- Remove this block
 * [Cursor] x x x x x x x x  +---------------+
 * x x x x x x x x x x       |  mediaSingle  |
 * x x x x x.                +---------------+
 */
var maybeRemoveMediaSingleNode = function (schema) {
    var isEmptyNodeInSchema = isEmptyNode(schema);
    return function (state, dispatch) {
        var selection = state.selection;
        // Check if we have a structure like
        // anyBlock[empty] > mediaSingle[wrap-right] > [selection{empty, at start}]
        if (!selection.empty) {
            return false;
        }
        var $from = selection.$from;
        var doc = state.doc;
        var index = $from.index($from.depth - 1);
        if ($from.parentOffset > 0) {
            return false;
        }
        var maybeMediaSingle = doc.maybeChild(index - 1);
        if (!maybeMediaSingle ||
            maybeMediaSingle.type !== schema.nodes.mediaSingle ||
            maybeMediaSingle.attrs.layout !== 'wrap-right') {
            return false;
        }
        var maybeAnyBlock = doc.maybeChild(index - 2);
        if (!maybeAnyBlock || !isEmptyNodeInSchema(maybeAnyBlock)) {
            return false;
        }
        var tr = state.tr.replace(index - 2, maybeAnyBlock.nodeSize);
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
};
export function keymapPlugin(schema) {
    var list = {};
    var removeMediaSingleCommand = maybeRemoveMediaSingleNode(schema);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, removeMediaSingleCommand, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap-media-single.js.map