import * as tslib_1 from "tslib";
import { TableMap } from 'prosemirror-tables';
import { findTable, hasParentNodeOfType } from 'prosemirror-utils';
import { pluginKey } from '../pm-plugins/main';
export var isIsolating = function (node) {
    return !!node.type.spec.isolating;
};
export var containsHeaderColumn = function (state, table) {
    var map = TableMap.get(table);
    // Get cell positions for first column.
    var cellPositions = map.cellsInRect({
        left: 0,
        top: 0,
        right: 1,
        bottom: map.height,
    });
    for (var i = 0; i < cellPositions.length; i++) {
        try {
            var cell = table.nodeAt(cellPositions[i]);
            if (cell && cell.type !== state.schema.nodes.tableHeader) {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    return true;
};
export var containsHeaderRow = function (state, table) {
    var map = TableMap.get(table);
    for (var i = 0; i < map.width; i++) {
        var cell = table.nodeAt(map.map[i]);
        if (cell && cell.type !== state.schema.nodes.tableHeader) {
            return false;
        }
    }
    return true;
};
export function filterNearSelection(state, findNode, predicate, defaultValue) {
    var found = findNode(state.selection);
    if (!found) {
        return defaultValue;
    }
    return predicate(state, found.node, found.pos);
}
export var checkIfHeaderColumnEnabled = function (state) {
    return filterNearSelection(state, findTable, containsHeaderColumn, false);
};
export var checkIfHeaderRowEnabled = function (state) {
    return filterNearSelection(state, findTable, containsHeaderRow, false);
};
export var checkIfNumberColumnEnabled = function (state) {
    return filterNearSelection(state, findTable, function (_, table) { return !!table.attrs.isNumberColumnEnabled; }, false);
};
export var isLayoutSupported = function (state) {
    var permittedLayouts = pluginKey.getState(state).pluginConfig.permittedLayouts;
    var _a = state.schema.nodes, bodiedExtension = _a.bodiedExtension, layoutSection = _a.layoutSection;
    return (!hasParentNodeOfType([layoutSection, bodiedExtension])(state.selection) &&
        permittedLayouts &&
        (permittedLayouts === 'all' ||
            (permittedLayouts.indexOf('default') > -1 &&
                permittedLayouts.indexOf('wide') > -1 &&
                permittedLayouts.indexOf('full-page') > -1)));
};
export var getTableWidths = function (node) {
    if (!node.content.firstChild) {
        return [];
    }
    var tableWidths = [];
    node.content.firstChild.content.forEach(function (cell) {
        if (Array.isArray(cell.attrs.colwidth)) {
            var colspan = cell.attrs.colspan || 1;
            tableWidths.push.apply(tableWidths, tslib_1.__spread(cell.attrs.colwidth.slice(0, colspan)));
        }
    });
    return tableWidths;
};
export var getTableWidth = function (node) {
    return getTableWidths(node).reduce(function (acc, current) { return acc + current; }, 0);
};
export var tablesHaveDifferentColumnWidths = function (currentTable, previousTable) {
    var currentTableWidths = getTableWidths(currentTable);
    var previousTableWidths = getTableWidths(previousTable);
    var sameWidths = currentTableWidths.every(function (value, index) {
        return value === previousTableWidths[index];
    });
    return sameWidths === false;
};
//# sourceMappingURL=nodes.js.map