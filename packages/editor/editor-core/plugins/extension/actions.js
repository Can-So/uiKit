import * as tslib_1 from "tslib";
import { findParentNodeOfType } from 'prosemirror-utils';
import { Slice } from 'prosemirror-model';
import { removeSelectedNode, removeParentNodeOfType, findSelectedNodeOfType, } from 'prosemirror-utils';
import { pluginKey } from './plugin';
import { insertMacroFromMacroBrowser } from '../macro';
import { getExtensionNode, isSelectionNodeExtension } from './utils';
import { mapFragment } from '../../utils/slice';
export var updateExtensionLayout = function (layout) { return function (state, dispatch) {
    var selection = state.selection, schema = state.schema, tr = state.tr;
    var _a = schema.nodes, bodiedExtension = _a.bodiedExtension, extension = _a.extension, inlineExtension = _a.inlineExtension;
    var parentExtNode = findParentNodeOfType([bodiedExtension])(selection);
    var extPosition;
    var extNode;
    var selectedNode = findSelectedNodeOfType([
        bodiedExtension,
        inlineExtension,
        extension,
    ])(selection);
    if (!parentExtNode && !selectedNode) {
        return false;
    }
    if (selectedNode) {
        extPosition = selectedNode.pos;
        extNode = selectedNode.node;
    }
    else {
        extPosition = parentExtNode.pos;
        extNode = parentExtNode.node;
    }
    var pluginState = pluginKey.getState(state);
    tr.setNodeMarkup(extPosition, undefined, tslib_1.__assign({}, extNode.attrs, { layout: layout })).setMeta(pluginKey, tslib_1.__assign({}, pluginState, { layout: layout }));
    if (dispatch) {
        dispatch(tr);
    }
    return true;
}; };
export var editExtension = function (macroProvider) { return function (state, dispatch) {
    var node = getExtensionNode(state);
    if (!node || !macroProvider) {
        return false;
    }
    insertMacroFromMacroBrowser(macroProvider, node.node, true)(state, dispatch);
    return true;
}; };
export var removeExtension = function () { return function (state, dispatch) {
    var schema = state.schema, selection = state.selection;
    var pluginState = pluginKey.getState(state);
    var tr = state.tr.setMeta(pluginKey, tslib_1.__assign({}, pluginState, { element: null }));
    if (isSelectionNodeExtension(selection, schema)) {
        tr = removeSelectedNode(tr);
    }
    else {
        tr = removeParentNodeOfType(schema.nodes.bodiedExtension)(tr);
    }
    if (dispatch) {
        dispatch(tr);
    }
    return true;
}; };
/**
 * Lift content out of "open" top-level bodiedExtensions.
 * Will not work if bodiedExtensions are nested, or when bodiedExtensions are not in the top level
 */
export var transformSliceToRemoveOpenBodiedExtension = function (slice, schema) {
    var bodiedExtension = schema.nodes.bodiedExtension;
    var fragment = mapFragment(slice.content, function (node, parent, index) {
        if (node.type === bodiedExtension && !parent) {
            var currentNodeIsAtStartAndIsOpen = slice.openStart && index === 0;
            var currentNodeIsAtEndAndIsOpen = slice.openEnd && index + 1 === slice.content.childCount;
            if (currentNodeIsAtStartAndIsOpen || currentNodeIsAtEndAndIsOpen) {
                return node.content;
            }
        }
        return node;
    });
    // If the first/last child has changed - then we know we've removed a bodied extension & to decrement the open depth
    return new Slice(fragment, fragment.firstChild &&
        fragment.firstChild.type !== slice.content.firstChild.type
        ? slice.openStart - 1
        : slice.openStart, fragment.lastChild &&
        fragment.lastChild.type !== slice.content.lastChild.type
        ? slice.openEnd - 1
        : slice.openEnd);
};
//# sourceMappingURL=actions.js.map