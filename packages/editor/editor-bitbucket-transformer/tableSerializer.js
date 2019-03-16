var isHeaderRow = function (row) {
    return row.child(0).type.name === 'tableHeader';
};
var isHeaderRowPresent = function (table) {
    var headerRowPresent = false;
    table.content.forEach(function (row, i) {
        if (isHeaderRow(row)) {
            headerRowPresent = true;
        }
    });
    return headerRowPresent;
};
var renderNode = function (state, node, index) {
    if (index > 0) {
        state.write(' ');
    }
    node.content.forEach(function (child, i) {
        if (child.isTextblock || child.type.name === 'mediaSingle') {
            if (i > 0) {
                state.write(' ');
            }
            state.context.insideTable = true;
            state.renderInline(child);
            state.context.insideTable = false;
        }
        else {
            renderNode(state, child, i);
        }
    });
};
var renderInlineContent = function (state, node) {
    state.write('| ');
    renderNode(state, node, 0);
    state.write(' ');
};
export default {
    table: function (state, node) {
        if (isHeaderRowPresent(node)) {
            node.content.forEach(function (child, i) { return state.render(child, node, i); });
            state.closeBlock(node);
        }
    },
    tableRow: function (state, node) {
        node.content.forEach(function (child, i) {
            state.render(child, node, i);
        });
        state.write('|');
        state.ensureNewLine();
        if (isHeaderRow(node)) {
            for (var i = 0; i < node.childCount; i++) {
                state.write('| --- ');
            }
            state.write('|');
            state.ensureNewLine();
        }
    },
    tableHeader: renderInlineContent,
    tableCell: renderInlineContent,
};
//# sourceMappingURL=tableSerializer.js.map