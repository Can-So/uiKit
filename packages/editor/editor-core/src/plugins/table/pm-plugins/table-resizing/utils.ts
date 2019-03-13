import { cellAround, TableMap } from 'prosemirror-tables';
import { TableLayout, CellAttributes } from '@atlaskit/adf-schema';
import {
  calcTableWidth,
  akEditorWideLayoutWidth,
  akEditorDefaultLayoutWidth,
  akEditorFullWidthLayoutWidth,
  getBreakpoint,
  mapBreakpointToLayoutMaxWidth,
} from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';
import { ResolvedPos, NodeSpec } from 'prosemirror-model';

export const tableLayoutToSize: Record<string, number> = {
  default: akEditorDefaultLayoutWidth,
  wide: akEditorWideLayoutWidth,
  'full-width': akEditorFullWidthLayoutWidth,
};

/**
 * Translates named layouts in number values.
 * @param tableLayout
 * @param containerWidth
 */
export function getLayoutSize(
  tableLayout: TableLayout,
  containerWidth: number = 0,
  dynamicTextSizing?: boolean,
) {
  const calculatedTableWidth = calcTableWidth(tableLayout, containerWidth);
  if (calculatedTableWidth.endsWith('px')) {
    return parseInt(calculatedTableWidth, 10);
  }

  if (dynamicTextSizing && tableLayout === 'default') {
    return getDefaultLayoutMaxWidth(containerWidth);
  }

  return tableLayoutToSize[tableLayout] || containerWidth;
}

export function getDefaultLayoutMaxWidth(containerWidth?: number) {
  return mapBreakpointToLayoutMaxWidth(getBreakpoint(containerWidth));
}

/**
 * Does the current position point at a cell.
 * @param $pos
 */
export function pointsAtCell($pos: ResolvedPos<any>) {
  return (
    ($pos.parent.type.spec as NodeSpec & { tableRole: string }).tableRole ===
      'row' && $pos.nodeAfter
  );
}

/**
 * Returns the pos of the cell on the side requested.
 * @param view
 * @param event
 * @param side
 */
export function edgeCell(
  view: EditorView,
  event: MouseEvent,
  side: string,
  handleWidth: number,
) {
  const buffer = side === 'right' ? -handleWidth : handleWidth; // Fixes finicky bug where posAtCoords could return wrong pos.
  let posResult = view.posAtCoords({
    left: event.clientX + buffer,
    top: event.clientY,
  });

  if (!posResult || !posResult.pos) {
    return -1;
  }

  let $cell = cellAround(view.state.doc.resolve(posResult.pos));
  if (!$cell) {
    return -1;
  }
  if (side === 'right') {
    return $cell.pos;
  }

  let map = TableMap.get($cell.node(-1));
  let start = $cell.start(-1);
  let index = map.map.indexOf($cell.pos - start);

  return index % map.width === 0 ? -1 : start + map.map[index - 1];
}

/**
 * Get the current col width, handles colspan.
 * @param view
 * @param cellPos
 * @param param2
 */
export function currentColWidth(
  view: EditorView,
  cellPos: number,
  { colspan, colwidth }: CellAttributes,
) {
  let width = colwidth && colwidth[colwidth.length - 1];
  if (width) {
    return width;
  }
  // Not fixed, read current width from DOM
  let domWidth = (view.domAtPos(cellPos + 1).node as HTMLElement).offsetWidth;
  let parts = colspan || 0;
  if (colwidth) {
    for (let i = 0; i < (colspan || 0); i++) {
      if (colwidth[i]) {
        domWidth -= colwidth[i];
        parts--;
      }
    }
  }

  return domWidth / parts;
}

/**
 * Attempts to find a parent TD/TH depending on target element.
 * @param target
 */
export function domCellAround(target: HTMLElement | null) {
  while (target && target.nodeName !== 'TD' && target.nodeName !== 'TH') {
    target = target.classList.contains('ProseMirror')
      ? null
      : (target.parentNode as HTMLElement | null);
  }
  return target;
}
