import { blockquote } from './nodes/blockquote';
import { bulletList } from './nodes/bullet-list';
import { codeBlock } from './nodes/code-block';
import { doc } from './nodes/doc';
import { heading } from './nodes/heading';
import { mediaGroup } from './nodes/media-group';
import { orderedList } from './nodes/ordered-list';
import { panel } from './nodes/panel';
import { paragraph } from './nodes/paragraph';
import { rule } from './nodes/rule';
import { table } from './nodes/table';
import { unknown } from './nodes/unknown';
var nodeEncoderMapping = {
    blockquote: blockquote,
    bulletList: bulletList,
    codeBlock: codeBlock,
    doc: doc,
    heading: heading,
    mediaGroup: mediaGroup,
    mediaSingle: mediaGroup,
    orderedList: orderedList,
    panel: panel,
    paragraph: paragraph,
    rule: rule,
    table: table,
};
export function encode(node) {
    var encoder = nodeEncoderMapping[node.type.name];
    try {
        if (encoder) {
            return encoder(node);
        }
        return unknown(node);
    }
    catch (err) {
        return unknown(node);
    }
}
//# sourceMappingURL=index.js.map