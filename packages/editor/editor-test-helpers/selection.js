/**
 * Compares an expected document with selection {<>}, with the actual
 * selected state of an editor view, asserting the selection is equivalent.
 *
 * @param editorFactory a function to contruct an editor using the same configuration
 *        as used by the currentEditorView
 * @param expectedDocWithSelection document with selection
 * @param currentEditorView edit view to assert expectations again.
 */
export var compareSelection = function (editorFactory, expectedDocWithSelection, currentEditorView) {
    var expectedSelection = editorFactory(expectedDocWithSelection).editorView.state.selection;
    var actualSelection = currentEditorView.state.selection;
    expect(actualSelection.$from.pos).toEqual(expectedSelection.$from.pos);
    expect(actualSelection.$to.pos).toEqual(expectedSelection.$to.pos);
};
//# sourceMappingURL=selection.js.map