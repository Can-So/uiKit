export function checkClipboardTypes(type, item) {
    var isDOMStringList = function (t) {
        return !t.indexOf && !!t.contains;
    };
    return isDOMStringList(type) ? type.contains(item) : type.indexOf(item) > -1;
}
export function isPastedFile(rawEvent) {
    var clipboardData = rawEvent.clipboardData;
    if (!clipboardData) {
        return false;
    }
    return checkClipboardTypes(clipboardData.types, 'Files');
}
//# sourceMappingURL=clipboard.js.map