import { deleteSelection, splitBlock } from 'prosemirror-commands';
import { Fragment } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { createParagraphNear, createNewParagraphBelow, } from '../../../commands';
import { moveLeft, atTheBeginningOfDoc, isTemporary, atTheEndOfBlock, atTheBeginningOfBlock, endPositionOfParent, startPositionOfParent, } from '../../../utils';
export var posOfMediaGroupNearby = function (state) {
    return (posOfParentMediaGroup(state) ||
        posOfFollowingMediaGroup(state) ||
        posOfPrecedingMediaGroup(state));
};
export var isSelectionNonMediaBlockNode = function (state) {
    var node = state.selection.node;
    return node && node.type !== state.schema.nodes.media && node.isBlock;
};
export var posOfPrecedingMediaGroup = function (state) {
    if (!atTheBeginningOfBlock(state)) {
        return;
    }
    return posOfMediaGroupAbove(state, state.selection.$from);
};
var posOfFollowingMediaGroup = function (state) {
    if (!atTheEndOfBlock(state)) {
        return;
    }
    return posOfMediaGroupBelow(state, state.selection.$to);
};
var posOfMediaGroupAbove = function (state, $pos) {
    var adjacentPos;
    var adjacentNode;
    if (isSelectionNonMediaBlockNode(state)) {
        adjacentPos = $pos.pos;
        adjacentNode = $pos.nodeBefore;
    }
    else {
        adjacentPos = startPositionOfParent($pos) - 1;
        adjacentNode = state.doc.resolve(adjacentPos).nodeBefore;
    }
    if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
        return adjacentPos - adjacentNode.nodeSize + 1;
    }
};
/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
export var isInsidePotentialEmptyParagraph = function (state) {
    var $from = state.selection.$from;
    return ($from.parent.type === state.schema.nodes.paragraph &&
        atTheBeginningOfBlock(state) &&
        atTheEndOfBlock(state));
};
export var posOfMediaGroupBelow = function (state, $pos, prepend) {
    if (prepend === void 0) { prepend = true; }
    var adjacentPos;
    var adjacentNode;
    if (isSelectionNonMediaBlockNode(state)) {
        adjacentPos = $pos.pos;
        adjacentNode = $pos.nodeAfter;
    }
    else {
        adjacentPos = endPositionOfParent($pos);
        adjacentNode = state.doc.nodeAt(adjacentPos);
    }
    if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
        return prepend ? adjacentPos + 1 : adjacentPos + adjacentNode.nodeSize - 1;
    }
};
export var posOfParentMediaGroup = function (state, $pos, prepend) {
    if (prepend === void 0) { prepend = false; }
    var $from = state.selection.$from;
    $pos = $pos || $from;
    if ($pos.parent.type === state.schema.nodes.mediaGroup) {
        return prepend
            ? startPositionOfParent($pos)
            : endPositionOfParent($pos) - 1;
    }
};
/**
 * The function will return the position after current selection where mediaGroup can be inserted.
 */
export function endPositionForMedia(state, resolvedPos) {
    var mediaGroup = state.schema.nodes.mediaGroup;
    var i = resolvedPos.depth;
    for (; i > 1; i--) {
        var nodeType = resolvedPos.node(i).type;
        if (nodeType.validContent(Fragment.from(mediaGroup.create()))) {
            break;
        }
    }
    return resolvedPos.end(i) + 1;
}
export var removeMediaNode = function (view, node, getPos) {
    var id = node.attrs.id;
    var state = view.state;
    var tr = state.tr, selection = state.selection, doc = state.doc;
    var currentMediaNodePos = getPos();
    tr.deleteRange(currentMediaNodePos, currentMediaNodePos + node.nodeSize);
    if (isTemporary(id)) {
        tr.setMeta('addToHistory', false);
    }
    view.dispatch(tr);
    var $currentMediaNodePos = doc.resolve(currentMediaNodePos);
    var isLastMediaNode = $currentMediaNodePos.index() === $currentMediaNodePos.parent.childCount - 1;
    // If deleting a selected media node, we need to tell where the cursor to go next.
    // Prosemirror didn't gave us the behaviour of moving left if the media node is not the last one.
    // So we handle it ourselves.
    if (selection.from === currentMediaNodePos &&
        !isLastMediaNode &&
        !atTheBeginningOfDoc(state)) {
        moveLeft(view);
    }
};
export var splitMediaGroup = function (view) {
    var selection = view.state.selection;
    // if selection is not a media node, do nothing.
    if (!(selection instanceof NodeSelection) ||
        selection.node.type !== view.state.schema.nodes.media) {
        return false;
    }
    deleteSelection(view.state, view.dispatch);
    if (selection.$to.nodeAfter) {
        splitBlock(view.state, view.dispatch);
        createParagraphNear(false)(view.state, view.dispatch);
    }
    else {
        createNewParagraphBelow(view.state, view.dispatch);
    }
    return true;
};
var isOptionalAttr = function (attr) {
    return attr.length > 1 && attr[0] === '_' && attr[1] === '_';
};
export var copyOptionalAttrsFromMediaState = function (mediaState, node) {
    Object.keys(node.attrs)
        .filter(isOptionalAttr)
        .forEach(function (key) {
        var mediaStateKey = key.substring(2);
        var attrValue = mediaState[mediaStateKey];
        if (attrValue !== undefined) {
            node.attrs[key] = attrValue;
        }
    });
};
//# sourceMappingURL=media-common.js.map