import getMediaGroupNodeView from '../nodes/mediaGroup';
// [^attachment.pdf]
var FILE_LINK_REGEXP = /^\[\^([\(\)\w. -]+)\]/;
export function fileLink(input, position, schema) {
    var match = input.substring(position).match(FILE_LINK_REGEXP);
    if (!match) {
        return fallback(input, position);
    }
    var node = getMediaGroupNodeView(schema, match[1]);
    return {
        type: 'pmnode',
        nodes: [node],
        length: match[0].length,
    };
}
function fallback(input, position) {
    return {
        type: 'text',
        text: input.substr(position, 1),
        length: 1,
    };
}
//# sourceMappingURL=file-link.js.map