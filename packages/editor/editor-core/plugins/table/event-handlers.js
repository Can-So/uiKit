import { findTable } from 'prosemirror-utils';
import { TextSelection, Selection } from 'prosemirror-state';
import { TableMap, cellAround } from 'prosemirror-tables';
import { browser } from '@atlaskit/editor-common';
import { isElementInTableCell, setNodeSelection, isLastItemMediaGroup, closestElement, } from '../../utils/';
import { isInsertColumnButton, isInsertRowButton, getIndex } from './utils';
import { setEditorFocus, showInsertColumnButton, showInsertRowButton, handleShiftSelection, hideInsertColumnOrRowButton, } from './actions';
export var handleBlur = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    // fix for issue ED-4665
    if (browser.ie_version !== 11) {
        setEditorFocus(false)(state, dispatch);
    }
    event.preventDefault();
    return false;
};
export var handleFocus = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    setEditorFocus(true)(state, dispatch);
    event.preventDefault();
    return false;
};
export var handleClick = function (view, event) {
    var element = event.target;
    var table = findTable(view.state.selection);
    /**
     * Check if the table cell with an image is clicked
     * and its not the image itself
     */
    var matches = element.matches ? 'matches' : 'msMatchesSelector';
    if (!table ||
        !isElementInTableCell(element) ||
        element[matches]('table .image, table p, table .image div')) {
        return false;
    }
    var map = TableMap.get(table.node);
    /** Getting the offset of current item clicked */
    var colElement = (closestElement(element, 'td') ||
        closestElement(element, 'th'));
    var colIndex = colElement && colElement.cellIndex;
    var rowElement = closestElement(element, 'tr');
    var rowIndex = rowElement && rowElement.rowIndex;
    var cellIndex = map.width * rowIndex + colIndex;
    var posInTable = map.map[cellIndex + 1];
    var dispatch = view.dispatch, _a = view.state, tr = _a.tr, paragraph = _a.schema.nodes.paragraph;
    var editorElement = table.node.nodeAt(map.map[cellIndex]);
    /** Only if the last item is media group, insert a paragraph */
    if (isLastItemMediaGroup(editorElement)) {
        tr.insert(posInTable + table.pos, paragraph.create());
        dispatch(tr);
        setNodeSelection(view, posInTable + table.pos);
    }
    return true;
};
export var handleMouseOver = function (view, mouseEvent) {
    var state = view.state, dispatch = view.dispatch;
    var target = mouseEvent.target;
    if (isInsertColumnButton(target)) {
        return showInsertColumnButton(getIndex(target))(state, dispatch);
    }
    if (isInsertRowButton(target)) {
        return showInsertRowButton(getIndex(target))(state, dispatch);
    }
    if (hideInsertColumnOrRowButton(state, dispatch)) {
        return true;
    }
    return false;
};
export var handleMouseLeave = function (view) {
    var state = view.state, dispatch = view.dispatch;
    if (hideInsertColumnOrRowButton(state, dispatch)) {
        return true;
    }
    return false;
};
export function handleTripleClick(view, pos) {
    var state = view.state, dispatch = view.dispatch;
    var $cellPos = cellAround(state.doc.resolve(pos));
    if (!$cellPos) {
        return false;
    }
    var cell = state.doc.nodeAt($cellPos.pos);
    if (cell) {
        var selFrom = Selection.findFrom($cellPos, 1, true);
        var selTo = Selection.findFrom(state.doc.resolve($cellPos.pos + cell.nodeSize), -1, true);
        if (selFrom && selTo) {
            dispatch(state.tr.setSelection(new TextSelection(selFrom.$from, selTo.$to)));
            return true;
        }
    }
    return false;
}
export var handleMouseDown = function (view, event) {
    var state = view.state, dispatch = view.dispatch;
    // shift-selecting table rows/columns
    if (handleShiftSelection(event)(state, dispatch)) {
        return true;
    }
    return false;
};
//# sourceMappingURL=event-handlers.js.map