export var media = function (node) {
    var wikiAttrs = [];
    if (node.attrs.width) {
        wikiAttrs.push("width=" + node.attrs.width);
    }
    if (node.attrs.height) {
        wikiAttrs.push("height=" + node.attrs.height);
    }
    var fileName = node.attrs.type === 'external' ? node.attrs.url : node.attrs.id;
    if (wikiAttrs.length) {
        return "!" + fileName + "|" + wikiAttrs.join(',') + "!";
    }
    // default to thumbnail if no width or height is set
    return "!" + fileName + "|thumbnail!";
};
//# sourceMappingURL=media.js.map