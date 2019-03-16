import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import * as commands from '../../../commands';
import { trackAndInvoke } from '../../../analytics';
import { withAnalytics, } from '../../analytics';
var insertRuleWithAnalytics = function () {
    return withAnalytics({
        action: "inserted" /* INSERTED */,
        actionSubject: "document" /* DOCUMENT */,
        actionSubjectId: "divider" /* DIVIDER */,
        attributes: { inputMethod: "shortcut" /* SHORTCUT */ },
        eventType: "track" /* TRACK */,
    })(commands.insertRule());
};
export function keymapPlugin(schema) {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.insertRule.common, trackAndInvoke('atlassian.editor.format.horizontalrule.keyboard', insertRuleWithAnalytics()), list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch) {
        return true;
    }, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map