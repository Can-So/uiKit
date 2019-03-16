import * as tslib_1 from "tslib";
export function createEmptyParagraphNode(schema) {
    var paragraph = schema.nodes.paragraph;
    return paragraph.createChecked({}, []);
}
/**
 * Create paragraphs from inline nodes. Two and more
 * hardbreaks will start a new paragraph
 */
export function createParagraphNodeFromInlineNodes(inlineNodes, schema) {
    var e_1, _a;
    var paragraph = schema.nodes.paragraph;
    var result = [];
    var buffer = [];
    var hardbreakBuffer = [];
    try {
        for (var inlineNodes_1 = tslib_1.__values(inlineNodes), inlineNodes_1_1 = inlineNodes_1.next(); !inlineNodes_1_1.done; inlineNodes_1_1 = inlineNodes_1.next()) {
            var node = inlineNodes_1_1.value;
            if (node.type.name === 'hardBreak') {
                hardbreakBuffer.push(node);
                continue;
            }
            // There are more than one hardBreaks, we should make
            // a new paragraph
            if (hardbreakBuffer.length > 1 && buffer.length > 0) {
                result.push(paragraph.createChecked({}, buffer));
                buffer = [];
                hardbreakBuffer = [];
            }
            buffer.push.apply(buffer, tslib_1.__spread(hardbreakBuffer, [node]));
            hardbreakBuffer = [];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (inlineNodes_1_1 && !inlineNodes_1_1.done && (_a = inlineNodes_1.return)) _a.call(inlineNodes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (buffer.length > 0) {
        result.push(paragraph.createChecked({}, buffer));
    }
    return result;
}
//# sourceMappingURL=paragraph.js.map