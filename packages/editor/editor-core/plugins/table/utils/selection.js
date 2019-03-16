import { CellSelection, TableMap } from 'prosemirror-tables';
import { findTable, isCellSelection, getSelectionRect, getSelectionRangeInColumn, getSelectionRangeInRow, } from 'prosemirror-utils';
export var isSelectionUpdated = function (oldSelection, newSelection) {
    return !!(!newSelection && oldSelection) ||
        (isCellSelection(oldSelection) !== isCellSelection(newSelection) ||
            (isCellSelection(oldSelection) &&
                isCellSelection(newSelection) &&
                oldSelection.ranges !== newSelection.ranges));
};
var isRectangularCellSelection = function (selection, rect) {
    var table = findTable(selection);
    if (!table) {
        return true;
    }
    var _a = TableMap.get(table.node), width = _a.width, height = _a.height, map = _a.map;
    var indexTop = rect.top * width + rect.left;
    var indexLeft = indexTop;
    var indexBottom = (rect.bottom - 1) * width + rect.left;
    var indexRight = indexTop + (rect.right - rect.left - 1);
    for (var i = rect.top; i < rect.bottom; i++) {
        if ((rect.left > 0 && map[indexLeft] === map[indexLeft - 1]) ||
            (rect.right < width && map[indexRight] === map[indexRight + 1])) {
            return false;
        }
        indexLeft += width;
        indexRight += width;
    }
    for (var i = rect.left; i < rect.right; i++) {
        if ((rect.top > 0 && map[indexTop] === map[indexTop - width]) ||
            (rect.bottom < height && map[indexBottom] === map[indexBottom + width])) {
            return false;
        }
        indexTop++;
        indexBottom++;
    }
    return true;
};
export var normalizeSelection = function (tr) {
    var selection = tr.selection;
    var rect = getSelectionRect(selection);
    if (!rect ||
        !(selection instanceof CellSelection) ||
        isRectangularCellSelection(selection, rect)) {
        return tr;
    }
    if (selection.isColSelection()) {
        var $anchor = getSelectionRangeInColumn(rect.left)(tr).$anchor;
        var $head = getSelectionRangeInColumn(rect.right - 1)(tr).$head;
        return tr.setSelection(new CellSelection($anchor, $head));
    }
    if (selection.isRowSelection()) {
        var $anchor = getSelectionRangeInRow(rect.top)(tr).$anchor;
        var $head = getSelectionRangeInRow(rect.bottom - 1)(tr).$head;
        return tr.setSelection(new CellSelection($anchor, $head));
    }
    return tr;
};
//# sourceMappingURL=selection.js.map