import ResizeState from './resizeState';
import ColumnState from './columnState';
import { insertColgroupFromNode } from '../../../utils';
var Resizer = /** @class */ (function () {
    function Resizer(tableElem, colgroupChildren, config, initialState) {
        this.tableElem = tableElem;
        this.colgroupChildren = colgroupChildren;
        this.minWidth = config.minWidth;
        this.node = config.node;
        this.currentState = initialState;
    }
    /**
     * Create resizer from given DOM element
     */
    Resizer.fromDOM = function (view, tableElem, config) {
        var maxSize = config.maxSize, minWidth = config.minWidth, node = config.node, start = config.start;
        var domAtPos = view.domAtPos.bind(view);
        var colgroupChildren = insertColgroupFromNode(tableElem, node);
        return new Resizer(tableElem, colgroupChildren, config, 
        // update state from DOM
        new ResizeState(Array.from(colgroupChildren).map(function (col, i) {
            return ColumnState.fromDOM(domAtPos, node, start, i, minWidth);
        }), maxSize));
    };
    /**
     * Applies a resize state to the DOM. Does NOT update state.
     */
    Resizer.prototype.apply = function (state) {
        var _this = this;
        state.cols
            .filter(function (col) { return !!col.width; }) // if width is 0, we dont want to apply that.
            .forEach(function (col, i) {
            _this.colgroupChildren[i].style.width = col.width + "px";
        });
    };
    /**
     * Applies the column resize state to the DOM, and sets it for future use.
     */
    Resizer.prototype.update = function (state) {
        this.apply(state);
        this.currentState = state;
    };
    /**
     * Resize a given column by an amount from the current state and return the new state.
     *
     * You can then either:
     * - #apply() this new state to the DOM while dragging resize handles,
     * - or #update() the resizer state when resizing is finished (typically when the user releases the resize handle)
     * @param {number} col The column index to resize
     * @param {number} amount Delta of pixels to resize by. Can be positive or negative.
     */
    Resizer.prototype.resize = function (col, amount) {
        return this.currentState.resize(col, amount);
    };
    /**
     * Scale the table to a given size, update state and DOM and return the new state.
     * @param {number} newSize the table new size
     */
    Resizer.prototype.scale = function (newSize) {
        var newState = this.currentState.scale(newSize);
        this.update(newState);
        return newState;
    };
    Resizer.prototype.getCol = function (colIdx) {
        return this.currentState.cols[colIdx];
    };
    return Resizer;
}());
export default Resizer;
//# sourceMappingURL=resizer.js.map