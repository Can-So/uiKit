import { TableMap } from 'prosemirror-tables';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import {
  tableCellMinWidth,
  akEditorTableNumberColumnWidth,
  akEditorTableToolbarSize,
} from '@atlaskit/editor-common';
import { TableCssClassName as ClassName } from '../../types';
import { addContainerLeftRightPadding } from './resizer/utils';

import Resizer from './resizer/resizer';
import ResizeState from './resizer/resizeState';
import { pluginKey as resizePluginKey } from './plugin';

import { getPluginState } from '../main';
import { updateRightShadow } from '../../nodeviews/TableComponent';

import {
  hasTableBeenResized,
  getTableWidth,
  insertColgroupFromNode as recreateResizeColsByNode,
} from '../../utils';
import { closestElement } from '../../../../utils';
import { getLayoutSize, tableLayoutToSize } from './utils';

export function updateColumnWidth(view, cell, movedWidth, resizer) {
  let $cell = view.state.doc.resolve(cell);
  let table = $cell.node(-1);
  let map = TableMap.get(table);
  let start = $cell.start(-1);
  let col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;

  const newState = resizer.resize(col, movedWidth);
  const tr = applyColumnWidths(view, newState, table, start);

  if (tr.docChanged) {
    view.dispatch(tr);
  }
}

export function applyColumnWidths(view, state, table, start) {
  let tr = view.state.tr;
  let map = TableMap.get(table);

  for (let i = 0; i < state.cols.length; i++) {
    const width = state.cols[i].width;
    // we need to recalculate table node to pick up attributes from the previous loop iteration
    table = tr.doc.nodeAt(start - 1);

    for (let row = 0; row < map.height; row++) {
      let mapIndex = row * map.width + i;
      // Rowspanning cell that has already been handled
      if (row && map.map[mapIndex] === map.map[mapIndex - map.width]) {
        continue;
      }
      let pos = map.map[mapIndex];
      let { attrs } = table.nodeAt(pos);
      let index = attrs.colspan === 1 ? 0 : i - map.colCount(pos);

      if (attrs.colwidth && attrs.colwidth[index] === width) {
        continue;
      }

      let colwidth = attrs.colwidth
        ? attrs.colwidth.slice()
        : Array.from({ length: attrs.colspan }, _ => 0);

      colwidth[index] = width;
      tr = tr.setNodeMarkup(start + pos, null, { ...attrs, colwidth });
    }
  }
  return tr;
}

export function handleBreakoutContent(
  view: EditorView,
  elem: HTMLElement,
  start: number,
  minWidth: number,
  node: PMNode,
) {
  const colIdx = Array.from((elem.parentNode as HTMLElement).children).indexOf(
    elem,
  );

  const cellStyle = getComputedStyle(elem);
  const amount = addContainerLeftRightPadding(
    minWidth - elem.offsetWidth,
    cellStyle,
  );

  const state = resizeColumnTo(view, start, elem, colIdx, amount, node);
  updateControls(view.state);
  const tr = applyColumnWidths(view, state, node, start);

  if (tr.docChanged) {
    view.dispatch(tr);
  }
}

export function resizeColumn(view, cell, width, resizer) {
  let $cell = view.state.doc.resolve(cell);
  let table = $cell.node(-1);
  let start = $cell.start(-1);
  let col =
    TableMap.get(table).colCount($cell.pos - start) +
    $cell.nodeAfter.attrs.colspan -
    1;

  const newState = resizer.resize(col, width);
  resizer.apply(newState);

  return newState;
}

export const updateResizeHandle = (view: EditorView) => {
  const { state } = view;
  const { activeHandle } = resizePluginKey.getState(state);
  if (activeHandle === -1) {
    return false;
  }

  const $cell = view.state.doc.resolve(activeHandle);
  const tablePos = $cell.start(-1) - 1;
  const tableWrapperRef = findDomRefAtPos(
    tablePos,
    view.domAtPos.bind(view),
  ) as HTMLDivElement;

  const resizeHandleRef = tableWrapperRef.querySelector(
    `.${ClassName.COLUMN_RESIZE_HANDLE}`,
  ) as HTMLDivElement;

  const tableRef = tableWrapperRef.querySelector(`table`) as HTMLTableElement;

  if (tableRef && resizeHandleRef) {
    const cellRef = findDomRefAtPos(
      activeHandle,
      view.domAtPos.bind(view),
    ) as HTMLTableCellElement;
    const tableActive = closestElement(tableRef, `.${ClassName.WITH_CONTROLS}`);
    resizeHandleRef.style.height = `${
      tableActive
        ? tableRef.offsetHeight + akEditorTableToolbarSize
        : tableRef.offsetHeight
    }px`;

    resizeHandleRef.style.left = `${cellRef.offsetLeft +
      cellRef.offsetWidth}px`;
  }
};

