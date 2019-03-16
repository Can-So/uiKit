import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { trackAndInvoke } from '../../../analytics';
import * as commands from '../commands/text-formatting';
export default function keymapPlugin(schema) {
    var list = {};
    if (schema.marks.strong) {
        var eventName = analyticsEventName(schema.marks.strong);
        keymaps.bindKeymapWithCommand(keymaps.toggleBold.common, trackAndInvoke(eventName, commands.toggleStrongWithAnalytics({
            inputMethod: "shortcut" /* SHORTCUT */,
        })), list);
    }
    if (schema.marks.em) {
        var eventName = analyticsEventName(schema.marks.em);
        keymaps.bindKeymapWithCommand(keymaps.toggleItalic.common, trackAndInvoke(eventName, commands.toggleEmWithAnalytics({ inputMethod: "shortcut" /* SHORTCUT */ })), list);
    }
    if (schema.marks.code) {
        var eventName = analyticsEventName(schema.marks.code);
        keymaps.bindKeymapWithCommand(keymaps.toggleCode.common, trackAndInvoke(eventName, commands.toggleCodeWithAnalytics({
            inputMethod: "shortcut" /* SHORTCUT */,
        })), list);
    }
    if (schema.marks.strike) {
        var eventName = analyticsEventName(schema.marks.strike);
        keymaps.bindKeymapWithCommand(keymaps.toggleStrikethrough.common, trackAndInvoke(eventName, commands.toggleStrikeWithAnalytics({
            inputMethod: "shortcut" /* SHORTCUT */,
        })), list);
    }
    if (schema.marks.underline) {
        var eventName = analyticsEventName(schema.marks.underline);
        keymaps.bindKeymapWithCommand(keymaps.toggleUnderline.common, trackAndInvoke(eventName, commands.toggleUnderlineWithAnalytics({
            inputMethod: "shortcut" /* SHORTCUT */,
        })), list);
    }
    return keymap(list);
}
function analyticsEventName(markType) {
    return "atlassian.editor.format." + markType.name + ".keyboard";
}
//# sourceMappingURL=keymap.js.map