import { reduce } from './';
var listItem = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push(reduce(n, schema));
    });
    return result.join('\n');
};
export default listItem;
//# sourceMappingURL=listItem.js.map