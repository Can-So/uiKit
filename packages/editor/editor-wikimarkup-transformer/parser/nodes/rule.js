var HORIZONTAL_LINE_INSIDE_MACRO = '---';
export default function getRuleNodeView(schema, containerNodeType) {
    var _a = schema.nodes, paragraph = _a.paragraph, rule = _a.rule;
    if (containerNodeType) {
        var textNode = schema.text(HORIZONTAL_LINE_INSIDE_MACRO);
        return paragraph.createChecked({}, textNode);
    }
    else {
        return rule.createChecked();
    }
}
export function createRuleNode(schema) {
    var rule = schema.nodes.rule;
    var ruleNode = rule.createChecked();
    return [ruleNode];
}
//# sourceMappingURL=rule.js.map