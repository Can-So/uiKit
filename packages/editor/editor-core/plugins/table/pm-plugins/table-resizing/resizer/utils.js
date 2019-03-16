import * as tslib_1 from "tslib";
import { TableMap } from 'prosemirror-tables';
import { findDomRefAtPos } from 'prosemirror-utils';
export var makeColIdxPair = function (cols) {
    return cols.map(function (col, idx) {
        return { col: col, idx: idx };
    });
};
export var findFreeCol = function (colIdxObj) {
    if (colIdxObj.length === 0) {
        return null;
    }
    var freeAmount = colIdxObj[0].col.freeSpace;
    var freeIdx = 0;
    colIdxObj.slice(1).forEach(function (_a, idx) {
        var col = _a.col;
        var isGreatest = col.freeSpace > freeAmount;
        if (isGreatest) {
            freeAmount = col.freeSpace;
            freeIdx = idx + 1;
        }
    });
    return freeIdx;
};
export var findNextFreeCol = function (colIdxObj, direction) {
    if (colIdxObj.length === 0) {
        return -1;
    }
    if (direction < 0) {
        colIdxObj = colIdxObj.slice().reverse();
    }
    var freeIdx = -1;
    colIdxObj.forEach(function (_a, idx) {
        var col = _a.col;
        if (col.freeSpace && freeIdx === -1) {
            freeIdx = idx;
        }
    });
    if (freeIdx === -1) {
        return -1;
    }
    return direction < 0 ? colIdxObj.length - 1 - freeIdx : freeIdx;
};
export var getRowChildren = function (row) {
    var children = [];
    var _loop_1 = function (i) {
        var currentCol = row.children[i];
        var colspan = Number(currentCol.getAttribute('colspan'));
        if (colspan > 1) {
            children.push.apply(children, tslib_1.__spread(Array.from({ length: colspan }, function (_) { return currentCol; })));
        }
        else {
            children.push(currentCol);
        }
    };
    for (var i = 0; i < row.childElementCount; i++) {
        _loop_1(i);
    }
    return children;
};
var defaultCalculateColWidthCb = function (col, colComputedStyle) { return unitToNumber(colComputedStyle.width); };
export var calculateColWidth = function (cells, calculateColWidthCb) {
    if (calculateColWidthCb === void 0) { calculateColWidthCb = defaultCalculateColWidthCb; }
    var maxColWidth = 0;
    var colSpanWidth = 0;
    cells.forEach(function (col) {
        var colComputedStyle = getComputedStyle(col);
        var colspan = Number(col.getAttribute('colspan') || 1);
        if (colspan > 1) {
            colSpanWidth = calculateColWidthCb(col, colComputedStyle, colspan);
            return;
        }
        if (colComputedStyle) {
            var colWidth = calculateColWidthCb(col, colComputedStyle, colspan);
            maxColWidth = Math.max(colWidth, maxColWidth);
        }
    });
    return maxColWidth || colSpanWidth;
};
export var unitToNumber = function (unit) {
    if (unit) {
        return parseInt(unit, 10);
    }
    return 0;
};
export var addContainerLeftRightPadding = function (amount, computedStyle) {
    return (amount +
        unitToNumber(computedStyle.paddingLeft) +
        unitToNumber(computedStyle.paddingRight));
};
export var getCellsRefsInColumn = function (columnIndex, table, start, domAtPos) {
    var map = TableMap.get(table);
    var cellsPositions = map.cellsInRect({
        left: columnIndex,
        right: columnIndex + 1,
        top: 0,
        bottom: map.height,
    });
    var cells = [];
    cellsPositions.forEach(function (pos) {
        var col = findDomRefAtPos(pos + start, domAtPos);
        if (col) {
            cells.push(col);
        }
    });
    return cells;
};
//# sourceMappingURL=utils.js.map