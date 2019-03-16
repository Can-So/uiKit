import { isMarkAllowedInRange, isMarkExcluded } from '../../../utils/mark';
export var getDisabledState = function (state) {
    var textColor = state.schema.marks.textColor;
    if (textColor) {
        var _a = state.selection, empty = _a.empty, ranges = _a.ranges, $cursor = _a.$cursor;
        if ((empty && !$cursor) ||
            isMarkAllowedInRange(state.doc, ranges, textColor) === false) {
            return true;
        }
        if (isMarkExcluded(textColor, state.storedMarks || ($cursor && $cursor.marks()))) {
            return true;
        }
        return false;
    }
    return true;
};
//# sourceMappingURL=disabled.js.map