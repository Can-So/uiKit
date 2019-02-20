import { TableMap } from 'prosemirror-tables';
import { findDomRefAtPos } from 'prosemirror-utils';
import { Node as PMNode } from 'prosemirror-model';
import ColumnState from './columnState';

export interface ColIdxPair {
  col: ColumnState[];
  idx: number;
}

export const makeColIdxPair = (cols: ColumnState[]) => {
  return cols.map((col, idx) => {
    return { col, idx };
  });
};

export const findFreeCol = (colIdxObj, direction) => {
  if (colIdxObj.length === 0) {
    return null;
  }

  let freeAmount = colIdxObj[0].col.freeSpace;
  let freeIdx = 0;

  colIdxObj.slice(1).forEach(({ col }, idx) => {
    const isGreatest = col.freeSpace > freeAmount;

    if (isGreatest) {
      freeAmount = col.freeSpace;
      freeIdx = idx + 1;
    }
  });

  return freeIdx;
};

export const findNextFreeCol = (colIdxObj, direction: number): number => {
  if (colIdxObj.length === 0) {
    return -1;
  }

  if (direction < 0) {
    colIdxObj = colIdxObj.slice().reverse();
  }

  let freeIdx = -1;

  colIdxObj.forEach(({ col }, idx) => {
    if (col.freeSpace && freeIdx === -1) {
      freeIdx = idx;
    }
  });

  if (freeIdx === -1) {
    return -1;
  }

  return direction < 0 ? colIdxObj.length - 1 - freeIdx : freeIdx;
};

export const getRowChildren = (row: HTMLElement) => {
  let children = [] as HTMLElement[];
  for (let i = 0; i < row.childElementCount; i++) {
    const currentCol = row.children[i] as HTMLElement;
    const colspan = Number(currentCol.getAttribute('colspan'));
    if (colspan > 1) {
      children.push(...Array.from({ length: colspan }, _ => currentCol));
    } else {
      children.push(currentCol);
    }
  }

  return children;
};

const defaultCalculateColWidthCb = (
  col: HTMLElement,
  colComputedStyle: CSSStyleDeclaration,
): number => unitToNumber(colComputedStyle.width);

export const calculateColWidth = (
  cells: HTMLElement[],
  calculateColWidthCb: (
    col: HTMLElement,
    colComputedStyle: CSSStyleDeclaration,
    colSpan: number,
  ) => number = defaultCalculateColWidthCb,
) => {
  let maxColWidth = 0;
  let colSpanWidth = 0;

  cells.forEach(col => {
    const colComputedStyle = getComputedStyle(col);
    const colspan = Number(col.getAttribute('colspan') || 1);

    if (colspan > 1) {
      colSpanWidth = calculateColWidthCb(col, colComputedStyle, colspan);
      return;
    }

    if (colComputedStyle) {
      const colWidth = calculateColWidthCb(col, colComputedStyle, colspan);
      maxColWidth = Math.max(colWidth, maxColWidth);
    }
  });

  return maxColWidth || colSpanWidth;
};

export const unitToNumber = (unit: string | null) => {
  if (unit) {
    return parseInt(unit, 10);
  }
  return 0;
};

export const addContainerLeftRightPadding = (
  amount: number,
  computedStyle: CSSStyleDeclaration,
) => {
  return (
    amount +
    unitToNumber(computedStyle.paddingLeft) +
    unitToNumber(computedStyle.paddingRight)
  );
};

export const getCellsRefsInColumn = (
  columnIndex: number,
  table: PMNode,
  start: number,
  domAtPos: (pos: number) => { node: Node; offset: number },
): HTMLElement[] => {
  const map = TableMap.get(table);
  const cellsPositions = map.cellsInRect({
    left: columnIndex,
    right: columnIndex + 1,
    top: 0,
    bottom: map.height,
  });
  const cells: HTMLElement[] = [];
  cellsPositions.forEach(pos => {
    const col = findDomRefAtPos(pos + start, domAtPos) as HTMLElement;
    if (col) {
      cells.push(col);
    }
  });
  return cells;
};
