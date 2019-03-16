import { reduce } from './';
var paragraph = function (node, schema) {
    var result = [];
    var previousNodeType = '';
    node.forEach(function (n) {
        var text = reduce(n, schema);
        if (previousNodeType === 'mention' && !text.startsWith(' ')) {
            result.push(" " + text);
        }
        else {
            result.push(text);
        }
        previousNodeType = n.type.name;
    });
    return result.join('').trim();
};
export default paragraph;
//# sourceMappingURL=paragraph.js.map