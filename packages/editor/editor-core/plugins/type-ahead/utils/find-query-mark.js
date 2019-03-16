export function findQueryMark(mark, doc, from, to) {
    var queryMark = { start: -1, end: -1 };
    doc.nodesBetween(from, to, function (node, pos) {
        if (queryMark.start === -1 && mark.isInSet(node.marks)) {
            queryMark = {
                start: pos,
                end: pos + node.textContent.length,
            };
        }
    });
    return queryMark;
}
export function findTypeAheadQuery(state) {
    var doc = state.doc, schema = state.schema;
    var typeAheadQuery = schema.marks.typeAheadQuery;
    var _a = state.selection, from = _a.from, to = _a.to;
    return findQueryMark(typeAheadQuery, doc, from - 1, to);
}
//# sourceMappingURL=find-query-mark.js.map