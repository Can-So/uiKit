import * as React from 'react';
import HorizontalRuleIcon from '@findable/icon/glyph/editor/divider';
import { rule } from '@findable/adf-schema';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import { addAnalytics, } from '../analytics';
var rulePlugin = {
    nodes: function () {
        return [{ name: 'rule', node: rule }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'ruleInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema);
                },
            },
            {
                name: 'ruleKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymapPlugin(schema);
                },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.horizontalRule),
                    keywords: ['horizontal rule', 'rule', 'line'],
                    priority: 1200,
                    icon: function () { return (React.createElement(HorizontalRuleIcon, { label: formatMessage(messages.horizontalRule) })); },
                    action: function (insert, state) {
                        var tr = insert(state.schema.nodes.rule.createChecked());
                        return addAnalytics(tr, {
                            action: "inserted" /* INSERTED */,
                            actionSubject: "document" /* DOCUMENT */,
                            actionSubjectId: "divider" /* DIVIDER */,
                            attributes: { inputMethod: "quickInsert" /* QUICK_INSERT */ },
                            eventType: "track" /* TRACK */,
                        });
                    },
                },
            ];
        },
    },
};
export default rulePlugin;
//# sourceMappingURL=index.js.map