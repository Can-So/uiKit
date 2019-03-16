import { chainCommands } from 'prosemirror-commands';
import { undoInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import { redo, undo } from 'prosemirror-history';
import * as keymaps from '../../../keymaps';
import * as commands from '../../../commands';
import { trackAndInvoke } from '../../../analytics';
import * as blockTypes from '../types';
import { cleanUpAtTheStartOfDocument, insertBlockTypesWithAnalytics, } from '../../block-type/commands';
var analyticsEventName = function (blockTypeName, eventSource) {
    return "atlassian.editor.format." + blockTypeName + "." + eventSource;
};
var tryUndoInputRuleElseUndoHistory = chainCommands(undoInputRule, undo);
export default function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, trackAndInvoke('atlassian.editor.newline.keyboard', commands.insertNewLineWithAnalytics), list);
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, trackAndInvoke('atlassian.editor.moveup.keyboard', commands.createNewParagraphAbove), list);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, trackAndInvoke('atlassian.editor.movedown.keyboard', commands.createNewParagraphBelow), list);
    keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redo), trackAndInvoke('atlassian.editor.redo.keyboard', redo), list);
    keymaps.bindKeymapWithCommand(keymaps.undo.common, trackAndInvoke('atlassian.editor.undo.keyboard', tryUndoInputRuleElseUndoHistory), list);
    keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redoBarred), commands.preventDefault(), list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, cleanUpAtTheStartOfDocument, list);
    [
        blockTypes.NORMAL_TEXT,
        blockTypes.HEADING_1,
        blockTypes.HEADING_2,
        blockTypes.HEADING_3,
        blockTypes.HEADING_4,
        blockTypes.HEADING_5,
        blockTypes.HEADING_6,
        blockTypes.BLOCK_QUOTE,
    ].forEach(function (blockType) {
        if (schema.nodes[blockType.nodeName]) {
            var shortcut = keymaps.findShortcutByDescription(blockType.title.defaultMessage);
            if (shortcut) {
                var eventName = analyticsEventName(blockType.name, "keyboard" /* KEYBOARD */);
                keymaps.bindKeymapWithCommand(shortcut, trackAndInvoke(eventName, insertBlockTypesWithAnalytics(blockType.name, "keyboard" /* KEYBOARD */)), list);
            }
        }
    });
    return keymap(list);
}
//# sourceMappingURL=keymap.js.map