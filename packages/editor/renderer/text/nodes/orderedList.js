import { reduce } from './';
var orderedList = function (node, schema) {
    var result = [];
    node.forEach(function (n, offset, index) {
        result.push(index + 1 + ". " + reduce(n, schema));
    });
    return result.join('\n');
};
export default orderedList;
//# sourceMappingURL=orderedList.js.map