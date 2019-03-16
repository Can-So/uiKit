import { reduce } from './';
var blockquote = function (node, schema) {
    var result = [];
    node.content.forEach(function (n) {
        result.push(reduce(n, schema));
    });
    return "> " + result.join('');
};
export default blockquote;
//# sourceMappingURL=blockquote.js.map