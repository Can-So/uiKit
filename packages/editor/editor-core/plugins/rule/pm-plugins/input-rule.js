import { inputRules } from 'prosemirror-inputrules';
import { Fragment } from 'prosemirror-model';
import { analyticsService } from '../../../analytics';
import { createInputRule, leafNodeReplacementCharacter, } from '../../../utils/input-rules';
import { addAnalytics, } from '../../analytics';
export var createHorizontalRule = function (state, start, end, inputMethod) {
    if (!state.selection.empty) {
        return null;
    }
    var $from = state.selection.$from;
    var $afterRule = state.doc.resolve($from.after());
    var paragraph = state.schema.nodes.paragraph;
    if ($afterRule.nodeAfter && $afterRule.nodeAfter.type === paragraph) {
        // if there's already a paragraph after, just insert the rule into
        // the current paragraph
        end = end + 1;
    }
    var tr = state.tr.replaceWith(start, end, Fragment.from(state.schema.nodes.rule.createChecked()));
    return addAnalytics(tr, {
        action: "inserted" /* INSERTED */,
        actionSubject: "document" /* DOCUMENT */,
        actionSubjectId: "divider" /* DIVIDER */,
        attributes: { inputMethod: inputMethod },
        eventType: "track" /* TRACK */,
    });
};
var createHorizontalRuleAutoformat = function (state, start, end) {
    analyticsService.trackEvent("atlassian.editor.format.horizontalrule.autoformatting");
    return createHorizontalRule(state, start, end, "autoformatting" /* FORMATTING */);
};
export function inputRulePlugin(schema) {
    var rules = [];
    if (schema.nodes.rule) {
        // '---' and '***' for hr
        rules.push(
        // -1, so that it also replaces the container paragraph
        createInputRule(/^(\-\-\-|\*\*\*)$/, function (state, match, start, end) {
            return createHorizontalRuleAutoformat(state, start - 1, end);
        }, true));
        // '---' and '***' after shift+enter for hr
        rules.push(createInputRule(new RegExp(leafNodeReplacementCharacter + "(\\-\\-\\-|\\*\\*\\*)"), function (state, match, start, end) {
            var hardBreak = state.schema.nodes.hardBreak;
            if (state.doc.resolve(start).nodeAfter.type !== hardBreak) {
                return null;
            }
            return createHorizontalRuleAutoformat(state, start, end);
        }, true));
    }
    if (rules.length !== 0) {
        return inputRules({ rules: rules });
    }
}
export default inputRulePlugin;
//# sourceMappingURL=input-rule.js.map