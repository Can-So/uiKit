import * as tslib_1 from "tslib";
import { Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findTable, getSelectionRect } from 'prosemirror-utils';
import { removeEmptyColumns } from './merge';
export var deleteRows = function (rowsToDelete, isHeaderRowRequired) {
    if (rowsToDelete === void 0) { rowsToDelete = []; }
    if (isHeaderRowRequired === void 0) { isHeaderRowRequired = false; }
    return function (tr) {
        var table = findTable(tr.selection);
        if (!table) {
            return tr;
        }
        var map = TableMap.get(table.node);
        if (!rowsToDelete.length) {
            var rect = getSelectionRect(tr.selection);
            if (rect) {
                rowsToDelete = [];
                for (var i = rect.top; i < rect.bottom; i++) {
                    // skip header row if its required
                    if (isHeaderRowRequired) {
                        var cell = table.node.nodeAt(map.map[i * map.width]);
                        if (cell && cell.type !== cell.type.schema.nodes.tableHeader) {
                            rowsToDelete.push(i);
                        }
                    }
                    else {
                        rowsToDelete.push(i);
                    }
                }
            }
        }
        if (!rowsToDelete.length) {
            return tr;
        }
        var rows = [];
        var seen = {};
        var deletedCells = {};
        var _loop_1 = function (rowIndex) {
            var rowCells = [];
            var row = table.node.child(rowIndex);
            var _loop_2 = function (colIndex) {
                var cellPos = map.map[rowIndex * map.width + colIndex];
                var cell = table.node.nodeAt(cellPos);
                if (!cell) {
                    return "continue";
                }
                var cellsInRow = map.cellsInRect({
                    left: 0,
                    top: rowIndex,
                    right: map.width,
                    bottom: rowIndex + 1,
                });
                if (rowsToDelete.indexOf(rowIndex) === -1 && !seen[cellPos]) {
                    // decrement rowspans for row-spanning cells that overlap deleted rows
                    if (cellsInRow.indexOf(cellPos) > -1) {
                        var overlappingRows_1 = 0;
                        rowsToDelete.forEach(function (rowIndexToDelete) {
                            if (rowIndex < rowIndexToDelete &&
                                cell.attrs.rowspan + rowIndex - 1 >= rowIndexToDelete) {
                                overlappingRows_1 += 1;
                            }
                        });
                        if (overlappingRows_1 > 0) {
                            var newCell = cell.type.createChecked(tslib_1.__assign({}, cell.attrs, { rowspan: cell.attrs.rowspan - overlappingRows_1 }), cell.content, cell.marks);
                            rowCells.push(newCell);
                            seen[cellPos] = true;
                            return "continue";
                        }
                    }
                    else if (deletedCells[cellPos]) {
                        // if we're removing a row-spanning cell, we need to add missing cells to rows below
                        var attrs = tslib_1.__assign({}, cell.attrs, { colspan: 1, rowspan: 1 });
                        if (cell.attrs.colwidth) {
                            var pos = colIndex > 0 ? colIndex - map.colCount(cellPos) : 0;
                            attrs.colwidth = cell.attrs.colwidth.slice().splice(pos, 1);
                        }
                        var newCell = cell.type.createChecked(attrs, cell.type.schema.nodes.paragraph.createChecked(), cell.marks);
                        rowCells.push(newCell);
                        return "continue";
                    }
                    // normal cells that we want to keep
                    if (!seen[cellPos]) {
                        seen[cellPos] = true;
                        rowCells.push(cell);
                    }
                }
                else if (cellsInRow.indexOf(cellPos) > -1) {
                    deletedCells[cellPos] = true;
                }
            };
            for (var colIndex = 0; colIndex < map.width; colIndex++) {
                _loop_2(colIndex);
            }
            if (rowCells.length) {
                rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
            }
        };
        for (var rowIndex = 0; rowIndex < map.height; rowIndex++) {
            _loop_1(rowIndex);
        }
        if (!rows.length) {
            return tr;
        }
        var newTable = table.node.type.createChecked(table.node.attrs, rows, table.node.marks);
        var cursorPos = getNextCursorPos(newTable, rowsToDelete);
        return (tr
            .replaceWith(table.pos, table.pos + table.node.nodeSize, removeEmptyColumns(newTable))
            // move cursor before the deleted rows if possible, otherwise - to the first row
            .setSelection(Selection.near(tr.doc.resolve(table.pos + cursorPos))));
    };
};
function getNextCursorPos(table, deletedRows) {
    var minRow = Math.min.apply(Math, tslib_1.__spread(deletedRows));
    var nextRowWithCursor = minRow > 0 ? minRow - 1 : 0;
    var map = TableMap.get(table);
    return map.map[nextRowWithCursor * map.width];
}
//# sourceMappingURL=delete-rows.js.map