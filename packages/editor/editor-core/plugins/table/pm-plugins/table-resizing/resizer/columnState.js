import { contentWidth } from './contentWidth';
import { calculateColWidth, unitToNumber, addContainerLeftRightPadding, getCellsRefsInColumn, } from './utils';
import { tableNewColumnMinWidth } from '@findable/editor-common';
var ColumnState = /** @class */ (function () {
    function ColumnState(width, minWidth) {
        if (minWidth === void 0) { minWidth = 0; }
        this.width = width;
        this.minWidth = minWidth;
        return Object.freeze(this);
    }
    Object.defineProperty(ColumnState.prototype, "freeSpace", {
        get: function () {
            var _a = this, minWidth = _a.minWidth, width = _a.width;
            return Math.max(width - minWidth, 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new ResizeState based on the current
     * appearance of an element.
     * @param {Function} domAtPos Find the DOM node that corresponds to the given position
     * @param {PMNode} table ProseMirror node
     * @param {number} colIdx The column index
     * @param {number} minWidth Minimum width a column is permitted to be
     */
    ColumnState.fromDOM = function (domAtPos, table, start, colIdx, minWidth) {
        var cells = getCellsRefsInColumn(colIdx, table, start, domAtPos);
        var width = calculateColWidth(cells);
        var minColWidth = calculateColWidth(cells, function (col, computedStyle, colspan) {
            if (colspan && colspan > 1) {
                return unitToNumber(computedStyle.width);
            }
            var minContentWidth = contentWidth(col, col).minWidth;
            // for newly created column (where width < minWidth) we set minWidth = 140px
            var minCellWidth = width < minWidth ? tableNewColumnMinWidth : minWidth;
            // Override the min width, if there is content that can't collapse
            // Past a certain width.
            return Math.max(addContainerLeftRightPadding(minContentWidth, computedStyle), minContentWidth, minCellWidth);
        });
        return new ColumnState(width, minColWidth);
    };
    ColumnState.prototype.clone = function (newWidth) {
        var _a = this, minWidth = _a.minWidth, width = _a.width;
        return new ColumnState(newWidth ? newWidth : width, minWidth);
    };
    return ColumnState;
}());
export default ColumnState;
//# sourceMappingURL=columnState.js.map