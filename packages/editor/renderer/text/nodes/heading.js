import { reduce } from './';
var heading = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push(reduce(n, schema));
    });
    return result.join('');
};
export default heading;
//# sourceMappingURL=heading.js.map