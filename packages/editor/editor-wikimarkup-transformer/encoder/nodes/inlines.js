import { emoji } from './emoji';
import { hardBreak } from './hard-break';
import { mention } from './mention';
import { text } from './text';
import { inlineCard } from './inline-card';
import { unknown } from './unknown';
var inlinesEncoderMapping = {
    emoji: emoji,
    hardBreak: hardBreak,
    mention: mention,
    text: text,
    inlineCard: inlineCard,
};
export var inlines = function (node, parent) {
    var encoder = inlinesEncoderMapping[node.type.name];
    if (encoder) {
        return encoder(node, parent);
    }
    return unknown(node);
};
//# sourceMappingURL=inlines.js.map