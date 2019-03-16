import { unknown } from './unknown';
import { INLINE_CARD_FROM_TEXT_STAMP } from '../../parser/tokenize/issue-key';
export var inlineCard = function (node) {
    if (!node.attrs.url) {
        return unknown(node);
    }
    var match = node.attrs.url.match(INLINE_CARD_FROM_TEXT_STAMP);
    if (!match) {
        return "[" + node.attrs.url + "|" + node.attrs.url + "|smart-link]";
    }
    return "[" + match[2] + "]";
};
//# sourceMappingURL=inline-card.js.map