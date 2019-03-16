import * as tslib_1 from "tslib";
import { Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findTable, getSelectionRect } from 'prosemirror-utils';
export var deleteColumns = function (columnsToDelete) {
    if (columnsToDelete === void 0) { columnsToDelete = []; }
    return function (tr) {
        var table = findTable(tr.selection);
        if (!table) {
            return tr;
        }
        if (!columnsToDelete.length) {
            var rect = getSelectionRect(tr.selection);
            if (rect) {
                columnsToDelete = [];
                for (var i = rect.left; i < rect.right; i++) {
                    columnsToDelete.push(i);
                }
            }
        }
        if (!columnsToDelete.length) {
            return tr;
        }
        var map = TableMap.get(table.node);
        var rows = [];
        var seen = {};
        var deletedCells = {};
        for (var rowIndex = 0; rowIndex < map.height; rowIndex++) {
            var rowCells = [];
            var row = table.node.child(rowIndex);
            var _loop_1 = function (colIndex) {
                var cellPos = map.map[rowIndex * map.width + colIndex];
                var cell = table.node.nodeAt(cellPos);
                if (!cell) {
                    return "continue";
                }
                var cellsInColumn = map.cellsInRect({
                    left: colIndex,
                    top: 0,
                    right: colIndex + 1,
                    bottom: map.height,
                });
                if (columnsToDelete.indexOf(colIndex) === -1) {
                    // decrement colspans for col-spanning cells that overlap deleted columns
                    if (cellsInColumn.indexOf(cellPos) > -1 && !seen[cellPos]) {
                        var overlappingCols_1 = 0;
                        columnsToDelete.forEach(function (colIndexToDelete) {
                            if (colIndex < colIndexToDelete &&
                                cell.attrs.colspan + colIndex - 1 >= colIndexToDelete) {
                                overlappingCols_1 += 1;
                            }
                        });
                        if (overlappingCols_1 > 0) {
                            var attrs = tslib_1.__assign({}, cell.attrs, { colspan: cell.attrs.colspan - overlappingCols_1 });
                            if (cell.attrs.colwidth) {
                                var minColIndex = Math.min.apply(Math, tslib_1.__spread(columnsToDelete));
                                var pos = minColIndex > 0 ? minColIndex - map.colCount(cellPos) : 0;
                                var colwidth = cell.attrs.colwidth.slice() || [];
                                colwidth.splice(pos, overlappingCols_1);
                                attrs.colwidth = colwidth;
                            }
                            var newCell = cell.type.createChecked(attrs, cell.content, cell.marks);
                            rowCells.push(newCell);
                            seen[cellPos] = true;
                            return "continue";
                        }
                    }
                    else if (deletedCells[cellPos]) {
                        // if we're removing a col-spanning cell, we need to add missing cells to columns to the right
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
                else if (cellsInColumn.indexOf(cellPos) > -1) {
                    deletedCells[cellPos] = true;
                }
            };
            for (var colIndex = 0; colIndex < map.width; colIndex++) {
                _loop_1(colIndex);
            }
            if (rowCells.length) {
                rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
            }
        }
        if (!rows.length) {
            return tr;
        }
        var newTable = table.node.type.createChecked(table.node.attrs, rows, table.node.marks);
        var cursorPos = getNextCursorPos(newTable, columnsToDelete);
        return (tr
            .replaceWith(table.pos, table.pos + table.node.nodeSize, fixRowSpans(newTable))
            // move cursor to the left of the deleted columns if possible, otherwise - to the first column
            .setSelection(Selection.near(tr.doc.resolve(table.pos + cursorPos))));
    };
};
function getNextCursorPos(table, deletedColumns) {
    var minColumn = Math.min.apply(Math, tslib_1.__spread(deletedColumns));
    var nextColumnWithCursor = minColumn > 0 ? minColumn - 1 : 0;
    var map = TableMap.get(table);
    return map.map[nextColumnWithCursor];
}
// returns an array of numbers, each number indicates the minimum rowSpan in each row
function getMinRowSpans(table) {
    var minRowSpans = [];
    for (var rowIndex = 0; rowIndex < table.childCount; rowIndex++) {
        var rowSpans = [];
        var row = table.child(rowIndex);
        for (var colIndex = 0; colIndex < row.childCount; colIndex++) {
            var cell = row.child(colIndex);
            rowSpans.push(cell.attrs.rowspan);
        }
        minRowSpans[rowIndex] = Math.min.apply(Math, tslib_1.__spread(rowSpans));
    }
    return minRowSpans;
}
function fixRowSpans(table) {
    var map = TableMap.get(table);
    var minRowSpans = getMinRowSpans(table);
    if (!minRowSpans.some(function (rowspan) { return rowspan > 1; })) {
        return table;
    }
    var rows = [];
    for (var rowIndex = 0; rowIndex < map.height; rowIndex++) {
        var row = table.child(rowIndex);
        if (minRowSpans[rowIndex] === 1) {
            rows.push(row);
        }
        else {
            var rowCells = [];
            for (var colIndex = 0; colIndex < row.childCount; colIndex++) {
                var cell = row.child(colIndex);
                var rowspan = cell.attrs.rowspan - minRowSpans[rowIndex] + 1;
                var newCell = cell.type.createChecked(tslib_1.__assign({}, cell.attrs, { rowspan: rowspan }), cell.content, cell.marks);
                rowCells.push(newCell);
            }
            rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
        }
    }
    return table.type.createChecked(table.attrs, rows, table.marks);
}
//# sourceMappingURL=delete-columns.js.map