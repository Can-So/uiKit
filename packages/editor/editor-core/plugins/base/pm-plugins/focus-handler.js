import { PluginKey, Plugin } from 'prosemirror-state';
export var focusStateKey = new PluginKey('focusStatePlugin');
export default (function (dispatch) {
    return new Plugin({
        key: focusStateKey,
        state: {
            init: function () { return true; },
            apply: function (tr, wasEditorFocused) {
                var meta = tr.getMeta(focusStateKey);
                if (typeof meta === 'boolean') {
                    if (meta !== wasEditorFocused) {
                        dispatch(focusStateKey, meta);
                        return meta;
                    }
                }
                return wasEditorFocused;
            },
        },
        props: {
            handleDOMEvents: {
                click: function (view) {
                    var isEditorFocused = focusStateKey.getState(view.state);
                    if (!isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(focusStateKey, view.hasFocus()));
                    }
                    return false;
                },
                focus: function (view) {
                    var isEditorFocused = focusStateKey.getState(view.state);
                    if (!isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(focusStateKey, true));
                    }
                    return false;
                },
                blur: function (view) {
                    var isEditorFocused = focusStateKey.getState(view.state);
                    if (isEditorFocused) {
                        view.dispatch(view.state.tr.setMeta(focusStateKey, false));
                    }
                    return false;
                },
            },
        },
    });
});
//# sourceMappingURL=focus-handler.js.map