/**
 * Updates the column controls on resize
 */
export const updateControls = (state: EditorState) => {
  const { tableRef } = getPluginState(state);
  if (!tableRef) {
    return;
  }
  const tr = tableRef.querySelector('tr');
  if (!tr) {
    return;
  }
  const cols = tr.children;
  const wrapper = tableRef.parentElement;
  const columnControls: any = wrapper.querySelectorAll(
    `.${ClassName.COLUMN_CONTROLS_BUTTON_WRAP}`,
  );
  const rows = tableRef.querySelectorAll('tr');
  const rowControls: any = wrapper.parentElement.querySelectorAll(
    `.${ClassName.ROW_CONTROLS_BUTTON_WRAP}`,
  );
  const numberedRows = wrapper.parentElement.querySelectorAll(
    ClassName.NUMBERED_COLUMN_BUTTON,
  );

  const getWidth = (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    return rect ? rect.width : element.offsetWidth;
  };

  const getHeight = (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    return rect ? rect.height : element.offsetHeight;
  };

  // update column controls width on resize
  for (let i = 0, count = columnControls.length; i < count; i++) {
    if (cols[i]) {
      columnControls[i].style.width = `${getWidth(cols[i]) + 1}px`;
    }
  }
  // update rows controls height on resize
  for (let i = 0, count = rowControls.length; i < count; i++) {
    if (rows[i]) {
      rowControls[i].style.height = `${getHeight(rows[i]) + 1}px`;

      if (numberedRows.length) {
        numberedRows[i].style.height = `${getHeight(rows[i]) + 1}px`;
      }
    }
  }

  updateRightShadow(
    wrapper,
    tableRef,
    wrapper.parentElement.querySelector(`.${ClassName.TABLE_RIGHT_SHADOW}`),
  );
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
export function scaleTable(
  view: EditorView,
  tableElem: HTMLTableElement | null,
  node: PMNode,
  prevNode: PMNode,
  pos: number,
  containerWidth: number | undefined,
  initialScale?: boolean,
  dynamicTextSizing?: boolean,
) {
  if (!tableElem) {
    return;
  }

  const start = pos + 1;
  const state = scale(
    view,
    tableElem,
    node,
    start,
    prevNode,
    containerWidth,
    initialScale,
    dynamicTextSizing,
  );

  if (state) {
    const tr = applyColumnWidths(view, state, node, start);

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
function scale(
  view: EditorView,
  tableElem: HTMLTableElement,
  node: PMNode,
  start: number,
  prevNode: PMNode,
  containerWidth: number | undefined,
  initialScale?: boolean,
  dynamicTextSizing?: boolean,
): ResizeState | undefined {
  // If a table has not been resized yet, columns should be auto.
  if (hasTableBeenResized(node) === false) {
    // If its not a re-sized table, we still want to re-create cols
    // To force reflow of columns upon delete.
    recreateResizeColsByNode(tableElem, node);
    return;
  }

  const maxSize = getLayoutSize(node.attrs.layout, containerWidth);
  const resizer = Resizer.fromDOM(view, tableElem, {
    minWidth: tableCellMinWidth,
    maxSize,
    node,
    start,
  });

  let newWidth = maxSize;
  let prevTableWidth = getTableWidth(prevNode);
  let previousMaxSize = tableLayoutToSize[prevNode.attrs.layout];

  if (!initialScale) {
    previousMaxSize = getLayoutSize(
      prevNode.attrs.layout,
      containerWidth,
      dynamicTextSizing,
    );
  }

  // Determine if table was overflow
  if (prevTableWidth > previousMaxSize) {
    const overflowScale = prevTableWidth / previousMaxSize;
    newWidth = Math.floor(newWidth * overflowScale);
  }

  if (node.attrs.isNumberColumnEnabled) {
    newWidth -= akEditorTableNumberColumnWidth;
  }

  return resizer.scale(newWidth);
}

/**
 * Light wrapper over Resizer.resize
 * Mainly used to re-set a columns width.
 * @param elem
 * @param colIdx
 * @param amount
 * @param node
 */
export function resizeColumnTo(
  view: EditorView,
  start: number,
  elem: HTMLElement,
  colIdx: number,
  amount: number,
  node: PMNode,
): ResizeState {
  while (elem.nodeName !== 'TABLE') {
    elem = elem.parentNode as HTMLElement;
  }

  const resizer = Resizer.fromDOM(view, elem as HTMLTableElement, {
    minWidth: tableCellMinWidth,
    maxSize: elem.offsetWidth,
    node: node,
    start,
  });

  const newState = resizer.resize(colIdx, amount);
  resizer.apply(newState);

  return newState;
}
