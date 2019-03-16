import { keymap } from 'prosemirror-keymap';
import { setTextSelection } from 'prosemirror-utils';
// Somewhat broken and subverted: https://product-fabric.atlassian.net/browse/ED-6504
export function keymapPlugin() {
    var deleteCurrentItem = function ($from, tr) {
        return tr.delete($from.before($from.depth) - 1, $from.end($from.depth) + 1);
    };
    var keymaps = {
        Backspace: function (state, dispatch) {
            var selection = state.selection, nodes = state.schema.nodes, tr = state.tr;
            var panel = nodes.panel;
            var $from = selection.$from, $to = selection.$to;
            // Don't do anything if selection is a range
            if ($from.pos !== $to.pos) {
                return false;
            }
            // If not at the start of a panel, no joining will happen so allow default behaviour (backspacing characters etc..)
            if ($from.parentOffset !== 0) {
                return false;
            }
            var previousPos = tr.doc.resolve(Math.max(0, $from.before($from.depth) - 1));
            var previousNodeType = previousPos.pos > 0 && previousPos.parent && previousPos.parent.type;
            var parentNodeType = $from.parent.type;
            var isPreviousNodeAPanel = previousNodeType === panel;
            var isParentNodeAPanel = parentNodeType === panel;
            // Stops merging panels when deleting empty paragraph in between
            if (isPreviousNodeAPanel && !isParentNodeAPanel) {
                var content = $from.node($from.depth).content;
                var insertPos = previousPos.pos - 1;
                deleteCurrentItem($from, tr).insert(insertPos, content);
                if (dispatch) {
                    dispatch(setTextSelection(insertPos)(tr).scrollIntoView());
                }
                return true;
            }
            var nodeType = $from.node().type;
            if (nodeType !== panel) {
                return false;
            }
            return true;
        },
    };
    return keymap(keymaps);
}
export default keymapPlugin;
//# sourceMappingURL=keymaps.js.map