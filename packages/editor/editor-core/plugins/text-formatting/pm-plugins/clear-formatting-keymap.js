import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { trackAndInvoke } from '../../../analytics';
import { clearFormattingWithAnalytics } from '../commands/clear-formatting';
export function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.clearFormatting.common, trackAndInvoke('atlassian.editor.format.clear.keyboard', clearFormattingWithAnalytics("shortcut" /* SHORTCUT */)), list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=clear-formatting-keymap.js.map