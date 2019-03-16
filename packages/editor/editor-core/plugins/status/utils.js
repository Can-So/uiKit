import { Selection, NodeSelection } from 'prosemirror-state';
export var mayGetStatusNodeAt = function (selection) {
    if (selection && selection instanceof NodeSelection) {
        var nodeSelection = selection;
        if (nodeSelection.node.type.name === 'status') {
            return selection.node.attrs || null;
        }
    }
    return null;
};
export var isEmptyStatus = function (node) {
    return node && ((node.text && node.text.trim().length === 0) || node.text === '');
};
export var setSelectionNearPos = function (tr, pos) {
    return tr.setSelection(Selection.near(tr.doc.resolve(tr.mapping.map(pos))));
};
export var setNodeSelectionNearPos = function (tr, pos) {
    return tr.setSelection(NodeSelection.create(tr.doc, tr.mapping.map(pos)));
};
//# sourceMappingURL=utils.js.map