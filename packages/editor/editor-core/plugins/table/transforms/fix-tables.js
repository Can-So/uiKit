import * as tslib_1 from "tslib";
import { akEditorWideLayoutWidth, akEditorDefaultLayoutWidth, tableCellMinWidth, } from '@atlaskit/editor-common';
import { contentWidth } from '../pm-plugins/table-resizing/resizer/contentWidth';
import { calculateColWidth, getCellsRefsInColumn, } from '../pm-plugins/table-resizing/resizer/utils';
import { getLayoutSize } from '../pm-plugins/table-resizing/utils';
import { sendLogs } from '../../../utils/sendLogs';
export var fireAnalytics = function (properties) {
    if (properties === void 0) { properties = {}; }
    return sendLogs({
        events: [
            {
                name: 'atlaskit.fabric.editor.fixtable',
                product: 'atlaskit',
                properties: properties,
                serverTime: new Date().getTime(),
                server: 'local',
                user: '-',
            },
        ],
    });
};
// We attempt to patch the document when we have extra, unneeded, column widths
// Take this node for example:
//
//    ['td', { colwidth: [100, 100, 100], colspan: 2 }]
//
// This row only spans two columns, yet it contains widths for 3.
// We remove the third width here, assumed duplicate content.
export var removeExtraneousColumnWidths = function (node, basePos, tr) {
    var hasProblems = false;
    tr = replaceCells(tr, node, basePos, function (cell) {
        var _a = cell.attrs, colwidth = _a.colwidth, colspan = _a.colspan;
        if (colwidth && colwidth.length > colspan) {
            hasProblems = true;
            return cell.type.createChecked(tslib_1.__assign({}, cell.attrs, { colwidth: colwidth.slice(0, colspan) }), cell.content, cell.marks);
        }
        return cell;
    });
    if (hasProblems) {
        fireAnalytics({ message: 'removeExtraneousColumnWidths' });
    }
    return tr;
};
export var fixTables = function (tr) {
    tr.doc.descendants(function (node, pos) {
        if (node.type.name === 'table') {
            // in the unlikely event of having to fix multiple tables at the same time
            tr = removeExtraneousColumnWidths(node, tr.mapping.map(pos), tr);
        }
    });
    return tr;
};
// When we get a table with an 'auto' attribute, we want to:
// 1. render with table-layout: auto
// 2. capture the column widths
// 3. set the column widths as attributes, and remove the 'auto' attribute,
//    so the table renders the same, but is now fixed-width
//
// This can be used to migrate table appearances from other sources that are
// usually rendered with 'auto'.
//
// We use this when migrating TinyMCE tables for Confluence, for example:
// https://pug.jira-dev.com/wiki/spaces/AEC/pages/3362882215/How+do+we+map+TinyMCE+tables+to+Fabric+tables
export var fixAutoSizedTable = function (view, tableNode, tableRef, tablePos, opts) {
    var tr = view.state.tr;
    var domAtPos = view.domAtPos.bind(view);
    var tableStart = tablePos + 1;
    var colWidths = parseDOMColumnWidths(domAtPos, tableNode, tableStart, tableRef);
    var totalContentWidth = colWidths.reduce(function (acc, current) { return acc + current; }, 0);
    var tableLayout = getLayoutBasedOnWidth(totalContentWidth);
    var maxLayoutSize = getLayoutSize(tableLayout, opts.containerWidth, opts.dynamicTextSizing);
    // Content width will generally not meet the constraints of the layout
    // whether it be below or above, so we scale our columns widths
    // to meet these requirements
    var scale = 1;
    if (totalContentWidth !== maxLayoutSize) {
        scale = maxLayoutSize / totalContentWidth;
    }
    var scaledColumnWidths = colWidths.map(function (width) { return Math.floor(width * scale); });
    tr = replaceCells(tr, tableNode, tablePos, function (cell, _rowIndex, colIndex) {
        var newColWidths = scaledColumnWidths.slice(colIndex, colIndex + cell.attrs.colspan);
        return cell.type.createChecked(tslib_1.__assign({}, cell.attrs, { colwidth: newColWidths.length ? newColWidths : null }), cell.content, cell.marks);
    });
    // clear autosizing on the table node
    return tr
        .setNodeMarkup(tablePos, undefined, tslib_1.__assign({}, tableNode.attrs, { layout: tableLayout, __autoSize: false }))
        .setMeta('addToHistory', false);
};
var getLayoutBasedOnWidth = function (totalWidth) {
    if (totalWidth > akEditorWideLayoutWidth) {
        return 'full-width';
    }
    else if (totalWidth > akEditorDefaultLayoutWidth &&
        totalWidth < akEditorWideLayoutWidth) {
        return 'wide';
    }
    else {
        return 'default';
    }
};
function parseDOMColumnWidths(domAtPos, tableNode, tableStart, tableRef) {
    var row = tableRef.querySelector('tr');
    if (!row) {
        return [];
    }
    var cols = [];
    for (var col = 0; col < row.childElementCount; col++) {
        var currentCol = row.children[col];
        var colspan = Number(currentCol.getAttribute('colspan') || 1);
        for (var span = 0; span < colspan; span++) {
            var colIdx = col + span;
            var cells = getCellsRefsInColumn(colIdx, tableNode, tableStart, domAtPos);
            var colWidth = calculateColWidth(cells, function (col) {
                return contentWidth(col, tableRef).width;
            });
            cols[colIdx] = Math.max(colWidth, tableCellMinWidth);
        }
    }
    return cols;
}
// TODO: move to prosemirror-utils
var replaceCells = function (tr, table, tablePos, modifyCell) {
    var rows = [];
    var modifiedCells = 0;
    for (var rowIndex = 0; rowIndex < table.childCount; rowIndex++) {
        var row = table.child(rowIndex);
        var cells = [];
        for (var colIndex = 0; colIndex < row.childCount; colIndex++) {
            var cell = row.child(colIndex);
            // FIXME
            // The rowIndex and colIndex are not accurate in a merged cell scenario
            // e.g. table with 5 columns might have only one cell in a row, colIndex will be 1, where it should be 4
            var node = modifyCell(cell, rowIndex, colIndex);
            if (node.sameMarkup(cell) === false) {
                modifiedCells++;
            }
            cells.push(node);
        }
        if (cells.length) {
            rows.push(row.type.createChecked(row.attrs, cells, row.marks));
        }
    }
    // Check if the table has changed before replacing.
    // If no cells are modified our counter will be zero.
    if (rows.length && modifiedCells !== 0) {
        var newTable = table.type.createChecked(table.attrs, rows, table.marks);
        return tr.replaceWith(tablePos, tablePos + table.nodeSize, newTable);
    }
    return tr;
};
//# sourceMappingURL=fix-tables.js.map