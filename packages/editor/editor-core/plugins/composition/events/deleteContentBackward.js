import { TextSelection, Selection } from 'prosemirror-state';
// Nodes that PM needs a hand deleting when composing.
var deletableNodes = ['emoji', 'mention'];
/**
 * This should be called on a `beforeinput` event.
 *
 * Android composition events aren't handled well by Prosemirror
 * We've added a couple of beforeinput hooks to help PM out when trying to delete
 * certain nodes. We can remove these when PM has better composition support.
 * @see https://github.com/ProseMirror/prosemirror/issues/543
 */
export var patchDeleteContentBackward = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    var $from = state.selection.$from;
    /**
     * If text contains marks, composition events won't delete any characters.
     */
    if ($from.nodeBefore &&
        $from.nodeBefore.type.name === 'text' &&
        $from.nodeBefore.marks.length) {
        event.preventDefault();
        var tr = state.tr;
        dispatch(tr
            .delete($from.pos - 1, $from.pos)
            .setSelection(Selection.near(tr.doc.resolve(tr.mapping.map($from.pos - 1)))));
        return true;
    }
    /**
     * This block caters for the standard composition backspace.
     * We check to see if the previous node is one we want to ensure is deleted
     */
    if ($from.nodeBefore &&
        deletableNodes.indexOf($from.nodeBefore.type.name) !== -1) {
        event.preventDefault();
        var tr = state.tr;
        dispatch(tr
            .delete($from.pos - $from.nodeBefore.nodeSize, $from.pos)
            .setSelection(Selection.near(tr.doc.resolve(tr.mapping.map($from.pos - $from.nodeBefore.nodeSize)))));
        return true;
    }
    /**
     * This block caters for highlighting the defined nodes.
     */
    if (state.selection instanceof TextSelection &&
        state.selection.$cursor === null &&
        $from.nodeAfter &&
        deletableNodes.indexOf($from.nodeAfter.type.name) !== -1) {
        event.preventDefault();
        dispatch(state.tr.deleteSelection());
        return true;
    }
    return false;
};
//# sourceMappingURL=deleteContentBackward.js.map