import { Fragment, Slice } from 'prosemirror-model';
import { isImage, atTheBeginningOfBlock, checkNodeDown, isEmptyParagraph, } from '../../../utils';
import { copyOptionalAttrsFromMediaState } from '../utils/media-common';
import { safeInsert, hasParentNodeOfType } from 'prosemirror-utils';
import { mapSlice } from '../../../utils/slice';
function shouldAddParagraph(state) {
    return (atTheBeginningOfBlock(state) &&
        !checkNodeDown(state.selection, state.doc, isEmptyParagraph));
}
function insertNodesWithOptionalParagraph(nodes) {
    return function (state, dispatch) {
        var tr = state.tr, schema = state.schema;
        var paragraph = schema.nodes.paragraph;
        var openEnd = 0;
        if (shouldAddParagraph(state)) {
            nodes.push(paragraph.create());
            openEnd = 1;
        }
        tr.replaceSelection(new Slice(Fragment.from(nodes), 0, openEnd));
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
export var insertMediaAsMediaSingle = function (view, node) {
    var state = view.state, dispatch = view.dispatch;
    var _a = state.schema.nodes, mediaSingle = _a.mediaSingle, media = _a.media;
    if (!mediaSingle) {
        return false;
    }
    // if not an image type media node
    if (node.type !== media ||
        (!isImage(node.attrs.__fileMimeType) && node.attrs.type !== 'external')) {
        return false;
    }
    var mediaSingleNode = mediaSingle.create({}, node);
    var nodes = [mediaSingleNode];
    return insertNodesWithOptionalParagraph(nodes)(state, dispatch);
};
export var insertMediaSingleNode = function (view, mediaState, collection) {
    if (collection === undefined) {
        return false;
    }
    var state = view.state, dispatch = view.dispatch;
    var grandParent = state.selection.$from.node(-1);
    var node = createMediaSingleNode(state.schema, collection)(mediaState);
    var shouldSplit = grandParent && grandParent.type.validContent(Fragment.from(node));
    if (shouldSplit) {
        insertNodesWithOptionalParagraph([node])(state, dispatch);
    }
    else {
        dispatch(safeInsert(shouldAddParagraph(view.state)
            ? Fragment.fromArray([node, state.schema.nodes.paragraph.create()])
            : node)(state.tr));
    }
    return true;
};
export var createMediaSingleNode = function (schema, collection) { return function (mediaState) {
    var id = mediaState.id, dimensions = mediaState.dimensions, _a = mediaState.scaleFactor, scaleFactor = _a === void 0 ? 1 : _a;
    var _b = dimensions || {
        height: undefined,
        width: undefined,
    }, width = _b.width, height = _b.height;
    var _c = schema.nodes, media = _c.media, mediaSingle = _c.mediaSingle;
    var mediaNode = media.create({
        id: id,
        type: 'file',
        collection: collection,
        width: Math.round(width / scaleFactor),
        height: Math.round(height / scaleFactor),
    });
    copyOptionalAttrsFromMediaState(mediaState, mediaNode);
    return mediaSingle.create({}, mediaNode);
}; };
export function transformSliceForMedia(slice, schema) {
    var _a = schema.nodes, mediaSingle = _a.mediaSingle, layoutSection = _a.layoutSection, table = _a.table;
    return function (selection) {
        if (hasParentNodeOfType([layoutSection, table])(selection)) {
            return mapSlice(slice, function (node) {
                return node.type.name === 'mediaSingle'
                    ? mediaSingle.createChecked({}, node.content, node.marks)
                    : node;
            });
        }
        return slice;
    };
}
//# sourceMappingURL=media-single.js.map