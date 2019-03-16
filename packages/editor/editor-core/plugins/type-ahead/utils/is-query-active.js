export function isQueryActive(mark, doc, from, to) {
    var active = false;
    doc.nodesBetween(from, to, function (node) {
        if (!active && mark.isInSet(node.marks)) {
            active = true;
        }
    });
    return active;
}
//# sourceMappingURL=is-query-active.js.map