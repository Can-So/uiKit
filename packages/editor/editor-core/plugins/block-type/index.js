import * as React from 'react';
import EditorQuoteIcon from '@findable/icon/glyph/editor/quote';
import { heading, blockquote, hardBreak } from '@findable/adf-schema';
import { ToolbarSize } from '../../ui/Toolbar';
import { createPlugin, pluginKey } from './pm-plugins/main';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import ToolbarBlockType from './ui/ToolbarBlockType';
import WithPluginState from '../../ui/WithPluginState';
import { setBlockTypeWithAnalytics } from './commands';
import { messages } from './types';
import { addAnalytics, } from '../analytics';
var blockType = {
    nodes: function (_a) {
        var allowBlockType = _a.allowBlockType;
        var nodes = [
            { name: 'heading', node: heading },
            { name: 'blockquote', node: blockquote },
            { name: 'hardBreak', node: hardBreak },
        ];
        if (allowBlockType) {
            var exclude_1 = allowBlockType.exclude ? allowBlockType.exclude : [];
            return nodes.filter(function (node) { return exclude_1.indexOf(node.name) === -1; });
        }
        return nodes;
    },
    pmPlugins: function () {
        return [
            {
                name: 'blockType',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch;
                    return createPlugin(dispatch, props.appearance);
                },
            },
            {
                name: 'blockTypeInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema);
                },
            },
            // Needs to be lower priority than prosemirror-tables.tableEditing
            // plugin as it is currently swallowing right/down arrow events inside tables
            {
                name: 'blockTypeKeyMap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymapPlugin(schema);
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, toolbarSize = _a.toolbarSize, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing, eventDispatcher = _a.eventDispatcher;
        var isSmall = toolbarSize < ToolbarSize.XL;
        var boundSetBlockType = function (name) {
            return setBlockTypeWithAnalytics(name, "toolbar" /* TOOLBAR */)(editorView.state, editorView.dispatch);
        };
        return (React.createElement(WithPluginState, { editorView: editorView, eventDispatcher: eventDispatcher, plugins: {
                pluginState: pluginKey,
            }, render: function (_a) {
                var pluginState = _a.pluginState;
                return (React.createElement(ToolbarBlockType, { isSmall: isSmall, isDisabled: disabled, isReducedSpacing: isToolbarReducedSpacing, setBlockType: boundSetBlockType, pluginState: pluginState, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement }));
            } }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.blockquote),
                    priority: 1300,
                    icon: function () { return (React.createElement(EditorQuoteIcon, { label: formatMessage(messages.blockquote) })); },
                    action: function (insert, state) {
                        var tr = insert(state.schema.nodes.blockquote.createChecked({}, state.schema.nodes.paragraph.createChecked()));
                        return addAnalytics(tr, {
                            action: "formatted" /* FORMATTED */,
                            actionSubject: "text" /* TEXT */,
                            eventType: "track" /* TRACK */,
                            actionSubjectId: "blockQuote" /* FORMAT_BLOCK_QUOTE */,
                            attributes: {
                                inputMethod: "quickInsert" /* QUICK_INSERT */,
                            },
                        });
                    },
                },
            ];
        },
    },
};
export default blockType;
export { pluginKey } from './pm-plugins/main';
//# sourceMappingURL=index.js.map