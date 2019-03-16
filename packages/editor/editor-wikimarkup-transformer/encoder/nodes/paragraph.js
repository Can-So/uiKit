import { inlines } from './inlines';
export var paragraph = function (node) {
    var result = '';
    node.forEach(function (n) {
        result += inlines(n);
    });
    return result;
};
//# sourceMappingURL=paragraph.js.map