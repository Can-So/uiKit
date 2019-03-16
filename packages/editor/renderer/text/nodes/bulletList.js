import { reduce } from './';
var bulletList = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push("* " + reduce(n, schema));
    });
    return result.join('\n');
};
export default bulletList;
//# sourceMappingURL=bulletList.js.map