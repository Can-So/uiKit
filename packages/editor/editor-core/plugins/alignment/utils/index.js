import { findParentNodeOfType } from 'prosemirror-utils';
export var getActiveAlignment = function (state) {
    var node = findParentNodeOfType([
        state.schema.nodes.paragraph,
        state.schema.nodes.heading,
    ])(state.selection);
    var getMark = node &&
        node.node.marks.filter(function (mark) { return mark.type === state.schema.marks.alignment; })[0];
    return (getMark && getMark.attrs.align) || 'start';
};
//# sourceMappingURL=index.js.map