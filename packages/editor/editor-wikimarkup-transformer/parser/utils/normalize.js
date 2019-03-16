import * as tslib_1 from "tslib";
import { createParagraphNodeFromInlineNodes, createEmptyParagraphNode, } from '../nodes/paragraph';
export function normalizePMNodes(nodes, schema) {
    var e_1, _a;
    var output = [];
    var inlineNodeBuffer = [];
    try {
        for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
            var node = nodes_1_1.value;
            if (!node.isBlock) {
                inlineNodeBuffer.push(node);
                continue;
            }
            var trimedInlineNodes_1 = trimInlineNodes(inlineNodeBuffer);
            if (trimedInlineNodes_1.length > 0) {
                output.push.apply(output, tslib_1.__spread(createParagraphNodeFromInlineNodes(trimedInlineNodes_1, schema)));
            }
            inlineNodeBuffer = []; // clear buffer
            output.push(node);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var trimedInlineNodes = trimInlineNodes(inlineNodeBuffer);
    if (trimedInlineNodes.length > 0) {
        output.push.apply(output, tslib_1.__spread(createParagraphNodeFromInlineNodes(trimedInlineNodes, schema)));
    }
    if (output.length === 0) {
        return [createEmptyParagraphNode(schema)];
    }
    return output;
}
/**
 * Remove leading and trailing hardBreak
 */
function trimInlineNodes(nodes) {
    var leadingNode = nodes.shift();
    while (leadingNode) {
        if (leadingNode.type.name !== 'hardBreak') {
            nodes.unshift(leadingNode);
            break;
        }
        leadingNode = nodes.shift();
    }
    var trailingNode = nodes.pop();
    while (trailingNode) {
        if (trailingNode.type.name !== 'hardBreak') {
            nodes.push(trailingNode);
            break;
        }
        trailingNode = nodes.pop();
    }
    return nodes;
}
export function isNextLineEmpty(input) {
    // Line with only spaces is considered an empty line
    return input.trim().length === 0;
}
//# sourceMappingURL=normalize.js.map