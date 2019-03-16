import * as tslib_1 from "tslib";
import { CellSelection, TableMap } from 'prosemirror-tables';
import { Selection } from 'prosemirror-state';
import { Fragment } from 'prosemirror-model';
import { getSelectionRect, findTable } from 'prosemirror-utils';
import { fireAnalytics } from './fix-tables';
// re-creates table node with merged cells
export function mergeCells(tr) {
    var selection = tr.selection;
    if (!(selection instanceof CellSelection) || !canMergeCells(tr)) {
        return tr;
    }
    var rect = getSelectionRect(selection);
    var table = findTable(selection);
    var map = TableMap.get(table.node);
    var seen = [];
    var selectedCells = map.cellsInRect(rect);
    var mergedCellPos;
    var rows = [];
    for (var rowIndex = 0; rowIndex < map.height; rowIndex++) {
        var rowCells = [];
        var row = table.node.child(rowIndex);
        for (var colIndex = 0; colIndex < map.width; colIndex++) {
            var cellPos = map.map[rowIndex * map.width + colIndex];
            var cell = table.node.nodeAt(cellPos);
            if (!cell || seen.indexOf(cellPos) > -1) {
                continue;
            }
            seen.push(cellPos);
            // merged cell
            if (colIndex === rect.left && rowIndex === rect.top) {
                mergedCellPos = cellPos;
                // merge content of the selected cells, dropping empty cells
                var content = isEmptyCell(cell) ? Fragment.empty : cell.content;
                var seenContent = [mergedCellPos];
                for (var i = rect.top; i < rect.bottom; i++) {
                    for (var j = rect.left; j < rect.right; j++) {
                        var pos = map.map[i * map.width + j];
                        if (seenContent.indexOf(pos) === -1) {
                            seenContent.push(pos);
                            var copyCell = table.node.nodeAt(pos);
                            if (copyCell && !isEmptyCell(copyCell)) {
                                content = content.append(copyCell.content);
                            }
                        }
                    }
                }
                // update colspan and rowspan of the merged cell to span the selection
                var attrs = addColSpan(tslib_1.__assign({}, cell.attrs, { rowspan: rect.bottom - rect.top }), cell.attrs.colspan, rect.right - rect.left - cell.attrs.colspan);
                var newCell = content === Fragment.empty
                    ? cell.type.createAndFill(attrs, content, cell.marks)
                    : cell.type.createChecked(attrs, content, cell.marks);
                rowCells.push(newCell);
            }
            else if (selectedCells.indexOf(cellPos) === -1) {
                // if its one of the selected cells, but not the merged cell, we get rid of it
                // otherwise we keep the cell
                rowCells.push(cell);
            }
        }
        if (rowCells.length) {
            rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
        }
        else {
            // empty row, we need to fix rowspans for rows above the current one
            for (var i = rows.length - 1; i >= 0; i--) {
                var prevRow = rows[i];
                var cells = [];
                var rowChanged = false;
                for (var j = 0; j < prevRow.childCount; j++) {
                    var cell = prevRow.child(j);
                    if (cell.attrs.rowspan + i - 1 >= rows.length) {
                        rowChanged = true;
                        cells.push(cell.type.createChecked(tslib_1.__assign({}, cell.attrs, { rowspan: cell.attrs.rowspan - 1 }), cell.content, cell.marks));
                    }
                    else {
                        cells.push(cell);
                    }
                }
                if (rowChanged) {
                    rows[i] = row.type.createChecked(prevRow.attrs, cells, prevRow.marks);
                }
            }
        }
    }
    // empty tables? cancel merging like nothing happened
    if (!rows.length) {
        // using the same message to check if the problem disappears
        fireAnalytics({ message: 'removeEmptyRows', method: 'mergeCells' });
        return tr;
    }
    var newTable = table.node.type.createChecked(table.node.attrs, rows, table.node.marks);
    return tr
        .replaceWith(table.pos, table.pos + table.node.nodeSize, removeEmptyColumns(newTable))
        .setSelection(Selection.near(tr.doc.resolve((mergedCellPos || 0) + table.start)));
}
export function canMergeCells(tr) {
    var selection = tr.selection;
    if (!(selection instanceof CellSelection) ||
        selection.$anchorCell.pos === selection.$headCell.pos) {
        return false;
    }
    var rect = getSelectionRect(selection);
    if (!rect) {
        return false;
    }
    var table = selection.$anchorCell.node(-1);
    var map = TableMap.get(table);
    if (cellsOverlapRectangle(map, rect)) {
        return false;
    }
    return true;
}
function isEmptyCell(cell) {
    var content = cell.content;
    return (content.childCount === 1 &&
        content.firstChild &&
        content.firstChild.isTextblock &&
        content.firstChild.childCount === 0);
}
function addColSpan(attrs, pos, span) {
    if (span === void 0) { span = 1; }
    var newAttrs = tslib_1.__assign({}, attrs, { colspan: (attrs.colspan || 1) + span });
    if (newAttrs.colwidth) {
        newAttrs.colwidth = newAttrs.colwidth.slice();
        for (var i = 0; i < span; i++) {
            newAttrs.colwidth.splice(pos, 0, 0);
        }
    }
    return newAttrs;
}
function cellsOverlapRectangle(_a, rect) {
    var width = _a.width, height = _a.height, map = _a.map;
    var indexTop = rect.top * width + rect.left;
    var indexLeft = indexTop;
    var indexBottom = (rect.bottom - 1) * width + rect.left;
    var indexRight = indexTop + (rect.right - rect.left - 1);
    for (var i = rect.top; i < rect.bottom; i++) {
        if ((rect.left > 0 && map[indexLeft] === map[indexLeft - 1]) ||
            (rect.right < width && map[indexRight] === map[indexRight + 1])) {
            return true;
        }
        indexLeft += width;
        indexRight += width;
    }
    for (var i = rect.left; i < rect.right; i++) {
        if ((rect.top > 0 && map[indexTop] === map[indexTop - width]) ||
            (rect.bottom < height && map[indexBottom] === map[indexBottom + width])) {
            return true;
        }
        indexTop++;
        indexBottom++;
    }
    return false;
}
// returns an array of numbers, each number indicates the minimum colSpan in each column
function getMinColSpans(table) {
    var map = TableMap.get(table);
    var minColspans = [];
    for (var colIndex = map.width - 1; colIndex >= 0; colIndex--) {
        var cellsPositions = map.cellsInRect({
            left: colIndex,
            right: colIndex + 1,
            top: 0,
            bottom: map.height,
        });
        if (cellsPositions.length) {
            var colspans = cellsPositions.map(function (cellPos) {
                var cell = table.nodeAt(cellPos);
                if (cell) {
                    return cell.attrs.colspan;
                }
            });
            var minColspan = Math.min.apply(Math, tslib_1.__spread(colspans));
            // only care about the case when the next column is invisible
            if (!minColspans[colIndex + 1]) {
                minColspans[colIndex] = minColspan;
            }
            else {
                minColspans[colIndex] = 1;
            }
        }
    }
    return minColspans;
}
export function removeEmptyColumns(table) {
    var map = TableMap.get(table);
    var minColSpans = getMinColSpans(table);
    if (!minColSpans.some(function (colspan) { return colspan > 1; })) {
        return table;
    }
    var rows = [];
    var _loop_1 = function (rowIndex) {
        var cellsByCols = {};
        Object.keys(minColSpans)
            .map(Number)
            .forEach(function (colIndex) {
            var cellPos = map.map[colIndex + rowIndex * map.width];
            var rect = map.findCell(cellPos);
            var cell = cellsByCols[rect.left] || table.nodeAt(cellPos);
            if (cell && rect.top === rowIndex) {
                if (minColSpans[colIndex] > 1) {
                    var colspan = cell.attrs.colspan - minColSpans[colIndex] + 1;
                    var colwidth = cell.attrs.colwidth;
                    var newCell = cell.type.createChecked(tslib_1.__assign({}, cell.attrs, { colspan: colspan, colwidth: colwidth ? colwidth.slice(0, colspan) : null }), cell.content, cell.marks);
                    cellsByCols[rect.left] = newCell;
                }
                else {
                    cellsByCols[rect.left] = cell;
                }
            }
        });
        var rowCells = Object.keys(cellsByCols).map(function (col) { return cellsByCols[col]; });
        var row = table.child(rowIndex);
        if (row) {
            rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
        }
    };
    for (var rowIndex = 0; rowIndex < map.height; rowIndex++) {
        _loop_1(rowIndex);
    }
    if (!rows.length) {
        return table;
    }
    return table.type.createChecked(table.attrs, rows, table.marks);
}
//# sourceMappingURL=merge.js.map