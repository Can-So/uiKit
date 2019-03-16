import { inputRules } from 'prosemirror-inputrules';
import { createInputRule, leafNodeReplacementCharacter, } from '../../../utils/input-rules';
import { emojiPluginKey } from './main';
import { addAnalytics, } from '../../../plugins/analytics';
export function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.emoji && schema.marks.emojiQuery) {
        var regex = new RegExp("(^|[\\s(" + leafNodeReplacementCharacter + "]):$");
        var emojiQueryRule = createInputRule(regex, function (state) {
            var emojisState = emojiPluginKey.getState(state);
            if (!emojisState.emojiProvider) {
                return null;
            }
            if (!emojisState.isEnabled()) {
                return null;
            }
            var mark = schema.mark('emojiQuery');
            var tr = state.tr;
            var emojiText = schema.text(':', [mark]);
            tr = tr.replaceSelectionWith(emojiText, false);
            return addAnalytics(tr, {
                action: "invoked" /* INVOKED */,
                actionSubject: "typeAhead" /* TYPEAHEAD */,
                actionSubjectId: "emojiTypeAhead" /* TYPEAHEAD_EMOJI */,
                attributes: { inputMethod: "keyboard" /* KEYBOARD */ },
                eventType: "ui" /* UI */,
            });
        });
        rules.push(emojiQueryRule);
    }
    if (rules.length !== 0) {
        return inputRules({ rules: rules });
    }
    return;
}
export default inputRulePlugin;
//# sourceMappingURL=input-rules.js.map