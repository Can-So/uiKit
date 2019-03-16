import * as tslib_1 from "tslib";
import { findNextFreeCol, makeColIdxPair } from './utils';
export var ColType;
(function (ColType) {
    ColType["SOURCE"] = "src";
    ColType["DEST"] = "dest";
})(ColType || (ColType = {}));
export function amountFor(colType) {
    return function (amount) {
        return colType === ColType.SOURCE
            ? amount > 0
                ? -amount
                : amount
            : amount < 0
                ? -amount
                : amount;
    };
}
export function widthFor(colType) {
    return function (amount, srcCol, destCol) {
        return (colType === ColType.SOURCE ? srcCol : destCol).width +
            amountFor(colType)(amount);
    };
}
// TODO: should handle when destIdx:
// - is beyond the range, and then not give it back
export function moveSpaceFrom(state, srcIdx, destIdx, amount, useFreeSpace) {
    if (useFreeSpace === void 0) { useFreeSpace = true; }
    var srcCol = state.cols[srcIdx];
    var destCol = state.cols[destIdx];
    if (useFreeSpace) {
        // if taking more than source column's free space, only take that much
        if (amountFor(ColType.DEST)(amount) > srcCol.freeSpace) {
            amount = amount > 0 ? srcCol.freeSpace : -srcCol.freeSpace;
        }
    }
    // if the source column shrinks past its min size, don't give the space away
    if (amountFor(ColType.SOURCE)(amount) < 0 &&
        widthFor(ColType.SOURCE)(amount, srcCol, destCol) < srcCol.minWidth) {
        amount = srcCol.width - srcCol.minWidth;
    }
    var newDest = destCol
        ? destCol.clone(widthFor(ColType.DEST)(amount, srcCol, destCol))
        : undefined;
    if (!newDest && amountFor(ColType.SOURCE)(amount) < 0) {
        // non-zero-sum game, ensure that we're not removing more than the total table width either
        if (state.totalWidth -
            srcCol.width +
            widthFor(ColType.SOURCE)(amount, srcCol, destCol) <
            state.maxSize) {
            // would shrink table below max width, stop it
            amount =
                state.maxSize - (state.totalWidth - srcCol.width) - srcCol.width - 1;
        }
    }
    var newSrc = srcCol.clone(widthFor(ColType.SOURCE)(amount, srcCol, destCol));
    var newCols = state.cols
        .map(function (existingCol, idx) {
        return idx === srcIdx ? newSrc : idx === destIdx ? newDest : existingCol;
    })
        .filter(Boolean);
    return { state: new ResizeState(newCols, state.maxSize), amount: amount };
}
export function getCandidates(state, destIdx, amount) {
    var candidates = makeColIdxPair(state.cols);
    // only consider rows after the selected column in the direction of resize
    return amount < 0
        ? candidates.slice(0, destIdx)
        : candidates.slice(destIdx + 1);
}
export function stackSpace(state, destIdx, amount) {
    var candidates = getCandidates(state, destIdx, amount);
    while (candidates.length && amount) {
        // search for most (or least) free space in candidates
        var candidateIdx = state.freeColFunc(candidates, amount);
        if (candidateIdx === -1) {
            // no free space remains
            break;
        }
        var _a = candidates.splice(candidateIdx, 1)[0], srcCol = _a.col, srcIdx = _a.idx;
        if (srcCol.freeSpace <= 0) {
            // no more columns with free space remain
            break;
        }
        var res = moveSpaceFrom(state, srcIdx, destIdx, amount);
        state = res.state;
        amount -= res.amount;
    }
    return {
        state: state,
        remaining: amount,
    };
}
export function reduceSpace(state, amount, ignoreCols) {
    if (ignoreCols === void 0) { ignoreCols = []; }
    var remaining = amount;
    var _loop_1 = function () {
        // filter candidates only with free space
        var candidates = makeColIdxPair(state.cols).filter(function (colIdxPair) {
            return (colIdxPair.col.freeSpace && ignoreCols.indexOf(colIdxPair.idx) === -1);
        });
        if (candidates.length === 0) {
            return "break";
        }
        var requestedResize = Math.ceil(remaining / candidates.length);
        if (requestedResize === 0) {
            return "break";
        }
        candidates.forEach(function (candidate) {
            var newWidth = candidate.col.width - requestedResize;
            var remainder = 0;
            if (newWidth < candidate.col.minWidth) {
                // If the new requested width is less than our min
                // Calc what width we didn't use, we'll try extract that
                // from other cols.
                remainder = candidate.col.minWidth - newWidth;
                newWidth = candidate.col.minWidth;
            }
            state = new ResizeState(tslib_1.__spread(state.cols.slice(0, candidate.idx), [
                candidate.col.clone(newWidth)
            ], state.cols.slice(candidate.idx + 1)), state.maxSize, state.breakout, state.freeColFunc);
            remaining -= requestedResize + remainder;
        });
    };
    // keep trying to resolve resize request until we run out of free space,
    // or nothing to resize
    while (remaining) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    return state;
}
var ResizeState = /** @class */ (function () {
    function ResizeState(cols, maxSize, breakout, freeColFunc) {
        if (breakout === void 0) { breakout = false; }
        if (freeColFunc === void 0) { freeColFunc = findNextFreeCol; }
        this.cols = cols;
        this.maxSize = maxSize;
        this.breakout = breakout;
        this.freeColFunc = freeColFunc;
        return Object.freeze(this);
    }
    Object.defineProperty(ResizeState.prototype, "totalWidth", {
        get: function () {
            return this.cols.reduce(function (totalWidth, col) { return totalWidth + col.width; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    ResizeState.prototype.grow = function (colIdx, amount) {
        // if last column
        if (!this.cols[colIdx + 1]) {
            return new ResizeState(this.cols, this.maxSize, true);
        }
        var newState = this.clone();
        if (amount && this.cols[colIdx + 1]) {
            // if we couldn't naturally resize and we're growing this one,
            // directly shrink the adjacent one with the remaining width
            var res = moveSpaceFrom(this, colIdx + 1, colIdx, amount, false);
            newState = res.state;
            amount -= res.amount;
        }
        if (amount) {
            // if we still have remaining space, directly resize the column
            var oldCol = newState.cols[colIdx];
            if (amount < 0 && oldCol.width + amount < oldCol.minWidth) {
                amount = -(oldCol.width - oldCol.minWidth);
            }
            return new ResizeState(tslib_1.__spread(newState.cols.slice(0, colIdx), [
                oldCol.clone(oldCol.width + amount)
            ], newState.cols.slice(colIdx + 1)), newState.maxSize, newState.breakout);
        }
        return newState;
    };
    ResizeState.prototype.shrink = function (colIdx, amount) {
        var canRedistribute = this.cols[colIdx + 1] || this.totalWidth > this.maxSize;
        if (!canRedistribute) {
            return this.clone();
        }
        // try to shrink this one by giving from the column to the right first
        var res = moveSpaceFrom(this, colIdx, colIdx + 1, -amount);
        var remaining = amount + res.amount;
        var newState = res.state;
        if (remaining < 0) {
            var stackResult = stackSpace(newState, colIdx, remaining);
            remaining += stackResult.remaining;
            newState = stackResult.state;
        }
        canRedistribute =
            newState.cols[colIdx + 1] || newState.totalWidth > newState.maxSize;
        if (remaining && canRedistribute) {
            // direct resize
            var oldCol = newState.cols[colIdx];
            var oldNextCol = newState.cols[colIdx + 1];
            if (oldCol.width + remaining < oldCol.minWidth) {
                remaining = -(oldCol.width - oldCol.minWidth);
            }
            if (!oldNextCol) {
                var newSum = newState.totalWidth + remaining;
                if (newSum < newState.maxSize) {
                    remaining = newState.maxSize - newState.totalWidth - 1;
                }
            }
            var newCol = oldCol.clone(oldCol.width + remaining);
            if (oldNextCol) {
                var nextCol = oldNextCol.clone(oldNextCol.width - remaining);
                return new ResizeState(tslib_1.__spread(newState.cols.slice(0, colIdx), [
                    newCol,
                    nextCol
                ], newState.cols.slice(colIdx + 2)), newState.maxSize);
            }
            return new ResizeState(tslib_1.__spread(newState.cols.slice(0, colIdx), [
                newCol
            ], newState.cols.slice(colIdx + 1)), newState.maxSize);
        }
        return newState;
    };
    ResizeState.prototype.resize = function (colIdx, amount) {
        if (amount > 0) {
            return this.grow(colIdx, amount);
        }
        else if (amount < 0) {
            return this.shrink(colIdx, amount);
        }
        return this.clone();
    };
    ResizeState.prototype.scale = function (newWidth) {
        var scaleFactor = newWidth / this.totalWidth;
        var newState = new ResizeState(this.cols.map(function (col) {
            var minWidth = col.minWidth, width = col.width;
            var newColWidth = Math.floor(width * scaleFactor);
            // enforce min width
            if (newColWidth < minWidth) {
                newColWidth = minWidth;
            }
            return col.clone(newColWidth);
        }), newWidth);
        if (newState.totalWidth > newWidth) {
            newState = reduceSpace(newState, newState.totalWidth - newWidth);
        }
        return newState;
    };
    ResizeState.prototype.clone = function () {
        return new ResizeState(this.cols.map(function (col) { return col.clone(); }), this.maxSize, this.breakout, this.freeColFunc);
    };
    return ResizeState;
}());
export default ResizeState;
//# sourceMappingURL=resizeState.js.map