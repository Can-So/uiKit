import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { findParentDomRefOfType } from 'prosemirror-utils';
import { DecorationSet } from 'prosemirror-view';
import { browser } from '@atlaskit/editor-common';
import { createTableView } from '../nodeviews/table';
import { createCellView } from '../nodeviews/cell';
import { setTableRef, clearHoverSelection, handleCut } from '../actions';
import { handleSetFocus, handleSetTableRef, handleSetTargetCellPosition, handleClearSelection, handleHoverColumns, handleHoverRows, handleHoverTable, handleDocOrSelectionChanged, handleToggleContextualMenu, handleShowInsertColumnButton, handleShowInsertRowButton, handleHideInsertColumnOrRowButton, } from '../action-handlers';
import { handleMouseDown, handleMouseOver, handleMouseLeave, handleBlur, handleFocus, handleClick, handleTripleClick, } from '../event-handlers';
import { findControlsHoverDecoration } from '../utils';
import { fixTables } from '../transforms';
import { TableCssClassName as ClassName } from '../types';
export var pluginKey = new PluginKey('tablePlugin');
export var defaultTableSelection = {
    hoveredColumns: [],
    hoveredRows: [],
    isInDanger: false,
};
export var ACTIONS;
(function (ACTIONS) {
    ACTIONS[ACTIONS["SET_EDITOR_FOCUS"] = 0] = "SET_EDITOR_FOCUS";
    ACTIONS[ACTIONS["SET_TABLE_REF"] = 1] = "SET_TABLE_REF";
    ACTIONS[ACTIONS["SET_TARGET_CELL_POSITION"] = 2] = "SET_TARGET_CELL_POSITION";
    ACTIONS[ACTIONS["CLEAR_HOVER_SELECTION"] = 3] = "CLEAR_HOVER_SELECTION";
    ACTIONS[ACTIONS["HOVER_COLUMNS"] = 4] = "HOVER_COLUMNS";
    ACTIONS[ACTIONS["HOVER_ROWS"] = 5] = "HOVER_ROWS";
    ACTIONS[ACTIONS["HOVER_TABLE"] = 6] = "HOVER_TABLE";
    ACTIONS[ACTIONS["TOGGLE_CONTEXTUAL_MENU"] = 7] = "TOGGLE_CONTEXTUAL_MENU";
    ACTIONS[ACTIONS["SHOW_INSERT_COLUMN_BUTTON"] = 8] = "SHOW_INSERT_COLUMN_BUTTON";
    ACTIONS[ACTIONS["SHOW_INSERT_ROW_BUTTON"] = 9] = "SHOW_INSERT_ROW_BUTTON";
    ACTIONS[ACTIONS["HIDE_INSERT_COLUMN_OR_ROW_BUTTON"] = 10] = "HIDE_INSERT_COLUMN_OR_ROW_BUTTON";
})(ACTIONS || (ACTIONS = {}));
export var createPlugin = function (dispatch, portalProviderAPI, eventDispatcher, pluginConfig, appearance, dynamicTextSizing) {
    return new Plugin({
        state: {
            init: function () {
                return tslib_1.__assign({ pluginConfig: pluginConfig, insertColumnButtonIndex: undefined, insertRowButtonIndex: undefined, decorationSet: DecorationSet.empty }, defaultTableSelection);
            },
            apply: function (tr, _pluginState, _, state) {
                var meta = tr.getMeta(pluginKey) || {};
                var data = meta.data || {};
                var editorHasFocus = data.editorHasFocus, tableRef = data.tableRef, targetCellPosition = data.targetCellPosition, hoverDecoration = data.hoverDecoration, hoveredColumns = data.hoveredColumns, hoveredRows = data.hoveredRows, isInDanger = data.isInDanger, insertColumnButtonIndex = data.insertColumnButtonIndex, insertRowButtonIndex = data.insertRowButtonIndex;
                var pluginState = tslib_1.__assign({}, _pluginState);
                if (tr.docChanged && pluginState.targetCellPosition) {
                    var _a = tr.mapping.mapResult(pluginState.targetCellPosition), pos = _a.pos, deleted = _a.deleted;
                    pluginState = tslib_1.__assign({}, pluginState, { targetCellPosition: deleted ? undefined : pos });
                }
                switch (meta.action) {
                    case ACTIONS.SET_EDITOR_FOCUS:
                        return handleSetFocus(editorHasFocus)(pluginState, dispatch);
                    case ACTIONS.SET_TABLE_REF:
                        return handleSetTableRef(state, tableRef)(pluginState, dispatch);
                    case ACTIONS.SET_TARGET_CELL_POSITION:
                        return handleSetTargetCellPosition(targetCellPosition)(pluginState, dispatch);
                    case ACTIONS.CLEAR_HOVER_SELECTION:
                        return handleClearSelection(pluginState, dispatch);
                    case ACTIONS.HOVER_COLUMNS:
                        return handleHoverColumns(state, hoverDecoration, hoveredColumns, isInDanger)(pluginState, dispatch);
                    case ACTIONS.HOVER_ROWS:
                        return handleHoverRows(state, hoverDecoration, hoveredRows, isInDanger)(pluginState, dispatch);
                    case ACTIONS.HOVER_TABLE:
                        return handleHoverTable(state, hoverDecoration, hoveredColumns, hoveredRows, isInDanger)(pluginState, dispatch);
                    case ACTIONS.TOGGLE_CONTEXTUAL_MENU:
                        return handleToggleContextualMenu(pluginState, dispatch);
                    case ACTIONS.SHOW_INSERT_COLUMN_BUTTON:
                        return handleShowInsertColumnButton(insertColumnButtonIndex)(pluginState, dispatch);
                    case ACTIONS.SHOW_INSERT_ROW_BUTTON:
                        return handleShowInsertRowButton(insertRowButtonIndex)(pluginState, dispatch);
                    case ACTIONS.HIDE_INSERT_COLUMN_OR_ROW_BUTTON:
                        return handleHideInsertColumnOrRowButton(pluginState, dispatch);
                    default:
                        break;
                }
                if (tr.docChanged || tr.selectionSet) {
                    return handleDocOrSelectionChanged(tr)(pluginState, dispatch);
                }
                return pluginState;
            },
        },
        key: pluginKey,
        appendTransaction: function (transactions, oldState, newState) {
            var tr = transactions.find(function (tr) { return tr.getMeta('uiEvent') === 'cut'; });
            if (tr) {
                // "fixTables" removes empty rows as we don't allow that in schema
                return fixTables(handleCut(tr, oldState, newState));
            }
            if (transactions.find(function (tr) { return tr.docChanged; })) {
                return fixTables(newState.tr);
            }
        },
        view: function (editorView) {
            var domAtPos = editorView.domAtPos.bind(editorView);
            return {
                update: function (view) {
                    var state = view.state, dispatch = view.dispatch;
                    var selection = state.selection;
                    var pluginState = getPluginState(state);
                    var tableRef;
                    if (pluginState.editorHasFocus) {
                        var parent_1 = findParentDomRefOfType(state.schema.nodes.table, domAtPos)(selection);
                        if (parent_1) {
                            tableRef = parent_1.querySelector('table');
                        }
                    }
                    if (pluginState.tableRef !== tableRef) {
                        setTableRef(tableRef)(state, dispatch);
                    }
                },
            };
        },
        props: {
            decorations: function (state) { return getPluginState(state).decorationSet; },
            handleClick: function (_a, pos, event) {
                var state = _a.state, dispatch = _a.dispatch;
                var decorationSet = getPluginState(state).decorationSet;
                if (findControlsHoverDecoration(decorationSet).length) {
                    clearHoverSelection(state, dispatch);
                }
                // ED-6069: workaround for Chrome given a regression introduced in prosemirror-view@1.6.8
                // Returning true prevents that updateSelection() is getting called in the commit below:
                // @see https://github.com/ProseMirror/prosemirror-view/commit/33fe4a8b01584f6b4103c279033dcd33e8047b95
                if (browser.chrome && event.target) {
                    var targetClassList = event.target.classList;
                    if (targetClassList.contains(ClassName.CONTROLS_BUTTON) ||
                        targetClassList.contains(ClassName.CONTEXTUAL_MENU_BUTTON)) {
                        return true;
                    }
                }
                return false;
            },
            nodeViews: {
                table: createTableView(portalProviderAPI, dynamicTextSizing),
                tableCell: createCellView(portalProviderAPI, appearance),
                tableHeader: createCellView(portalProviderAPI, appearance),
            },
            handleDOMEvents: {
                blur: handleBlur,
                focus: handleFocus,
                mousedown: handleMouseDown,
                mouseover: handleMouseOver,
                mouseleave: handleMouseLeave,
                click: handleClick,
            },
            handleTripleClick: handleTripleClick,
        },
    });
};
export var getPluginState = function (state) {
    return pluginKey.getState(state);
};
//# sourceMappingURL=main.js.map