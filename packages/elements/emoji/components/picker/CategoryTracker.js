/**
 * Mapping between CategoryId and row
 *
 * Tracks which category is visible based on
 * scrollTop, and virtual rows.
 */
var CategoryTracker = /** @class */ (function () {
    function CategoryTracker() {
        this.reset();
    }
    CategoryTracker.prototype.reset = function () {
        this.categoryToRow = new Map();
        this.rowToCategory = new Map();
    };
    CategoryTracker.prototype.add = function (category, row) {
        if (!this.categoryToRow.has(category)) {
            this.categoryToRow.set(category, row);
            this.rowToCategory.set(row, category);
        }
    };
    CategoryTracker.prototype.getRow = function (category) {
        return this.categoryToRow.get(category);
    };
    CategoryTracker.prototype.findNearestCategoryAbove = function (startIndex, list) {
        var rows = Array.from(this.rowToCategory.keys()).sort(function (a, b) { return a - b; });
        if (rows.length === 0) {
            return;
        }
        // Return first category if list not yet rendered
        // or the top row is above the first category
        if (!list || rows[0] > startIndex) {
            return this.rowToCategory.get(rows[0]);
        }
        var bounds = [0, rows.length - 1];
        var index = Math.floor(rows.length / 2);
        while (rows[index] !== startIndex && bounds[0] < bounds[1]) {
            if (rows[index] > startIndex) {
                bounds[1] = Math.max(index - 1, 0);
            }
            else {
                bounds[0] = index + 1;
            }
            index = Math.floor((bounds[0] + bounds[1]) / 2);
        }
        var headerRow = rows[rows[index] > startIndex ? Math.max(index - 1, 0) : index];
        return this.rowToCategory.get(headerRow);
    };
    return CategoryTracker;
}());
export default CategoryTracker;
//# sourceMappingURL=CategoryTracker.js.map