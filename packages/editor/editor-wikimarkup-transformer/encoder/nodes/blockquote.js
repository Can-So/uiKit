import { encode } from '..';
export var blockquote = function (node) {
    var result = [];
    node.forEach(function (n) {
        result.push(encode(n));
    });
    return "{quote}" + result.join('\n\n') + "{quote}";
};
//# sourceMappingURL=blockquote.js.map