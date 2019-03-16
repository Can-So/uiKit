import * as tslib_1 from "tslib";
import { TextSelection, Selection, } from 'prosemirror-state';
import { goToNextCell as baseGotoNextCell, selectionCell, TableMap, CellSelection, } from 'prosemirror-tables';
import { findTable, getCellsInColumn, getCellsInRow, addColumnAt, addRowAt, isCellSelection, removeTable, findParentNodeOfType, safeInsert, createTable as createTableNode, findCellClosestToPos, emptyCell, setCellAttrs, getSelectionRect, selectColumn as selectColumnTransform, selectRow as selectRowTransform, } from 'prosemirror-utils';
import { getPluginState, pluginKey, ACTIONS } from './pm-plugins/main';
import { checkIfHeaderRowEnabled, checkIfHeaderColumnEnabled, isIsolating, createControlsHoverDecoration, } from './utils';
import { analyticsService } from '../../analytics';
import { outdentList } from '../lists/commands';
import { mapSlice } from '../../utils/slice';
import { TableCssClassName as ClassName } from './types';
import { closestElement } from '../../utils';
import { deleteColumns, deleteRows, fixAutoSizedTable } from './transforms';
export var clearHoverSelection = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, { action: ACTIONS.CLEAR_HOVER_SELECTION }));
    }
    return true;
};
export var hoverColumns = function (hoveredColumns, isInDanger) { return function (state, dispatch) {
    var cells = getCellsInColumn(hoveredColumns)(state.selection);
    if (!cells) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr
            .setMeta(pluginKey, {
            action: ACTIONS.HOVER_COLUMNS,
            data: {
                hoverDecoration: createControlsHoverDecoration(cells, isInDanger),
                hoveredColumns: hoveredColumns,
                isInDanger: isInDanger,
            },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
export var hoverRows = function (hoveredRows, isInDanger) { return function (state, dispatch) {
    var cells = getCellsInRow(hoveredRows)(state.selection);
    if (!cells) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr
            .setMeta(pluginKey, {
            action: ACTIONS.HOVER_ROWS,
            data: {
                hoverDecoration: createControlsHoverDecoration(cells, isInDanger),
                hoveredRows: hoveredRows,
                isInDanger: isInDanger,
            },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
export var hoverTable = function (isInDanger) { return function (state, dispatch) {
    var table = findTable(state.selection);
    if (!table) {
        return false;
    }
    var map = TableMap.get(table.node);
    var hoveredColumns = Array.from(Array(map.width).keys());
    var hoveredRows = Array.from(Array(map.height).keys());
    var cells = getCellsInRow(hoveredRows)(state.selection);
    if (!cells) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr
            .setMeta(pluginKey, {
            action: ACTIONS.HOVER_TABLE,
            data: {
                hoverDecoration: createControlsHoverDecoration(cells, isInDanger),
                hoveredColumns: hoveredColumns,
                hoveredRows: hoveredRows,
                isInDanger: isInDanger,
            },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
export var clearSelection = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr
            .setSelection(Selection.near(state.selection.$from))
            .setMeta('addToHistory', false));
    }
    return true;
};
export var toggleHeaderRow = function (state, dispatch) {
    var table = findTable(state.selection);
    if (!table) {
        return false;
    }
    var tr = state.tr;
    var map = TableMap.get(table.node);
    var _a = state.schema.nodes, tableHeader = _a.tableHeader, tableCell = _a.tableCell;
    var isHeaderRowEnabled = checkIfHeaderRowEnabled(state);
    var isHeaderColumnEnabled = checkIfHeaderColumnEnabled(state);
    var type = isHeaderRowEnabled ? tableCell : tableHeader;
    for (var column = 0; column < table.node.child(0).childCount; column++) {
        // skip header column
        if (isHeaderColumnEnabled && column === 0) {
            continue;
        }
        var from = tr.mapping.map(table.start + map.map[column]);
        var cell = table.node.child(0).child(column);
        tr.setNodeMarkup(from, type, cell.attrs);
    }
    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
export var toggleHeaderColumn = function (state, dispatch) {
    var table = findTable(state.selection);
    if (!table) {
        return false;
    }
    var tr = state.tr;
    var map = TableMap.get(table.node);
    var cellsPositions = map.cellsInRect({
        left: 0,
        // skip header row
        top: checkIfHeaderRowEnabled(state) ? 1 : 0,
        right: 1,
        bottom: map.height,
    });
    var _a = state.schema.nodes, tableHeader = _a.tableHeader, tableCell = _a.tableCell;
    var type = checkIfHeaderColumnEnabled(state) ? tableCell : tableHeader;
    cellsPositions.forEach(function (relativeCellPos) {
        var cellPos = relativeCellPos + table.start;
        var cell = tr.doc.nodeAt(cellPos);
        if (cell) {
            tr.setNodeMarkup(cellPos, type, cell.attrs);
        }
    });
    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
export var toggleNumberColumn = function (state, dispatch) {
    var tr = state.tr;
    var _a = findTable(state.selection), node = _a.node, pos = _a.pos;
    tr.setNodeMarkup(pos, state.schema.nodes.table, tslib_1.__assign({}, node.attrs, { isNumberColumnEnabled: !node.attrs.isNumberColumnEnabled }));
    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
export var setCellAttr = function (name, value) { return function (state, dispatch) {
    var _a;
    var tr = state.tr, selection = state.selection;
    if (selection instanceof CellSelection) {
        var updated_1 = false;
        selection.forEachCell(function (cell, pos) {
            var _a;
            if (cell.attrs[name] !== value) {
                tr.setNodeMarkup(pos, cell.type, tslib_1.__assign({}, cell.attrs, (_a = {}, _a[name] = value, _a)));
                updated_1 = true;
            }
        });
        if (updated_1) {
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
    }
    else {
        var cell = selectionCell(state);
        if (cell) {
            if (dispatch) {
                dispatch(tr.setNodeMarkup(cell.pos, cell.nodeAfter.type, tslib_1.__assign({}, cell.nodeAfter.attrs, (_a = {}, _a[name] = value, _a))));
            }
            return true;
        }
    }
    return false;
}; };
export var insertColumn = function (column) { return function (state, dispatch) {
    var tr = addColumnAt(column)(state.tr);
    var table = findTable(tr.selection);
    // move the cursor to the newly created column
    var pos = TableMap.get(table.node).positionAt(0, column, table.node);
    if (dispatch) {
        dispatch(tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))));
    }
    analyticsService.trackEvent('atlassian.editor.format.table.column.button');
    return true;
}; };
export var insertRow = function (row) { return function (state, dispatch) {
    clearHoverSelection(state, dispatch);
    // Dont clone the header row
    var headerRowEnabled = checkIfHeaderRowEnabled(state);
    var clonePreviousRow = (headerRowEnabled && row > 1) || (!headerRowEnabled && row >= 0);
    var tr = addRowAt(row, clonePreviousRow)(state.tr);
    var table = findTable(tr.selection);
    // move the cursor to the newly created row
    var pos = TableMap.get(table.node).positionAt(row, 0, table.node);
    if (dispatch) {
        dispatch(tr.setSelection(Selection.near(tr.doc.resolve(table.start + pos))));
    }
    analyticsService.trackEvent('atlassian.editor.format.table.row.button');
    return true;
}; };
export var triggerUnlessTableHeader = function (command) { return function (state, dispatch) {
    var selection = state.selection, tableHeader = state.schema.nodes.tableHeader;
    if (selection instanceof TextSelection) {
        var cell = findCellClosestToPos(selection.$from);
        if (cell && cell.node.type !== tableHeader) {
            return command(state, dispatch);
        }
    }
    if (selection instanceof CellSelection) {
        var rect = getSelectionRect(selection);
        if (!checkIfHeaderRowEnabled(state) || (rect && rect.top > 0)) {
            return command(state, dispatch);
        }
    }
    return false;
}; };
export function transformSliceToAddTableHeaders(slice, schema) {
    var _a = schema.nodes, table = _a.table, tableHeader = _a.tableHeader, tableRow = _a.tableRow;
    return mapSlice(slice, function (maybeTable) {
        if (maybeTable.type === table) {
            var firstRow = maybeTable.firstChild;
            if (firstRow) {
                var headerCols_1 = [];
                firstRow.forEach(function (oldCol) {
                    headerCols_1.push(tableHeader.createChecked(oldCol.attrs, oldCol.content, oldCol.marks));
                });
                var headerRow = tableRow.createChecked(firstRow.attrs, headerCols_1, firstRow.marks);
                return maybeTable.copy(maybeTable.content.replaceChild(0, headerRow));
            }
        }
        return maybeTable;
    });
}
export var deleteTable = function (state, dispatch) {
    if (dispatch) {
        dispatch(removeTable(state.tr));
    }
    analyticsService.trackEvent('atlassian.editor.format.table.delete.button');
    return true;
};
export var convertFirstRowToHeader = function (schema) { return function (tr) {
    var table = findTable(tr.selection);
    var map = TableMap.get(table.node);
    for (var i = 0; i < map.width; i++) {
        var cell = table.node.child(0).child(i);
        tr.setNodeMarkup(table.start + map.map[i], schema.nodes.tableHeader, cell.attrs);
    }
    return tr;
}; };
export var toggleTableLayout = function (state, dispatch) {
    var table = findTable(state.selection);
    if (!table) {
        return false;
    }
    var layout;
    switch (table.node.attrs.layout) {
        case 'default':
            layout = 'wide';
            break;
        case 'wide':
            layout = 'full-width';
            break;
        case 'full-width':
            layout = 'default';
            break;
    }
    if (dispatch) {
        dispatch(state.tr.setNodeMarkup(table.pos, state.schema.nodes.table, tslib_1.__assign({}, table.node.attrs, { layout: layout })));
    }
    return true;
};
var TAB_FORWARD_DIRECTION = 1;
var TAB_BACKWARD_DIRECTION = -1;
export var createTable = function (state, dispatch) {
    if (!pluginKey.get(state)) {
        return false;
    }
    var table = createTableNode(state.schema);
    if (dispatch) {
        dispatch(safeInsert(table)(state.tr).scrollIntoView());
    }
    return true;
};
export var goToNextCell = function (direction) { return function (state, dispatch) {
    var table = findTable(state.selection);
    if (!table) {
        return false;
    }
    var map = TableMap.get(table.node);
    var _a = state.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
    var cell = findParentNodeOfType([tableCell, tableHeader])(state.selection);
    var firstCellPos = map.positionAt(0, 0, table.node) + table.start;
    var lastCellPos = map.positionAt(map.height - 1, map.width - 1, table.node) + table.start;
    var event = direction === TAB_FORWARD_DIRECTION ? 'next_cell' : 'previous_cell';
    analyticsService.trackEvent("atlassian.editor.format.table." + event + ".keyboard");
    if (firstCellPos === cell.pos && direction === TAB_BACKWARD_DIRECTION) {
        insertRow(0)(state, dispatch);
        return true;
    }
    if (lastCellPos === cell.pos && direction === TAB_FORWARD_DIRECTION) {
        insertRow(map.height)(state, dispatch);
        return true;
    }
    return baseGotoNextCell(direction)(state, dispatch);
}; };
export var moveCursorBackward = function (state, dispatch) {
    var pluginState = getPluginState(state);
    var $cursor = state.selection.$cursor;
    // if cursor is in the middle of a text node, do nothing
    if (!$cursor ||
        (pluginState.view
            ? !pluginState.view.endOfTextblock('backward', state)
            : $cursor.parentOffset > 0)) {
        return false;
    }
    // find the node before the cursor
    var before;
    var cut;
    if (!isIsolating($cursor.parent)) {
        for (var i = $cursor.depth - 1; !before && i >= 0; i--) {
            if ($cursor.index(i) > 0) {
                cut = $cursor.before(i + 1);
                before = $cursor.node(i).child($cursor.index(i) - 1);
            }
            if (isIsolating($cursor.node(i))) {
                break;
            }
        }
    }
    // if the node before is not a table node - do nothing
    if (!before || before.type !== state.schema.nodes.table) {
        return false;
    }
    /*
      ensure we're just at a top level paragraph
      otherwise, perform regular backspace behaviour
     */
    var grandparent = $cursor.node($cursor.depth - 1);
    var listItem = state.schema.nodes.listItem;
    if ($cursor.parent.type !== state.schema.nodes.paragraph ||
        (grandparent && grandparent.type !== state.schema.nodes.doc)) {
        if (grandparent && grandparent.type === listItem) {
            return outdentList()(state, dispatch);
        }
        else {
            return false;
        }
    }
    var tr = state.tr;
    var lastCellPos = (cut || 0) - 4;
    // need to move cursor inside the table to be able to calculate table's offset
    tr.setSelection(new TextSelection(state.doc.resolve(lastCellPos)));
    var $from = tr.selection.$from;
    var start = $from.start(-1);
    var pos = start + $from.parent.nodeSize - 1;
    // move cursor to the last cell
    // it doesn't join node before (last cell) with node after (content after the cursor)
    // due to ridiculous amount of PM code that would have been required to overwrite
    if (dispatch) {
        dispatch(tr.setSelection(new TextSelection(state.doc.resolve(pos))));
    }
    return true;
};
export var emptyMultipleCells = function (targetCellPosition) { return function (state, dispatch) {
    var cursorPos;
    var tr = state.tr;
    if (isCellSelection(tr.selection)) {
        var selection = tr.selection;
        selection.forEachCell(function (node, pos) {
            var $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
            tr = emptyCell(findCellClosestToPos($pos), state.schema)(tr);
        });
        cursorPos = selection.$headCell.pos;
    }
    else if (targetCellPosition) {
        var cell = findCellClosestToPos(tr.doc.resolve(targetCellPosition + 1));
        tr = emptyCell(cell, state.schema)(tr);
        cursorPos = cell.pos;
    }
    if (tr.docChanged && cursorPos) {
        var $pos = tr.doc.resolve(tr.mapping.map(cursorPos));
        var textSelection = Selection.findFrom($pos, 1, true);
        if (textSelection) {
            tr.setSelection(textSelection);
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    }
    return false;
}; };
export var setMultipleCellAttrs = function (attrs, targetCellPosition) { return function (state, dispatch) {
    var cursorPos;
    var tr = state.tr;
    if (isCellSelection(tr.selection)) {
        var selection = tr.selection;
        selection.forEachCell(function (cell, pos) {
            var $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
            tr = setCellAttrs(findCellClosestToPos($pos), attrs)(tr);
        });
        cursorPos = selection.$headCell.pos;
    }
    else if (targetCellPosition) {
        var cell = findCellClosestToPos(tr.doc.resolve(targetCellPosition + 1));
        tr = setCellAttrs(cell, attrs)(tr);
        cursorPos = cell.pos;
    }
    if (tr.docChanged && cursorPos !== undefined) {
        var $pos = tr.doc.resolve(tr.mapping.map(cursorPos));
        if (dispatch) {
            dispatch(tr.setSelection(Selection.near($pos)));
        }
        return true;
    }
    return false;
}; };
export var toggleContextualMenu = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr
            .setMeta(pluginKey, {
            action: ACTIONS.TOGGLE_CONTEXTUAL_MENU,
        })
            .setMeta('addToHistory', false));
    }
    return true;
};
export var setEditorFocus = function (editorHasFocus) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, {
            action: ACTIONS.SET_EDITOR_FOCUS,
            data: { editorHasFocus: editorHasFocus },
        }));
    }
    return true;
}; };
export var setTableRef = function (tableRef) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr
            .setMeta(pluginKey, {
            action: ACTIONS.SET_TABLE_REF,
            data: { tableRef: tableRef },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
export var selectColumn = function (column) { return function (state, dispatch) {
    var tr = selectColumnTransform(column)(state.tr);
    var targetCellPosition;
    var cells = getCellsInColumn(column)(tr.selection);
    if (cells && cells.length) {
        targetCellPosition = cells[0].pos;
    }
    // update contextual menu target cell position on column selection
    if (dispatch) {
        dispatch(tr
            .setMeta(pluginKey, {
            action: ACTIONS.SET_TARGET_CELL_POSITION,
            data: { targetCellPosition: targetCellPosition },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
export var selectRow = function (row) { return function (state, dispatch) {
    var tr = selectRowTransform(row)(state.tr);
    var targetCellPosition;
    var cells = getCellsInRow(row)(tr.selection);
    if (cells && cells.length) {
        targetCellPosition = cells[0].pos;
    }
    // update contextual menu target cell position on row selection
    if (dispatch) {
        dispatch(tr
            .setMeta(pluginKey, {
            action: ACTIONS.SET_TARGET_CELL_POSITION,
            data: { targetCellPosition: targetCellPosition },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
export var showInsertColumnButton = function (columnIndex) { return function (state, dispatch) {
    var insertColumnButtonIndex = getPluginState(state).insertColumnButtonIndex;
    if (columnIndex > -1 && insertColumnButtonIndex !== columnIndex) {
        if (dispatch) {
            dispatch(state.tr
                .setMeta(pluginKey, {
                action: ACTIONS.SHOW_INSERT_COLUMN_BUTTON,
                data: {
                    insertColumnButtonIndex: columnIndex,
                },
            })
                .setMeta('addToHistory', false));
        }
        return true;
    }
    return false;
}; };
export var showInsertRowButton = function (rowIndex) { return function (state, dispatch) {
    var insertRowButtonIndex = getPluginState(state).insertRowButtonIndex;
    if (rowIndex > -1 && insertRowButtonIndex !== rowIndex) {
        if (dispatch) {
            dispatch(state.tr
                .setMeta(pluginKey, {
                action: ACTIONS.SHOW_INSERT_ROW_BUTTON,
                data: {
                    insertRowButtonIndex: rowIndex,
                },
            })
                .setMeta('addToHistory', false));
        }
        return true;
    }
    return false;
}; };
export var hideInsertColumnOrRowButton = function (state, dispatch) {
    var _a = getPluginState(state), insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex;
    if (typeof insertColumnButtonIndex === 'number' ||
        typeof insertRowButtonIndex === 'number') {
        if (dispatch) {
            dispatch(state.tr
                .setMeta(pluginKey, {
                action: ACTIONS.HIDE_INSERT_COLUMN_OR_ROW_BUTTON,
            })
                .setMeta('addToHistory', false));
        }
        return true;
    }
    return false;
};
export var handleCut = function (oldTr, oldState, newState) {
    var oldSelection = oldState.tr.selection;
    var tr = newState.tr;
    if (oldSelection instanceof CellSelection) {
        var $anchorCell = oldTr.doc.resolve(oldTr.mapping.map(oldSelection.$anchorCell.pos));
        var $headCell = oldTr.doc.resolve(oldTr.mapping.map(oldSelection.$headCell.pos));
        tr.setSelection(new CellSelection($anchorCell, $headCell));
        if (tr.selection instanceof CellSelection) {
            if (tr.selection.isRowSelection()) {
                var isHeaderRowRequired = getPluginState(newState).pluginConfig.isHeaderRowRequired;
                tr = deleteRows([], isHeaderRowRequired)(tr);
                analyticsService.trackEvent('atlassian.editor.format.table.delete_row.button');
            }
            else if (tr.selection.isColSelection()) {
                analyticsService.trackEvent('atlassian.editor.format.table.delete_column.button');
                tr = deleteColumns()(tr);
            }
        }
    }
    return tr;
};
export var handleShiftSelection = function (event) { return function (state, dispatch) {
    if (!(state.selection instanceof CellSelection) || !event.shiftKey) {
        return false;
    }
    var selection = state.selection;
    if (selection.isRowSelection() || selection.isColSelection()) {
        var selector = selection.isRowSelection()
            ? "." + ClassName.ROW_CONTROLS_BUTTON_WRAP
            : "." + ClassName.COLUMN_CONTROLS_BUTTON_WRAP;
        var button = closestElement(event.target, selector);
        if (!button) {
            return false;
        }
        var buttons = document.querySelectorAll(selector);
        var index = Array.from(buttons).indexOf(button);
        var rect = getSelectionRect(selection);
        var startCells = selection.isRowSelection()
            ? getCellsInRow(index >= rect.bottom ? rect.top : rect.bottom - 1)(selection)
            : getCellsInColumn(index >= rect.right ? rect.left : rect.right - 1)(selection);
        var endCells = selection.isRowSelection()
            ? getCellsInRow(index)(selection)
            : getCellsInColumn(index)(selection);
        if (startCells && endCells) {
            event.stopPropagation();
            event.preventDefault();
            if (dispatch) {
                dispatch(state.tr.setSelection(new CellSelection(state.doc.resolve(startCells[startCells.length - 1].pos), state.doc.resolve(endCells[0].pos))));
            }
            return true;
        }
    }
    return false;
}; };
export var autoSizeTable = function (view, node, table, basePos, opts) {
    view.dispatch(fixAutoSizedTable(view, node, table, basePos, opts));
    return true;
};
//# sourceMappingURL=actions.js.map