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
  table: HTMLElement,
  colIdx: number,
  calculateColWidthCb: (
    col: HTMLElement,
    colComputedStyle: CSSStyleDeclaration,
    colSpan: number,
  ) => number = defaultCalculateColWidthCb,
) => {
  const tbody = table.querySelector('tbody') as HTMLElement;
  if (tbody) {
    table = tbody;
  }

  let maxColWidth = 0;
  let colSpanWidth = 0;
  for (let i = 0; i < table.childElementCount; i++) {
    const row = table.children[i] as HTMLElement;
    if (row.tagName.toUpperCase() !== 'TR') {
      continue;
    }

    const rowChildren = getRowChildren(row);
    const col = rowChildren[colIdx];

    // We may encounter a rowspan'd cell.
    if (!col) {
      continue;
    }

    const colComputedStyle = getComputedStyle(col);
    const colspan = Number(col.getAttribute('colspan') || 1);

    if (colspan > 1) {
      colSpanWidth = calculateColWidthCb(col, colComputedStyle, colspan);
      continue;
    }

    if (colComputedStyle) {
      const colWidth = calculateColWidthCb(col, colComputedStyle, colspan);
      maxColWidth = Math.max(colWidth, maxColWidth);
    }
  }

  return maxColWidth || colSpanWidth;
};

export const unitToNumber = (unit: string | null) => {
  if (unit) {
    return parseFloat(unit);
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
