export declare enum InsertType {
    SELECTED = "selected",
    ENTER = "enter",
    SHIFT_ENTER = "shift-enter",
    SPACE = "space",
    TAB = "tab"
}
export declare function getInsertTypeForKey(key?: string): InsertType.ENTER | InsertType.SHIFT_ENTER | InsertType.SPACE | InsertType.TAB | undefined;
