export default function getMediaGroupNodeView(schema, filename) {
    var _a = schema.nodes, media = _a.media, mediaGroup = _a.mediaGroup;
    var mediaNode = media.createChecked({
        id: filename,
        type: 'file',
        collection: '',
    });
    return mediaGroup.createChecked({}, mediaNode);
}
//# sourceMappingURL=mediaGroup.js.map