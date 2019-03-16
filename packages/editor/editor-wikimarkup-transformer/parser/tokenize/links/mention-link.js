export function mentionLinkResolver(link, schema) {
    if (link.notLinkBody.startsWith('~')) {
        var mentionText = link.notLinkBody.substring(1);
        return [
            schema.nodes.mention.createChecked({
                id: mentionText,
            }),
        ];
    }
}
//# sourceMappingURL=mention-link.js.map