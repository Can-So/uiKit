export function isDroppedFile(rawEvent) {
    var e = rawEvent;
    if (!e.dataTransfer) {
        return false;
    }
    return (Array.prototype.slice.call(e.dataTransfer.types).indexOf('Files') !== -1);
}
//# sourceMappingURL=drag-drop.js.map