import { Plugin } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { InsertStatus, stateKey as hyperlinkStateKey, } from './main';
var createTextCursor = function (pos) {
    var node = document.createElement('div');
    node.className = 'ProseMirror-fake-text-cursor';
    return Decoration.widget(pos, node);
};
var createTextSelection = function (from, to) {
    return Decoration.inline(from, to, { class: 'ProseMirror-fake-text-selection' });
};
var getInsertLinkToolbarState = function (editorState) {
    var state = hyperlinkStateKey.getState(editorState);
    if (state && state.activeLinkMark) {
        if (state.activeLinkMark.type === InsertStatus.INSERT_LINK_TOOLBAR) {
            return state.activeLinkMark;
        }
    }
    return undefined;
};
var fakeCursorToolbarPlugin = new Plugin({
    state: {
        init: function () {
            return DecorationSet.empty;
        },
        apply: function (tr, pluginState, oldState, newState) {
            var oldInsertToolbarState = getInsertLinkToolbarState(oldState);
            var insertToolbarState = getInsertLinkToolbarState(newState);
            // Map DecorationSet if it still refers to the same position in the document
            if (oldInsertToolbarState && insertToolbarState) {
                var from = insertToolbarState.from, to = insertToolbarState.to;
                var oldFrom = tr.mapping.map(oldInsertToolbarState.from);
                var oldTo = tr.mapping.map(oldInsertToolbarState.to);
                if (oldFrom === from && oldTo === to) {
                    return pluginState.map(tr.mapping, tr.doc);
                }
            }
            // Update DecorationSet if new insert toolbar, or if we have moved to a different position in the doc
            if (insertToolbarState) {
                var from = insertToolbarState.from, to = insertToolbarState.to;
                return DecorationSet.create(tr.doc, [
                    from === to ? createTextCursor(from) : createTextSelection(from, to),
                ]);
            }
            return DecorationSet.empty;
        },
    },
    props: {
        decorations: function (state) {
            return fakeCursorToolbarPlugin.getState(state);
        },
    },
});
export default fakeCursorToolbarPlugin;
//# sourceMappingURL=fake-cursor-for-toolbar.js.map