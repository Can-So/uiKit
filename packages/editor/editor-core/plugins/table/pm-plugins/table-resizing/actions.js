import * as tslib_1 from "tslib";
import { TableMap } from 'prosemirror-tables';
import { findDomRefAtPos } from 'prosemirror-utils';
import { gridSize } from '@atlaskit/theme';
import { tableCellMinWidth, akEditorTableNumberColumnWidth, akEditorTableToolbarSize, } from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../../types';
import { addContainerLeftRightPadding } from './resizer/utils';
import Resizer from './resizer/resizer';
import { pluginKey as resizePluginKey } from './plugin';
import { getPluginState } from '../main';
import { updateRightShadow } from '../../nodeviews/TableComponent';
import { hasTableBeenResized, getTableWidth, insertColgroupFromNode as recreateResizeColsByNode, } from '../../utils';
import { closestElement } from '../../../../utils';
import { getLayoutSize, getDefaultLayoutMaxWidth, tableLayoutToSize, } from './utils';
export function updateColumnWidth(view, cell, movedWidth, resizer) {
    var $cell = view.state.doc.resolve(cell);
    var table = $cell.node(-1);
    var map = TableMap.get(table);
    var start = $cell.start(-1);
    var col = map.colCount($cell.pos - start) +
        ($cell.nodeAfter ? $cell.nodeAfter.attrs.colspan : 1) -
        1;
    var newState = resizer.resize(col, movedWidth);
    var tr = applyColumnWidths(view, newState, table, start);
    if (tr.docChanged) {
        view.dispatch(tr);
    }
}
export function applyColumnWidths(view, state, table, start) {
    var tr = view.state.tr;
    var map = TableMap.get(table);
    for (var i = 0; i < state.cols.length; i++) {
        var width = state.cols[i].width;
        // we need to recalculate table node to pick up attributes from the previous loop iteration
        table = tr.doc.nodeAt(start - 1);
        for (var row = 0; row < map.height; row++) {
            var mapIndex = row * map.width + i;
            // Rowspanning cell that has already been handled
            if (row && map.map[mapIndex] === map.map[mapIndex - map.width]) {
                continue;
            }
            var pos = map.map[mapIndex];
            var attrs = (table.nodeAt(pos) || { attrs: {} }).attrs;
            var index = attrs.colspan === 1 ? 0 : i - map.colCount(pos);
            if (attrs.colwidth && attrs.colwidth[index] === width) {
                continue;
            }
            var colwidth = attrs.colwidth
                ? attrs.colwidth.slice()
                : Array.from({ length: attrs.colspan }, function (_) { return 0; });
            colwidth[index] = width;
            tr = tr.setNodeMarkup(start + pos, undefined, tslib_1.__assign({}, attrs, { colwidth: colwidth }));
        }
    }
    return tr;
}
export function handleBreakoutContent(view, elem, cellPos, start, minWidth, node) {
    var map = TableMap.get(node);
    var rect = map.findCell(cellPos - start);
    var colIdx = rect.left;
    var cellStyle = getComputedStyle(elem);
    var amount = addContainerLeftRightPadding(minWidth - elem.offsetWidth, cellStyle);
    var state = resizeColumnTo(view, start, elem, colIdx, amount, node);
    updateControls(view.state);
    var tr = applyColumnWidths(view, state, node, start);
    if (tr.docChanged) {
        view.dispatch(tr);
    }
}
export function resizeColumn(view, cell, width, resizer) {
    var $cell = view.state.doc.resolve(cell);
    var table = $cell.node(-1);
    var start = $cell.start(-1);
    var col = TableMap.get(table).colCount($cell.pos - start) +
        $cell.nodeAfter.attrs.colspan -
        1;
    var newState = resizer.resize(col, width);
    resizer.apply(newState);
    return newState;
}
export var updateResizeHandle = function (view) {
    var state = view.state;
    var activeHandle = resizePluginKey.getState(state).activeHandle;
    if (activeHandle === -1) {
        return false;
    }
    var $cell = view.state.doc.resolve(activeHandle);
    var tablePos = $cell.start(-1) - 1;
    var tableWrapperRef = findDomRefAtPos(tablePos, view.domAtPos.bind(view));
    var resizeHandleRef = tableWrapperRef.querySelector("." + ClassName.COLUMN_RESIZE_HANDLE);
    var tableRef = tableWrapperRef.querySelector("table");
    if (tableRef && resizeHandleRef) {
        var cellRef = findDomRefAtPos(activeHandle, view.domAtPos.bind(view));
        var tableActive = closestElement(tableRef, "." + ClassName.WITH_CONTROLS);
        resizeHandleRef.style.height = (tableActive
            ? tableRef.offsetHeight + akEditorTableToolbarSize
            : tableRef.offsetHeight) + "px";
        resizeHandleRef.style.left = cellRef.offsetLeft +
            cellRef.offsetWidth + "px";
    }
};
/**
 * Updates the column controls on resize
 */
