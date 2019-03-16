import { getSelectionRect, isRowSelected, isTableSelected, } from 'prosemirror-utils';
import { CellSelection } from 'prosemirror-tables';
import { tableDeleteButtonSize } from '../ui/styles';
export var getRowHeights = function (tableRef) {
    var heights = [];
    var rows = tableRef.querySelectorAll('tr');
    for (var i = 0, count = rows.length; i < count; i++) {
        var rect = rows[i].getBoundingClientRect();
        heights[i] = (rect ? rect.height : rows[i].offsetHeight) + 1;
    }
    return heights;
};
export var isRowInsertButtonVisible = function (index, selection) {
    var rect = getSelectionRect(selection);
    if (rect &&
        selection instanceof CellSelection &&
        selection.isRowSelection() &&
        !isTableSelected(selection) &&
        rect.bottom - index === index - rect.top) {
        return false;
    }
    return true;
};
export var isRowDeleteButtonVisible = function (selection) {
    if (!isTableSelected(selection) &&
        (selection instanceof CellSelection && selection.isRowSelection())) {
        return true;
    }
    return false;
};
export var getRowDeleteButtonParams = function (rowsHeights, selection) {
    var rect = getSelectionRect(selection);
    if (!rect) {
        return null;
    }
    var height = 0;
    var offset = 0;
    // find the rows before the selection
    for (var i = 0; i < rect.top; i++) {
        var rowHeight = rowsHeights[i];
        if (rowHeight) {
            offset += rowHeight - 1;
        }
    }
    // these are the selected rows widths
    var indexes = [];
    for (var i = rect.top; i < rect.bottom; i++) {
        var rowHeight = rowsHeights[i];
        if (rowHeight) {
            height += rowHeight - 1;
            indexes.push(i);
        }
    }
    var top = offset + height / 2 - tableDeleteButtonSize / 2;
    return { top: top, indexes: indexes };
};
export var getRowsParams = function (rowsHeights) {
    var rows = [];
    for (var i = 0, count = rowsHeights.length; i < count; i++) {
        var height = rowsHeights[i];
        if (!height) {
            continue;
        }
        var endIndex = rowsHeights.length;
        for (var k = i + 1, count_1 = rowsHeights.length; k < count_1; k++) {
            if (rowsHeights[k]) {
                endIndex = k;
                break;
            }
        }
        rows.push({ startIndex: i, endIndex: endIndex, height: height });
    }
    return rows;
};
export var getRowClassNames = function (index, selection, hoveredRows, isInDanger, isResizing) {
    if (hoveredRows === void 0) { hoveredRows = []; }
    var classNames = [];
    if (isRowSelected(index)(selection) ||
        (hoveredRows.indexOf(index) > -1 && !isResizing)) {
        classNames.push('active');
        if (isInDanger) {
            classNames.push('danger');
        }
    }
    return classNames.join(' ');
};
//# sourceMappingURL=row-controls.js.map