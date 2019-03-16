import { DEFAULT_COLOR } from '../pm-plugins/main';
export var getActiveColor = function (state) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to, $cursor = _a.$cursor;
    var textColor = state.schema.marks.textColor;
    // Filter out other marks
    var marks = [];
    if ($cursor) {
        marks.push(textColor.isInSet(state.storedMarks || $cursor.marks()) || undefined);
    }
    else {
        state.doc.nodesBetween($from.pos, $to.pos, function (currentNode) {
            var mark = textColor.isInSet(currentNode.marks) || undefined;
            marks.push(mark);
            return !mark;
        });
    }
    // Merge consecutive same color marks
    var prevMark;
    marks = marks.filter(function (mark) {
        if (mark && prevMark && mark.attrs.color === prevMark.attrs.color) {
            return false;
        }
        prevMark = mark;
        return true;
    });
    var marksWithColor = marks.filter(function (mark) { return !!mark; });
    // When mutiple color is selected revert back to default color
    if (marksWithColor.length > 1 ||
        (marksWithColor.length === 1 && marks.length > 2)) {
        return null;
    }
    return marksWithColor.length
        ? marksWithColor[0].attrs.color
        : DEFAULT_COLOR.color;
};
//# sourceMappingURL=color.js.map