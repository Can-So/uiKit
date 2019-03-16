import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import EditorTaskIcon from '@atlaskit/icon/glyph/editor/task';
import EditorDecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import { decisionItem, decisionList, taskItem, taskList, } from '@atlaskit/adf-schema';
import { messages as insertBlockMessages } from '../insert-block/ui/ToolbarInsertBlock';
import { createPlugin } from './pm-plugins/main';
import inputRulePlugin from './pm-plugins/input-rules';
import keymap from './pm-plugins/keymaps';
import ToolbarDecision from './ui/ToolbarDecision';
import ToolbarTask from './ui/ToolbarTask';
import { insertTaskDecisionWithAnalytics, getListTypes } from './commands';
// tslint:disable-next-line:variable-name
var TaskDecisionToolbarGroup = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var quickInsertItem = function (insert, state, listType) {
    var _a = getListTypes(listType, state.schema), list = _a.list, item = _a.item;
    var addItem = function (_a) {
        var listLocalId = _a.listLocalId, itemLocalId = _a.itemLocalId;
        return insert(list.createChecked({ localId: listLocalId }, item.createChecked({
            localId: itemLocalId,
        })));
    };
    return insertTaskDecisionWithAnalytics(state, listType, "quickInsert" /* QUICK_INSERT */, addItem);
};
var tasksAndDecisionsPlugin = {
    nodes: function () {
        return [
            { name: 'decisionList', node: decisionList },
            { name: 'decisionItem', node: decisionItem },
            { name: 'taskList', node: taskList },
            { name: 'taskItem', node: taskItem },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'tasksAndDecisions',
                plugin: function (_a) {
                    var portalProviderAPI = _a.portalProviderAPI, providerFactory = _a.providerFactory, dispatch = _a.dispatch, props = _a.props;
                    return createPlugin(portalProviderAPI, providerFactory, dispatch, props.appearance);
                },
            },
            {
                name: 'tasksAndDecisionsInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema);
                },
            },
            {
                name: 'tasksAndDecisionsKeyMap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap(schema);
                },
            },
        ];
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, disabled = _a.disabled;
        return (React.createElement(TaskDecisionToolbarGroup, null,
            React.createElement(ToolbarDecision, { editorView: editorView, isDisabled: disabled, isReducedSpacing: true }),
            React.createElement(ToolbarTask, { editorView: editorView, isDisabled: disabled, isReducedSpacing: true })));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(insertBlockMessages.action),
                    priority: 100,
                    keywords: ['checkbox', 'task', 'todo'],
                    icon: function () { return (React.createElement(EditorTaskIcon, { label: formatMessage(insertBlockMessages.action) })); },
                    action: function (insert, state) {
                        return quickInsertItem(insert, state, 'taskList');
                    },
                },
                {
                    title: formatMessage(insertBlockMessages.decision),
                    priority: 900,
                    icon: function () { return (React.createElement(EditorDecisionIcon, { label: formatMessage(insertBlockMessages.decision) })); },
                    action: function (insert, state) {
                        return quickInsertItem(insert, state, 'decisionList');
                    },
                },
            ];
        },
    },
};
export default tasksAndDecisionsPlugin;
var templateObject_1;
//# sourceMappingURL=index.js.map