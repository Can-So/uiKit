import { encode } from '..';
import { paragraph } from './paragraph';
import { unknown } from './unknown';
import { codeBlock } from './code-block';
import { mediaGroup } from './media-group';
export var listItem = function (node, prefix) {
    var result = [];
    var contentBuffer = [];
    node.forEach(function (n, offset, index) {
        switch (n.type.name) {
            case 'paragraph': {
                contentBuffer.push(paragraph(n));
                break;
            }
            case 'bulletList':
            case 'orderedList': {
                if (contentBuffer.length) {
                    result.push(prefix + " " + contentBuffer.join('\n'));
                    contentBuffer = [];
                }
                var nestedList = encode(n)
                    .split('\n')
                    .map(function (line) {
                    if (['#', '*'].indexOf(line.substr(0, 1)) !== -1) {
                        return "" + prefix + line;
                    }
                    return line;
                })
                    .join('\n');
                result.push(nestedList);
                break;
            }
            case 'codeBlock': {
                contentBuffer.push(codeBlock(n));
                break;
            }
            case 'mediaSingle': {
                // mediaSingle and mediaGroup are holding the same conversion logic
                contentBuffer.push(mediaGroup(n));
                break;
            }
            default:
                contentBuffer.push(unknown(n));
        }
    });
    if (contentBuffer.length) {
        result.push(prefix + " " + contentBuffer.join('\n'));
    }
    return result.join('\n');
};
//# sourceMappingURL=listItem.js.map