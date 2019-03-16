import { pluginKey, ACTIONS } from '../pm-plugins/main';
export var removeColor = function () { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    var _a = state.selection, from = _a.from, to = _a.to, $cursor = _a.$cursor;
    var tr = state.tr;
    if ($cursor) {
        tr = state.tr.removeStoredMark(textColor);
    }
    else {
        tr = state.tr.removeMark(from, to, textColor);
    }
    if (dispatch) {
        dispatch(tr.setMeta(pluginKey, { action: ACTIONS.RESET_COLOR }));
    }
    return true;
}; };
//# sourceMappingURL=remove-color.js.map