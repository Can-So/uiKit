import { inlines } from './inlines';
export var heading = function (node) {
    var result = '';
    node.forEach(function (n) {
        result += inlines(n);
    });
    return "h" + node.attrs.level + ". " + result;
};
//# sourceMappingURL=heading.js.map