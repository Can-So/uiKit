import { pluginKey, ACTIONS } from '../pm-plugins/main';
import { getDisabledState } from '../utils/disabled';
export var toggleColor = function (color) { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    var tr = state.tr;
    var disabledState = getDisabledState(state);
    if (disabledState) {
        if (dispatch) {
            dispatch(tr.setMeta(pluginKey, { action: ACTIONS.DISABLE }));
        }
        return false;
    }
    var _a = state.selection, ranges = _a.ranges, $cursor = _a.$cursor;
    if ($cursor) {
        var mark = textColor.create({ color: color });
        tr = tr.addStoredMark(mark);
        if (dispatch) {
            dispatch(tr.setMeta(pluginKey, { action: ACTIONS.SET_COLOR, color: color }));
        }
        return true;
    }
    for (var i = 0; i < ranges.length; i++) {
        var _b = ranges[i], $from = _b.$from, $to = _b.$to;
        tr = tr.addMark($from.pos, $to.pos, textColor.create({ color: color }));
    }
    tr = tr.scrollIntoView();
    if (dispatch) {
        dispatch(tr.setMeta(pluginKey, { action: ACTIONS.SET_COLOR, color: color }));
    }
    return true;
}; };
//# sourceMappingURL=toggle-color.js.map