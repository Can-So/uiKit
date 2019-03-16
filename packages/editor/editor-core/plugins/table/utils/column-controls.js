import { findTable, getCellsInColumn, findDomRefAtPos, getSelectionRect, isColumnSelected, isTableSelected, } from 'prosemirror-utils';
import { TableMap, CellSelection } from 'prosemirror-tables';
import { tableDeleteButtonSize } from '../ui/styles';
export var getColumnsWidths = function (view) {
    var selection = view.state.selection;
    var widths = [];
    var table = findTable(selection);
    if (table) {
        var map = TableMap.get(table.node);
        var domAtPos = view.domAtPos.bind(view);
        for (var i = 0; i < map.width; i++) {
            var cells = getCellsInColumn(i)(selection);
            var cell = cells[0];
            if (cell) {
                var cellRef = findDomRefAtPos(cell.pos, domAtPos);
                var rect = cellRef.getBoundingClientRect();
                widths[i] = (rect ? rect.width : cellRef.offsetWidth) + 1;
                i += cell.node.attrs.colspan - 1;
            }
        }
    }
    return widths;
};
export var isColumnInsertButtonVisible = function (index, selection) {
    var rect = getSelectionRect(selection);
    if (rect &&
        selection instanceof CellSelection &&
        selection.isColSelection() &&
        !isTableSelected(selection) &&
        rect.right - index === index - rect.left) {
        return false;
    }
    return true;
};
export var isColumnDeleteButtonVisible = function (selection) {
    if (!isTableSelected(selection) &&
        (selection instanceof CellSelection && selection.isColSelection())) {
        return true;
    }
    return false;
};
export var getColumnDeleteButtonParams = function (columnsWidths, selection) {
    var rect = getSelectionRect(selection);
    if (!rect) {
        return null;
    }
    var width = 0;
    var offset = 0;
    // find the columns before the selection
    for (var i = 0; i < rect.left; i++) {
        var colWidth = columnsWidths[i];
        if (colWidth) {
            offset += colWidth - 1;
        }
    }
    // these are the selected columns widths
    var indexes = [];
    for (var i = rect.left; i < rect.right; i++) {
        var colWidth = columnsWidths[i];
        if (colWidth) {
            width += colWidth;
            indexes.push(i);
        }
    }
    var left = offset + width / 2 - tableDeleteButtonSize / 2;
    return { left: left, indexes: indexes };
};
export var getColumnsParams = function (columnsWidths) {
    var columns = [];
    for (var i = 0, count = columnsWidths.length; i < count; i++) {
        var width = columnsWidths[i];
        if (!width) {
            continue;
        }
        var endIndex = columnsWidths.length;
        for (var k = i + 1, count_1 = columnsWidths.length; k < count_1; k++) {
            if (columnsWidths[k]) {
                endIndex = k;
                break;
            }
        }
        columns.push({ startIndex: i, endIndex: endIndex, width: width });
    }
    return columns;
};
export var getColumnClassNames = function (index, selection, hoveredColumns, isInDanger, isResizing) {
    if (hoveredColumns === void 0) { hoveredColumns = []; }
    var classNames = [];
    if (isColumnSelected(index)(selection) ||
        (hoveredColumns.indexOf(index) > -1 && !isResizing)) {
        classNames.push('active');
        if (isInDanger) {
            classNames.push('danger');
        }
    }
    return classNames.join(' ');
};
//# sourceMappingURL=column-controls.js.map