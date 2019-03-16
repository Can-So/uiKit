import { encode } from '..';
import { unknown } from './unknown';
export var table = function (node) {
    try {
        var result_1 = [];
        node.forEach(function (n) {
            result_1.push(tableRow(n));
        });
        return result_1.join('\n');
    }
    catch (err) {
        return unknown(node);
    }
};
var tableRow = function (node) {
    var result = [];
    var separator = '|';
    node.forEach(function (n) {
        if (n.type.name === 'tableHeader') {
            separator = '||';
        }
        result.push(tableCell(n));
    });
    return "" + separator + result.join("" + separator) + separator;
};
var tableCell = function (node) {
    if (isAdvancedTableCell(node)) {
        // This is an advanced table
        throw new Error('Advanced feature of table is not supported');
    }
    var result = [];
    node.forEach(function (n) {
        result.push(encode(n));
    });
    return result.join('\n');
};
var isAdvancedTableCell = function (node) {
    if (!node.attrs) {
        return false;
    }
    if (node.attrs.colspan && node.attrs.colspan !== 1) {
        return true;
    }
    if (node.attrs.rowspan && node.attrs.rowspan !== 1) {
        return true;
    }
    if (node.attrs.colwidth) {
        return true;
    }
    if (node.attrs.background) {
        return true;
    }
    return false;
};
//# sourceMappingURL=table.js.map