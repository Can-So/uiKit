export function pluginFactory(props) {
    var pluginKey = props.pluginKey, reducer = props.reducer, mapping = props.mapping, initialState = props.initialState, onDocChanged = props.onDocChanged, onSelectionChanged = props.onSelectionChanged;
    return {
        createPluginState: function (dispatch) { return ({
            init: function () { return initialState || {}; },
            apply: function (tr, _pluginState) {
                var pluginState = mapping ? mapping(tr, _pluginState) : _pluginState;
                var meta = tr.getMeta(pluginKey);
                if (meta) {
                    var newState = reducer(pluginState, meta);
                    if (newState !== pluginState) {
                        dispatch(pluginKey, newState);
                        return newState;
                    }
                }
                if (onDocChanged && tr.docChanged) {
                    return onDocChanged(pluginState);
                }
                if (onSelectionChanged && tr.selectionSet) {
                    return onSelectionChanged(pluginState);
                }
                return pluginState;
            },
        }); },
        createAction: function (tr, action) { return tr.setMeta(pluginKey, action); },
        getPluginState: function (editorState) { return pluginKey.getState(editorState); },
    };
}
//# sourceMappingURL=plugin-state-factory.js.map