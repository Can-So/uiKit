import * as tslib_1 from "tslib";
/**
 * Return the cell type based on the delimeter
 */
function getType(style) {
    return /\|\|/.test(style) ? 'tableHeader' : 'tableCell';
}
var TableBuilder = /** @class */ (function () {
    function TableBuilder(schema) {
        var _this = this;
        this.emptyTableCell = function () {
            var _a = _this.schema.nodes, tableCell = _a.tableCell, paragraph = _a.paragraph;
            return tableCell.createChecked({}, paragraph.createChecked());
        };
        this.emptyTableRow = function () {
            var tableRow = _this.schema.nodes.tableRow;
            return tableRow.createChecked({}, _this.emptyTableCell());
        };
        /**
         * Build prosemirror table node
         * @returns {PMNode}
         */
        this.buildTableNode = function () {
            var root = _this.root;
            var table = _this.schema.nodes.table;
            var content = root.rows.map(_this.buildTableRowNode);
            if (content.length === 0) {
                content.push(_this.emptyTableRow());
            }
            return table.createChecked({}, content);
        };
        /**
         * Build prosemirror tr node
         * @returns {PMNode}
         */
        this.buildTableRowNode = function (row) {
            var tableRow = _this.schema.nodes.tableRow;
            return tableRow.createChecked({}, row.cells.map(_this.buildTableCellNode));
        };
        /**
         * Build prosemirror td/th node
         * @param {TableCell} cell
         * @returns {PMNode}
         */
        this.buildTableCellNode = function (cell) {
            var type = cell.type, content = cell.content;
            if (content.length === 0) {
                content.push(_this.schema.nodes.paragraph.createChecked());
            }
            var cellNode = _this.schema.nodes[type];
            return cellNode.createChecked({}, content);
        };
        this.schema = schema;
        this.root = {
            rows: [],
        };
    }
    Object.defineProperty(TableBuilder.prototype, "type", {
        /**
         * Return the type of the base element
         * @returns {string}
         */
        get: function () {
            return 'table';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add new cells to the table
     * @param {AddCellArgs[]} cells
     */
    TableBuilder.prototype.add = function (cells) {
        var e_1, _a;
        if (!cells.length) {
            return;
        }
        // Iterate the cells and create TH/TD based on the delimeter
        var index = 0;
        var cellType = getType(cells[0].style);
        try {
            for (var cells_1 = tslib_1.__values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
                var cell = cells_1_1.value;
                var content = cell.content;
                // For the first item, determine if it's a new row or not
                if (index === 0) {
                    this.addRow();
                }
                var newCell = { type: cellType, content: content };
                this.lastRow.cells.push(newCell);
                index += 1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cells_1_1 && !cells_1_1.done && (_a = cells_1.return)) _a.call(cells_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Build a prosemirror table from the data
     * @returns {PMNode}
     */
    TableBuilder.prototype.buildPMNode = function () {
        return this.buildTableNode();
    };
    /**
     * Add a new row to the table
     */
    TableBuilder.prototype.addRow = function () {
        var rows = this.root.rows;
        var row = {
            cells: [],
        };
        rows.push(row);
        this.lastRow = row;
    };
    return TableBuilder;
}());
export { TableBuilder };
//# sourceMappingURL=table-builder.js.map