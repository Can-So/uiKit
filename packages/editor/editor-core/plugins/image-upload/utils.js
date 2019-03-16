import { NodeSelection } from 'prosemirror-state';
export var isMediaSelected = function (state) {
    var media = state.schema.nodes.media;
    return (state.selection instanceof NodeSelection &&
        state.selection.node.type === media);
};
export var canInsertMedia = function (state) {
    var mediaSingle = state.schema.nodes.mediaSingle;
    var $to = state.selection.$to;
    if (mediaSingle) {
        for (var d = $to.depth; d >= 0; d--) {
            var index = $to.index(d);
            if ($to.node(d).canReplaceWith(index, index, mediaSingle)) {
                return true;
            }
        }
    }
    return false;
};
export var createExternalMediaNode = function (url, schema) {
    var _a = schema.nodes, media = _a.media, mediaSingle = _a.mediaSingle;
    if (!media || !mediaSingle) {
        return null;
    }
    var mediaNode = media.createChecked({
        type: 'external',
        url: url,
    });
    return mediaSingle.createChecked({}, mediaNode);
};
//# sourceMappingURL=utils.js.map