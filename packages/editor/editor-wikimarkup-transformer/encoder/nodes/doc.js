import { encode } from '../';
export var doc = function (node) {
    var result = [];
    node.forEach(function (n) {
        result.push(encode(n));
    });
    return result.join('\n\n');
};
//# sourceMappingURL=doc.js.map