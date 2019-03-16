import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { trackAndInvoke } from '../../../analytics';
import { isTextSelection } from '../../../utils';
import { indent, outdent } from '../commands';
export function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.indent), trackAndInvoke('atlassian.editor.format.block.indent.keyboard', indent), list);
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.outdent), trackAndInvoke('atlassian.editor.format.block.outdent.keyboard', outdent), list);
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.backspace), trackAndInvoke('atlassian.editor.format.block.outdent.keyboard.alt', function (state, dispatch) {
        var selection = state.selection;
        if (isTextSelection(selection) &&
            selection.$cursor &&
            selection.$cursor.parentOffset === 0) {
            return dispatch ? outdent(state, dispatch) : false;
        }
        return false;
    }), list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map