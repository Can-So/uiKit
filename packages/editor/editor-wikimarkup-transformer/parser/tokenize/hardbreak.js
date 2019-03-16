import { parseNewlineOnly } from './whitespace';
export var hardbreak = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema;
    // Look for normal hardbreak \r, \n, \r\n
    var length = parseNewlineOnly(input.substring(position));
    if (length === 0) {
        // not a valid hardbreak
        return {
            type: 'text',
            text: input.substr(position, 1),
            length: 1,
        };
    }
    return {
        type: 'pmnode',
        nodes: [schema.nodes.hardBreak.createChecked()],
        length: length,
    };
};
//# sourceMappingURL=hardbreak.js.map