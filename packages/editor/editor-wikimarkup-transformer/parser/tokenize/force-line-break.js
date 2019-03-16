/**
 * Jira is using the following regex to match force line break
 * private static final Pattern FORCE_NEWLINE = Pattern.compile("(?<!\\\\)\\\\{2}(?!\\S*\\\\)");
 */
var FORCE_LINE_BREAK_REGEX = /^\\{2}(?!\S*\\)/;
export var forceLineBreak = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema;
    if (position > 0) {
        var charBefore = input.charAt(position - 1);
        if (charBefore === '\\') {
            return fallback(input, position);
        }
    }
    var match = input.substring(position).match(FORCE_LINE_BREAK_REGEX);
    if (match) {
        return {
            type: 'pmnode',
            nodes: [schema.nodes.hardBreak.createChecked()],
            length: 2,
        };
    }
    return fallback(input, position);
};
function fallback(input, position) {
    return {
        type: 'text',
        text: input.substr(position, 2),
        length: 2,
    };
}
//# sourceMappingURL=force-line-break.js.map