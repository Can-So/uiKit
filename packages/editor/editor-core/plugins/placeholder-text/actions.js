import { pluginKey } from './index';
export var showPlaceholderFloatingToolbar = function (state, dispatch) {
    var tr = state.tr;
    if (!state.selection.empty) {
        tr.deleteSelection();
    }
    tr.setMeta(pluginKey, { showInsertPanelAt: tr.selection.anchor });
    tr.scrollIntoView();
    dispatch(tr);
    return true;
};
export var insertPlaceholderTextAtSelection = function (value) { return function (state, dispatch) {
    dispatch(state.tr
        .replaceSelectionWith(state.schema.nodes.placeholder.createChecked({ text: value }))
        .setMeta(pluginKey, { showInsertPanelAt: null })
        .scrollIntoView());
    return true;
}; };
export var hidePlaceholderFloatingToolbar = function (state, dispatch) {
    dispatch(state.tr.setMeta(pluginKey, { showInsertPanelAt: null }));
    return true;
};
//# sourceMappingURL=actions.js.map