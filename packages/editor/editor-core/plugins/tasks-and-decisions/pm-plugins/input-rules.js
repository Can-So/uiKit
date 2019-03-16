import { inputRules } from 'prosemirror-inputrules';
import { NodeSelection, TextSelection, } from 'prosemirror-state';
import { analyticsService } from '../../../analytics';
import { createInputRule, leafNodeReplacementCharacter, } from '../../../utils/input-rules';
import { canInsert } from 'prosemirror-utils';
import { changeInDepth, insertTaskDecisionWithAnalytics } from '../commands';
var createListRule = function (regex, listType) {
    return createInputRule(regex, function (state, _match, start, end) {
        var insertTr = insertTaskDecisionWithAnalytics(state, listType, "autoformatting" /* FORMATTING */, addItem(start, end));
        return insertTr;
    }, true);
};
var addItem = function (start, end) { return function (_a) {
    var tr = _a.tr, state = _a.state, list = _a.list, item = _a.item, listLocalId = _a.listLocalId, itemLocalId = _a.itemLocalId;
    var $from = state.selection.$from, schema = state.schema;
    var _b = schema.nodes, paragraph = _b.paragraph, hardBreak = _b.hardBreak;
    var content = $from.node($from.depth).content;
    var shouldBreakNode = false;
    content.forEach(function (node, offset) {
        if (node.type === hardBreak && offset < start) {
            shouldBreakNode = true;
        }
    });
    var $end = state.doc.resolve(end);
    var $endOfParent = state.doc.resolve($end.after());
    // Only allow creating list in nodes that support them.
    // Parent must be a paragraph as we don't want this applying to headings
    if ($end.parent.type !== paragraph ||
        !canInsert($endOfParent, list.createAndFill())) {
        return null;
    }
    var where = $from.before($from.depth);
    analyticsService.trackEvent("atlassian.fabric." + item.name + ".trigger.shortcut");
    if (!shouldBreakNode) {
        tr.delete(where, $from.end($from.depth))
            .replaceSelectionWith(list.create({ localId: listLocalId }, [
            item.create({ localId: itemLocalId }, content),
        ]))
            .delete(start + 1, end + 1)
            .setSelection(new TextSelection(tr.doc.resolve(start + 1)));
    }
    else {
        var depthAdjustment = changeInDepth($from, tr.selection.$from);
        tr.split($from.pos)
            .setSelection(new NodeSelection(tr.doc.resolve($from.pos + 1)))
            .replaceSelectionWith(list.create({ localId: listLocalId }, [
            item.create({ localId: itemLocalId }, 
            // TODO: [ts30] handle void and null properly
            tr.doc.nodeAt($from.pos + 1).content),
        ]))
            .setSelection(new TextSelection(tr.doc.resolve($from.pos + depthAdjustment)))
            .delete(start, end + 1);
    }
    return tr;
}; };
export function inputRulePlugin(schema) {
    var rules = [];
    var _a = schema.nodes, decisionList = _a.decisionList, decisionItem = _a.decisionItem, taskList = _a.taskList, taskItem = _a.taskItem;
    if (decisionList && decisionItem) {
        rules.push(createListRule(new RegExp("(^|" + leafNodeReplacementCharacter + ")\\<\\>\\s$"), 'decisionList'));
    }
    if (taskList && taskItem) {
        rules.push(createListRule(new RegExp("(^|" + leafNodeReplacementCharacter + ")\\[\\]\\s$"), 'taskList'));
    }
    return inputRules({ rules: rules });
}
export default inputRulePlugin;
//# sourceMappingURL=input-rules.js.map