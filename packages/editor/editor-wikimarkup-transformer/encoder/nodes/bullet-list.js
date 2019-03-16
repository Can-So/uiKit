import { listItem } from './listItem';
export var bulletList = function (node) {
    var result = [];
    node.forEach(function (item) {
        result.push(listItem(item, '*'));
    });
    return result.join('\n');
};
//# sourceMappingURL=bullet-list.js.map