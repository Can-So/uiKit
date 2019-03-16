import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { trackAndInvoke } from '../../../analytics';
import { indentList, outdentList, backspaceKeyCommand, enterKeyCommand, toggleListCommandWithAnalytics, } from '../commands';
export function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.toggleOrderedList), trackAndInvoke('atlassian.editor.format.list.numbered.keyboard', toggleListCommandWithAnalytics("keyboard" /* KEYBOARD */, 'orderedList')), list);
    keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.toggleBulletList), trackAndInvoke('atlassian.editor.format.list.bullet.keyboard', toggleListCommandWithAnalytics("keyboard" /* KEYBOARD */, 'bulletList')), list);
    keymaps.bindKeymapWithCommand(keymaps.indentList.common, trackAndInvoke('atlassian.editor.format.list.indent.keyboard', indentList()), list);
    keymaps.bindKeymapWithCommand(keymaps.outdentList.common, trackAndInvoke('atlassian.editor.format.list.outdent.keyboard', outdentList()), list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, enterKeyCommand, list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, backspaceKeyCommand, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map