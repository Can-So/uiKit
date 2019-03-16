import { keymap } from 'prosemirror-keymap';
import { findParentNodeOfTypeClosestToPos, hasParentNodeOfType, } from 'prosemirror-utils';
import { getCursor } from '../../../utils';
export function keymapPlugin(schema) {
    return keymap({
        Backspace: function (state, dispatch) {
            var $cursor = getCursor(state.selection);
            var _a = state.schema.nodes, paragraph = _a.paragraph, codeBlock = _a.codeBlock, listItem = _a.listItem;
            if (!$cursor || $cursor.parent.type !== codeBlock) {
                return false;
            }
            if ($cursor.pos === 1 ||
                (hasParentNodeOfType(listItem)(state.selection) &&
                    $cursor.parentOffset === 0)) {
                var node = findParentNodeOfTypeClosestToPos($cursor, codeBlock);
                if (!node) {
                    return false;
                }
                dispatch(state.tr
                    .setNodeMarkup(node.pos, node.node.type, node.node.attrs, [])
                    .setBlockType($cursor.pos, $cursor.pos, paragraph));
                return true;
            }
            return false;
        },
    });
}
export default keymapPlugin;
//# sourceMappingURL=keymaps.js.map