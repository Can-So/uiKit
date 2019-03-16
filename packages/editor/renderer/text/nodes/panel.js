import { reduce } from './';
var panel = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push(reduce(n, schema));
    });
    return result.join('\n');
};
export default panel;
//# sourceMappingURL=panel.js.map