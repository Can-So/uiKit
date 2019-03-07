import { Transaction, Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findTable, getSelectionRect } from 'prosemirror-utils';
import { Node as PMNode } from 'prosemirror-model';

export const deleteColumns = (columnsToDelete: number[] = []) => (
  tr: Transaction,
): Transaction => {
  const table = findTable(tr.selection);
  if (!table) {
    return tr;
  }
  if (!columnsToDelete.length) {
    const rect = getSelectionRect(tr.selection);
    if (rect) {
      columnsToDelete = [];
      for (let i = rect.left; i < rect.right; i++) {
        columnsToDelete.push(i);
      }
    }
  }

  if (!columnsToDelete.length) {
    return tr;
  }

  const map = TableMap.get(table.node);
  const rows: PMNode[] = [];
  const seen: number[] = [];
  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const rowCells: PMNode[] = [];
    const row = table.node.child(rowIndex);

    for (let colIndex = 0; colIndex < map.width; colIndex++) {
      if (columnsToDelete.indexOf(colIndex) > -1) {
        continue;
      }
      const cellPos = map.map[rowIndex * map.width + colIndex];
      const cell = table.node.nodeAt(cellPos);
      if (cell && seen.indexOf(cellPos) === -1) {
        seen.push(cellPos);
        rowCells.push(cell);
      }
    }
    if (rowCells.length) {
      rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
    }
  }

  if (!rows.length) {
    return tr;
  }

  const newTable = table.node.type.createChecked(
    table.node.attrs,
    rows,
    table.node.marks,
  );
  const cursorPos = getNextCursorPos(newTable, columnsToDelete);
  return (
    tr
      .replaceWith(
        table.pos,
        table.pos + table.node.nodeSize,
        fixRowSpans(newTable),
      )
      // move cursor to the left of the deleted columns if possible, otherwise - to the first column
      .setSelection(Selection.near(tr.doc.resolve(table.pos + cursorPos)))
  );
};

function getNextCursorPos(table: PMNode, deletedColumns: number[]): number {
  const minColumn = Math.min(...deletedColumns);
  const nextColumnWithCursor = minColumn > 0 ? minColumn - 1 : 0;
  const map = TableMap.get(table);
  return map.map[nextColumnWithCursor];
}

// returns an array of numbers, each number indicates the minimum rowSpan in each row
function getMinRowSpans(table: PMNode): number[] {
  const minRowSpans: number[] = [];
  for (let rowIndex = 0; rowIndex < table.childCount; rowIndex++) {
    const rowSpans: number[] = [];
    const row = table.child(rowIndex);
    for (let colIndex = 0; colIndex < row.childCount; colIndex++) {
      const cell = row.child(colIndex);
      rowSpans.push(cell.attrs.rowspan);
    }
    minRowSpans[rowIndex] = Math.min(...rowSpans);
  }

  return minRowSpans;
}

function fixRowSpans(table: PMNode): PMNode {
  const map = TableMap.get(table);
  const minRowSpans = getMinRowSpans(table);
  if (!minRowSpans.some(rowspan => rowspan > 1)) {
    return table;
  }

  const rows: PMNode[] = [];
  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const row = table.child(rowIndex);
    if (minRowSpans[rowIndex] === 1) {
      rows.push(row);
    } else {
      const rowCells: PMNode[] = [];
      for (let colIndex = 0; colIndex < row.childCount; colIndex++) {
        const cell = row.child(colIndex);
        const rowspan = cell.attrs.rowspan - minRowSpans[rowIndex] + 1;
        const newCell = cell.type.createChecked(
          {
            ...cell.attrs,
            rowspan,
          },
          cell.content,
          cell.marks,
        );
        rowCells.push(newCell);
      }
      rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
    }
  }

  return table.type.createChecked(table.attrs, rows, table.marks);
}
