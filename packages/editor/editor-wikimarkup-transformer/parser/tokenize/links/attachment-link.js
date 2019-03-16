import getMediaGroupNodeView from '../../nodes/mediaGroup';
export function attachmentLinkResolver(link, schema) {
    if (link.attachmentName) {
        return [getMediaGroupNodeView(schema, link.attachmentName)];
    }
}
//# sourceMappingURL=attachment-link.js.map