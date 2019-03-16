import * as tslib_1 from "tslib";
import { findTable, findParentNodeOfType } from 'prosemirror-utils';
import { pluginKey, defaultTableSelection } from './pm-plugins/main';
import { TableCssClassName as ClassName } from './types';
import { closestElement } from '../../utils';
import { findControlsHoverDecoration } from './utils';
var processDecorations = function (state, decorationSet, newDecorations, find) {
    if (newDecorations.length) {
        return decorationSet.add(state.doc, newDecorations);
    }
    else {
        return decorationSet.remove(find(decorationSet));
    }
};
export var handleSetFocus = function (editorHasFocus) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { editorHasFocus: editorHasFocus });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleSetTableRef = function (state, tableRef) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { tableRef: tableRef, tableFloatingToolbarTarget: closestElement(tableRef, "." + ClassName.TABLE_NODE_WRAPPER) || undefined, tableNode: tableRef ? findTable(state.selection).node : undefined });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleSetTargetCellPosition = function (targetCellPosition) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { targetCellPosition: targetCellPosition, isContextualMenuOpen: false });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleClearSelection = function (pluginState, dispatch) {
    var decorationSet = pluginState.decorationSet;
    var nextPluginState = tslib_1.__assign({}, pluginState, defaultTableSelection, { decorationSet: decorationSet.remove(findControlsHoverDecoration(decorationSet)) });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
};
export var handleHoverColumns = function (state, hoverDecoration, hoveredColumns, isInDanger) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { decorationSet: processDecorations(state, pluginState.decorationSet, hoverDecoration, findControlsHoverDecoration), hoveredColumns: hoveredColumns,
        isInDanger: isInDanger });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleHoverRows = function (state, hoverDecoration, hoveredRows, isInDanger) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { decorationSet: processDecorations(state, pluginState.decorationSet, hoverDecoration, findControlsHoverDecoration), hoveredRows: hoveredRows,
        isInDanger: isInDanger });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleHoverTable = function (state, hoverDecoration, hoveredColumns, hoveredRows, isInDanger) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { decorationSet: processDecorations(state, pluginState.decorationSet, hoverDecoration, findControlsHoverDecoration), hoveredColumns: hoveredColumns,
        hoveredRows: hoveredRows,
        isInDanger: isInDanger });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleDocOrSelectionChanged = function (tr) { return function (pluginState, dispatch) {
    var tableNode;
    var targetCellPosition;
    var table = findTable(tr.selection);
    if (table) {
        tableNode = table.node;
        var _a = tr.doc.type.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
        var cell = findParentNodeOfType([tableCell, tableHeader])(tr.selection);
        targetCellPosition = cell ? cell.pos : undefined;
    }
    var hoverDecoration = findControlsHoverDecoration(pluginState.decorationSet);
    if (pluginState.tableNode !== tableNode ||
        pluginState.targetCellPosition !== targetCellPosition ||
        hoverDecoration.length) {
        var nextPluginState = tslib_1.__assign({}, pluginState, defaultTableSelection, { 
            // @see: https://product-fabric.atlassian.net/browse/ED-3796
            decorationSet: pluginState.decorationSet.remove(hoverDecoration), targetCellPosition: targetCellPosition,
            tableNode: tableNode });
        dispatch(pluginKey, nextPluginState);
        return nextPluginState;
    }
    return pluginState;
}; };
export var handleToggleContextualMenu = function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { isContextualMenuOpen: !pluginState.isContextualMenuOpen });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
};
export var handleShowInsertColumnButton = function (insertColumnButtonIndex) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { insertColumnButtonIndex: insertColumnButtonIndex });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleShowInsertRowButton = function (insertRowButtonIndex) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { insertRowButtonIndex: insertRowButtonIndex });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
}; };
export var handleHideInsertColumnOrRowButton = function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { insertColumnButtonIndex: undefined, insertRowButtonIndex: undefined });
    dispatch(pluginKey, nextPluginState);
    return nextPluginState;
};
//# sourceMappingURL=action-handlers.js.map