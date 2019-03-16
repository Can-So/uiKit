import { media } from './media';
export var mediaGroup = function (node) {
    var result = [];
    node.forEach(function (n) {
        result.push(media(n));
    });
    return result.join('\n');
};
//# sourceMappingURL=media-group.js.map