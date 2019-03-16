import { listItem } from './listItem';
export var orderedList = function (node) {
    var result = [];
    node.forEach(function (item) {
        result.push(listItem(item, '#'));
    });
    return result.join('\n');
};
//# sourceMappingURL=ordered-list.js.map