import { mapping } from '../emoji-unicode-mapping';
import { unknown } from './unknown';
export var emoji = function (node) {
    var value = mapping[node.attrs.id];
    if (value) {
        return value;
    }
    return unknown(node);
};
//# sourceMappingURL=emoji.js.map