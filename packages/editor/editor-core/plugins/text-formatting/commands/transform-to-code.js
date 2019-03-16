import { filterChildrenBetween } from '../../../utils';
var SMART_TO_ASCII = {
    '…': '...',
    '→': '->',
    '←': '<-',
    '–': '--',
    '“': '"',
    '”': '"',
    '‘': "'",
    '’': "'",
};
var FIND_SMART_CHAR = new RegExp("[" + Object.keys(SMART_TO_ASCII).join('') + "]", 'g');
var replaceMentionOrEmojiForTextContent = function (position, nodeSize, textContent, tr) {
    var currentPos = tr.mapping.map(position);
    var schema = tr.doc.type.schema;
    tr.replaceWith(currentPos, currentPos + nodeSize, schema.text(textContent));
};
var replaceSmartCharsToAscii = function (position, textContent, tr) {
    var textExtracted = textContent.substr(position - 1);
    var schema = tr.doc.type.schema;
    var match;
    while ((match = FIND_SMART_CHAR.exec(textExtracted))) {
        var smartChar = match[0], offset = match.index;
        var replacePos = tr.mapping.map(position + offset);
        var replacementText = schema.text(SMART_TO_ASCII[smartChar]);
        tr.replaceWith(replacePos, replacePos + smartChar.length, replacementText);
    }
};
var transformSmartCharsMentionsAndEmojis = function (from, to, tr) {
    var schema = tr.doc.type.schema;
    var _a = schema.nodes, mention = _a.mention, text = _a.text, emoji = _a.emoji;
    var isNodeTextBlock = function (node, _, parent) {
        if (node.type === mention || node.type === emoji || node.type === text) {
            return parent.isTextblock;
        }
    };
    // Traverse through all the nodes within the range and replace them with their plaintext counterpart
    var children = filterChildrenBetween(tr.doc, from, to, isNodeTextBlock);
    children.forEach(function (_a) {
        var node = _a.node, pos = _a.pos;
        if (node.type === mention || node.type === emoji) {
            replaceMentionOrEmojiForTextContent(pos, node.nodeSize, node.attrs.text, tr);
        }
        else if (node.type === text && node.text) {
            var replacePosition = pos > from ? pos : from;
            replaceSmartCharsToAscii(replacePosition, node.text, tr);
        }
    });
};
var applyCodeBlock = function (from, to, tr) {
    var schema = tr.doc.type.schema;
    if (schema.marks.code) {
        var codeMark = schema.marks.code.create();
        tr.addMark(tr.mapping.map(from), tr.mapping.map(to), codeMark).setStoredMarks([codeMark]);
    }
};
export function transformToCodeAction(from, to, tr) {
    transformSmartCharsMentionsAndEmojis(from, to, tr);
    applyCodeBlock(from, to, tr);
    return tr;
}
//# sourceMappingURL=transform-to-code.js.map