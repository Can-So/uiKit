import { getText } from '../../utils';
import { reduce } from './';
var unknown = function (node, schema) {
    var result = [];
    node.forEach(function (n) {
        result.push(reduce(n, schema));
    });
    if (result.length > 0) {
        return result.join('');
    }
    return getText(node);
};
export default unknown;
//# sourceMappingURL=unknown.js.map