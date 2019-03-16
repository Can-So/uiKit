var mediaGroup = function (node) {
    // count children which are media files
    // ignore card links
    var childMediaFilesCount = 0;
    node.content.forEach(function (childNode) {
        if (childNode.attrs.type === 'file') {
            childMediaFilesCount += 1;
        }
    });
    if (childMediaFilesCount) {
        var postfix = childMediaFilesCount > 1 ? 'Files' : 'File';
        return "\uD83D\uDCCE " + childMediaFilesCount + " " + postfix;
    }
    return '';
};
export default mediaGroup;
//# sourceMappingURL=mediaGroup.js.map