export var updateControls = function (state) {
    var tableRef = getPluginState(state).tableRef;
    if (!tableRef) {
        return;
    }
    var tr = tableRef.querySelector('tr');
    if (!tr) {
        return;
    }
    var cols = tr.children;
    var wrapper = tableRef.parentElement;
    var columnControls = wrapper.querySelectorAll("." + ClassName.COLUMN_CONTROLS_BUTTON_WRAP);
    var rows = tableRef.querySelectorAll('tr');
    var rowControls = wrapper.parentElement.querySelectorAll("." + ClassName.ROW_CONTROLS_BUTTON_WRAP);
    var numberedRows = wrapper.parentElement.querySelectorAll(ClassName.NUMBERED_COLUMN_BUTTON);
    var getWidth = function (element) {
        var rect = element.getBoundingClientRect();
        return rect ? rect.width : element.offsetWidth;
    };
    var getHeight = function (element) {
        var rect = element.getBoundingClientRect();
        return rect ? rect.height : element.offsetHeight;
    };
    // update column controls width on resize
    for (var i = 0, count = columnControls.length; i < count; i++) {
        if (cols[i]) {
            columnControls[i].style.width = getWidth(cols[i]) + 1 + "px";
        }
    }
    // update rows controls height on resize
    for (var i = 0, count = rowControls.length; i < count; i++) {
        if (rows[i]) {
            rowControls[i].style.height = getHeight(rows[i]) + 1 + "px";
            if (numberedRows.length) {
                numberedRows[i].style.height = getHeight(rows[i]) + 1 + "px";
            }
        }
    }
    updateRightShadow(wrapper, tableRef, wrapper.parentElement.querySelector("." + ClassName.TABLE_RIGHT_SHADOW));
};
/**
 * Scale the table to meet new requirements (col, layout change etc)
 * @param view
 * @param tableElem
 * @param node
 * @param pos
 * @param containerWidth
 * @param currentLayout
 */
export function scaleTable(view, tableElem, node, prevNode, pos, containerWidth, initialScale, parentWidth, dynamicTextSizing) {
    if (!tableElem) {
        return;
    }
    // If a table has not been resized yet, columns should be auto.
    if (hasTableBeenResized(node) === false) {
        // If its not a re-sized table, we still want to re-create cols
        // To force reflow of columns upon delete.
        recreateResizeColsByNode(tableElem, node);
        return;
    }
    var start = pos + 1;
    var state;
    if (parentWidth) {
        state = scaleWithParent(view, tableElem, parentWidth, node, start);
    }
    else {
        state = scale(view, tableElem, node, start, prevNode, containerWidth, initialScale, dynamicTextSizing);
    }
    if (state) {
        var tr = applyColumnWidths(view, state, node, start);
        if (tr.docChanged) {
            view.dispatch(tr);
        }
    }
}
/**
 * Base function to trigger the actual scale on a table node.
 * Will only resize/scale if a table has been previously resized.
 * @param tableElem
 * @param node
 * @param maxSize
 */
function scale(view, tableElem, node, start, prevNode, containerWidth, initialScale, dynamicTextSizing) {
    var maxSize = getLayoutSize(node.attrs.layout, containerWidth, dynamicTextSizing);
    var prevTableWidth = getTableWidth(prevNode);
    var previousLayout = prevNode.attrs.layout;
    var previousMaxSize = tableLayoutToSize[previousLayout];
    if (dynamicTextSizing && previousLayout === 'default') {
        previousMaxSize = getDefaultLayoutMaxWidth(containerWidth);
    }
    if (!initialScale) {
        previousMaxSize = getLayoutSize(prevNode.attrs.layout, containerWidth, dynamicTextSizing);
    }
    var newWidth = maxSize;
    // Determine if table was overflow
    if (prevTableWidth > previousMaxSize) {
        var overflowScale = prevTableWidth / previousMaxSize;
        newWidth = Math.floor(newWidth * overflowScale);
    }
    if (node.attrs.isNumberColumnEnabled) {
        newWidth -= akEditorTableNumberColumnWidth;
    }
    var resizer = Resizer.fromDOM(view, tableElem, {
        minWidth: tableCellMinWidth,
        maxSize: maxSize,
        node: node,
        start: start,
    });
    return resizer.scale(newWidth);
}
function scaleWithParent(view, tableElem, parentWidth, tableNode, start) {
    var resizer = Resizer.fromDOM(view, tableElem, {
        minWidth: tableCellMinWidth,
        maxSize: parentWidth,
        node: tableNode,
        start: start,
    });
    // Need to acount for the padding of the extension.
    parentWidth -= gridSize() * 4;
    if (tableNode.attrs.isNumberColumnEnabled) {
        parentWidth -= akEditorTableNumberColumnWidth;
    }
    return resizer.scale(Math.floor(parentWidth));
}
/**
 * Light wrapper over Resizer.resize
 * Mainly used to re-set a columns width.
 * @param elem
 * @param colIdx
 * @param amount
 * @param node
 */
export function resizeColumnTo(view, start, elem, colIdx, amount, node) {
    while (elem.nodeName !== 'TABLE') {
        elem = elem.parentNode;
    }
    var resizer = Resizer.fromDOM(view, elem, {
        minWidth: tableCellMinWidth,
        maxSize: elem.offsetWidth,
        node: node,
        start: start,
    });
    var newState = resizer.resize(colIdx, amount);
    resizer.apply(newState);
    return newState;
}
//# sourceMappingURL=actions.js.map