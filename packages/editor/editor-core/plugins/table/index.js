import * as tslib_1 from "tslib";
import * as React from 'react';
import { tableEditing } from 'prosemirror-tables';
import { createTable } from 'prosemirror-utils';
import TableIcon from '@atlaskit/icon/glyph/editor/table';
import { tableCellMinWidth } from '@atlaskit/editor-common';
import { table, tableCell, tableHeader, tableRow } from '@atlaskit/adf-schema';
import LayoutButton from './ui/LayoutButton';
import WithPluginState from '../../ui/WithPluginState';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { keymapPlugin } from './pm-plugins/keymap';
import { createPlugin as createFlexiResizingPlugin, pluginKey as tableResizingPluginKey, } from './pm-plugins/table-resizing';
import { getToolbarConfig } from './toolbar';
import FloatingContextualMenu from './ui/FloatingContextualMenu';
import { isLayoutSupported } from './utils';
import { addAnalytics, } from '../analytics';
export var HANDLE_WIDTH = 6;
export var pluginConfig = function (tablesConfig) {
    var config = !tablesConfig || typeof tablesConfig === 'boolean' ? {} : tablesConfig;
    return config.advanced
        ? tslib_1.__assign({ allowBackgroundColor: true, allowColumnResizing: true, allowHeaderColumn: true, allowHeaderRow: true, allowMergeCells: true, allowNumberColumn: true, stickToolbarToBottom: true, permittedLayouts: 'all', allowControls: true }, config) : config;
};
var tablesPlugin = function (options) { return ({
    nodes: function () {
        return [
            { name: 'table', node: table },
            { name: 'tableHeader', node: tableHeader },
            { name: 'tableRow', node: tableRow },
            { name: 'tableCell', node: tableCell },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'table',
                plugin: function (_a) {
                    var _b = _a.props, allowTables = _b.allowTables, appearance = _b.appearance, allowDynamicTextSizing = _b.allowDynamicTextSizing, eventDispatcher = _a.eventDispatcher, dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
                    return createPlugin(dispatch, portalProviderAPI, eventDispatcher, pluginConfig(allowTables), appearance, allowDynamicTextSizing);
                },
            },
            {
                name: 'tablePMColResizing',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, _b = _a.props, allowTables = _b.allowTables, allowDynamicTextSizing = _b.allowDynamicTextSizing;
                    var allowColumnResizing = pluginConfig(allowTables).allowColumnResizing;
                    return allowColumnResizing
                        ? createFlexiResizingPlugin(dispatch, {
                            handleWidth: HANDLE_WIDTH,
                            cellMinWidth: tableCellMinWidth,
                            dynamicTextSizing: allowDynamicTextSizing,
                        })
                        : undefined;
                },
            },
            // Needs to be lower priority than prosemirror-tables.tableEditing
            // plugin as it is currently swallowing backspace events inside tables
            { name: 'tableKeymap', plugin: function () { return keymapPlugin(); } },
            { name: 'tableEditing', plugin: function () { return tableEditing(); } },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, appearance = _a.appearance;
        return (React.createElement(WithPluginState, { plugins: {
                pluginState: pluginKey,
                tableResizingPluginState: tableResizingPluginKey,
            }, render: function (_a) {
                var pluginState = _a.pluginState, tableResizingPluginState = _a.tableResizingPluginState;
                return (React.createElement(React.Fragment, null,
                    React.createElement(FloatingContextualMenu, { editorView: editorView, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, targetCellPosition: pluginState.targetCellPosition, isOpen: pluginState.isContextualMenuOpen, pluginConfig: pluginState.pluginConfig }),
                    appearance === 'full-page' &&
                        isLayoutSupported(editorView.state) && (React.createElement(LayoutButton, { editorView: editorView, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, targetRef: pluginState.tableFloatingToolbarTarget, isResizing: !!tableResizingPluginState &&
                            !!tableResizingPluginState.dragging }))));
            } }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.table),
                    priority: 600,
                    icon: function () { return React.createElement(TableIcon, { label: formatMessage(messages.table) }); },
                    action: function (insert, state) {
                        var tr = insert(createTable(state.schema));
                        return addAnalytics(tr, {
                            action: "inserted" /* INSERTED */,
                            actionSubject: "document" /* DOCUMENT */,
                            actionSubjectId: "table" /* TABLE */,
                            attributes: { inputMethod: "quickInsert" /* QUICK_INSERT */ },
                            eventType: "track" /* TRACK */,
                        });
                    },
                },
            ];
        },
        floatingToolbar: getToolbarConfig,
    },
}); };
export default tablesPlugin;
//# sourceMappingURL=index.js.map