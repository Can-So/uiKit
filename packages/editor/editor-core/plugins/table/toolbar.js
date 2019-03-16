import { defineMessages } from 'react-intl';
import RemoveIcon from '@findable/icon/glyph/editor/remove';
import commonMessages from '../../messages';
import { analyticsService as analytics, } from '../../analytics';
import { pluginKey } from './pm-plugins/main';
import { pluginKey as tableResizingPluginKey, } from './pm-plugins/table-resizing/index';
import { hoverTable, deleteTable, clearHoverSelection, toggleHeaderRow, toggleHeaderColumn, toggleNumberColumn, } from './actions';
import { checkIfHeaderRowEnabled, checkIfHeaderColumnEnabled, checkIfNumberColumnEnabled, } from './utils';
export var messages = defineMessages({
    tableOptions: {
        id: 'fabric.editor.tableOptions',
        defaultMessage: 'Table options',
        description: 'Opens a menu with additional table options',
    },
    headerRow: {
        id: 'fabric.editor.headerRow',
        defaultMessage: 'Header row',
        description: 'Marks the first table row as a header row',
    },
    headerColumn: {
        id: 'fabric.editor.headerColumn',
        defaultMessage: 'Header column',
        description: 'Marks the first table column as a header row',
    },
    numberedColumn: {
        id: 'fabric.editor.numberedColumn',
        defaultMessage: 'Numbered column',
        description: 'Adds an auto-numbering column to your table',
    },
});
var withAnalytics = function (command, eventName, properties) { return function (state, dispatch) {
    analytics.trackEvent(eventName, properties);
    return command(state, dispatch);
}; };
export var getToolbarConfig = function (state, _a) {
    var formatMessage = _a.formatMessage;
    var tableState = pluginKey.getState(state);
    var resizeState = tableResizingPluginKey.getState(state);
    if (tableState &&
        tableState.tableRef &&
        tableState.tableNode &&
        tableState.pluginConfig) {
        var pluginConfig = tableState.pluginConfig;
        return {
            title: 'Table floating controls',
            getDomRef: function () { return tableState.tableFloatingToolbarTarget; },
            nodeType: state.schema.nodes.table,
            items: [
                {
                    type: 'dropdown',
                    title: formatMessage(messages.tableOptions),
                    hidden: !(pluginConfig.allowHeaderRow && pluginConfig.allowHeaderColumn),
                    options: [
                        {
                            title: formatMessage(messages.headerRow),
                            onClick: withAnalytics(toggleHeaderRow, 'atlassian.editor.format.table.toggleHeaderRow.button'),
                            selected: checkIfHeaderRowEnabled(state),
                            hidden: !pluginConfig.allowHeaderRow,
                        },
                        {
                            title: formatMessage(messages.headerColumn),
                            onClick: withAnalytics(toggleHeaderColumn, 'atlassian.editor.format.table.toggleHeaderColumn.button'),
                            selected: checkIfHeaderColumnEnabled(state),
                            hidden: !pluginConfig.allowHeaderColumn,
                        },
                        {
                            title: formatMessage(messages.numberedColumn),
                            onClick: withAnalytics(toggleNumberColumn, 'atlassian.editor.format.table.toggleNumberColumn.button'),
                            selected: checkIfNumberColumnEnabled(state),
                            hidden: !pluginConfig.allowNumberColumn,
                        },
                    ],
                },
                {
                    type: 'separator',
                    hidden: !(pluginConfig.allowBackgroundColor &&
                        pluginConfig.allowHeaderRow &&
                        pluginConfig.allowHeaderColumn &&
                        pluginConfig.allowMergeCells),
                },
                {
                    type: 'button',
                    appearance: 'danger',
                    icon: RemoveIcon,
                    onClick: deleteTable,
                    disabled: !!resizeState && !!resizeState.dragging,
                    onMouseEnter: hoverTable(true),
                    onMouseLeave: clearHoverSelection,
                    title: formatMessage(commonMessages.remove),
                },
            ],
        };
    }
};
//# sourceMappingURL=toolbar.js.map