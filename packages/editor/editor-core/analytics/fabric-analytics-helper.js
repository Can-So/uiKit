import * as keymaps from '../keymaps';
export var InsertType;
(function (InsertType) {
    InsertType["SELECTED"] = "selected";
    InsertType["ENTER"] = "enter";
    InsertType["SHIFT_ENTER"] = "shift-enter";
    InsertType["SPACE"] = "space";
    InsertType["TAB"] = "tab";
})(InsertType || (InsertType = {}));
export function getInsertTypeForKey(key) {
    if (key === keymaps.space.common) {
        return InsertType.SPACE;
    }
    if (key === keymaps.enter.common) {
        return InsertType.ENTER;
    }
    if (key === keymaps.tab.common) {
        return InsertType.TAB;
    }
    if (key === keymaps.insertNewLine.common) {
        return InsertType.SHIFT_ENTER;
    }
    return undefined;
}
//# sourceMappingURL=fabric-analytics-helper.js.map