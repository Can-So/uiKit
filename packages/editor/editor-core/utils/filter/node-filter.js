import * as tslib_1 from "tslib";
import { traverse } from '@findable/adf-utils';
export function removeMarks(node) {
    var newNode = tslib_1.__assign({}, node);
    delete newNode.marks;
    return newNode;
}
export function sanitizeNode(json) {
    var sanitizedJSON = traverse(json, {
        text: function (node) {
            if (!node || !Array.isArray(node.marks)) {
                return node;
            }
            return tslib_1.__assign({}, node, { marks: node.marks.filter(function (mark) { return ['emojiQuery', 'typeAheadQuery'].indexOf(mark.type) === -1; }) });
        },
        status: function (node) {
            if (node.attrs && !!node.attrs.text) {
                return removeMarks(node);
            }
            return false; // empty status
        },
        emoji: removeMarks,
        mention: removeMarks,
        date: removeMarks,
        hardBreak: removeMarks,
        inlineCard: removeMarks,
    });
    return sanitizedJSON;
}
//# sourceMappingURL=node-filter.js.map