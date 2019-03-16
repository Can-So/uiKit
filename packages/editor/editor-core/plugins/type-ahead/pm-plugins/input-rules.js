import * as tslib_1 from "tslib";
import { inputRules } from 'prosemirror-inputrules';
import { createInputRule, leafNodeReplacementCharacter, } from '../../../utils/input-rules';
import { analyticsService } from '../../../analytics';
import { pluginKey as typeAheadPluginKey, } from './main';
export function inputRulePlugin(schema, typeAheads) {
    var triggersRegex = typeAheads
        .map(function (t) { return t.customRegex || t.trigger; })
        .join('|');
    if (!triggersRegex.length) {
        return;
    }
    var regex = new RegExp("(^|[.!?\\s" + leafNodeReplacementCharacter + "])(" + triggersRegex + ")$");
    var typeAheadInputRule = createInputRule(regex, function (state, match, start, end) {
        var typeAheadState = typeAheadPluginKey.getState(state);
        /**
         * Why using match 2 and 3?  Regex:
         * (allowed characters before trigger)(joined|triggers|(sub capture groups))
         *            match[1]                     match[2]          match[3] – optional
         */
        var trigger = match[3] || match[2];
        if (!typeAheadState.isAllowed || !trigger) {
            return null;
        }
        var mark = schema.mark('typeAheadQuery', { trigger: trigger });
        var tr = state.tr, selection = state.selection;
        var marks = selection.$from.marks();
        analyticsService.trackEvent('atlassian.editor.typeahead.trigger', {
            trigger: trigger,
        });
        return tr.replaceSelectionWith(schema.text(trigger, tslib_1.__spread([mark], marks)), false);
    });
    return inputRules({ rules: [typeAheadInputRule] });
}
export default inputRulePlugin;
//# sourceMappingURL=input-rules.js.map