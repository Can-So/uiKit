import { reduce } from './';
var table = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push(tableRow(n, schema));
    });
    return result.join('\n');
};
var tableRow = function (node, schema) {
    var result = [];
    var separator = '|';
    node.forEach(function (n) {
        result.push(tableCell(n, schema));
    });
    return "" + separator + result.join("" + separator) + separator;
};
var tableCell = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push(reduce(n, schema));
    });
    return result.join('\n');
};
export default table;
//# sourceMappingURL=table.js.map