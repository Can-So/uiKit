import { NodeSelection } from 'prosemirror-state';
import { findParentNodeOfType, findSelectedNodeOfType, isNodeSelection, } from 'prosemirror-utils';
export var getExtensionNode = function (state) {
    var selection = state.selection;
    var _a = state.schema.nodes, extension = _a.extension, inlineExtension = _a.inlineExtension, bodiedExtension = _a.bodiedExtension;
    if (isNodeSelection(selection) &&
        findSelectedNodeOfType([extension, bodiedExtension, inlineExtension])(selection)) {
        return {
            node: selection.node,
            pos: selection.$from.pos,
        };
    }
    return findParentNodeOfType([extension, inlineExtension, bodiedExtension])(selection);
};
export var isSelectionNodeExtension = function (selection, schema) {
    return (selection instanceof NodeSelection &&
        (selection.node.type === schema.nodes.inlineExtension ||
            selection.node.type === schema.nodes.extension ||
            selection.node.type === schema.nodes.bodiedExtension));
};
//# sourceMappingURL=utils.js.map