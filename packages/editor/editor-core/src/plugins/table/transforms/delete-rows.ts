import { Transaction, Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findTable, getSelectionRect } from 'prosemirror-utils';
import { Node as PMNode } from 'prosemirror-model';
import { removeEmptyColumns } from './merge';

export const deleteRows = (
  rowsToDelete: number[] = [],
  isHeaderRowRequired: boolean = false,
) => (tr: Transaction): Transaction => {
  const table = findTable(tr.selection);
  if (!table) {
    return tr;
  }
  const map = TableMap.get(table.node);
  if (!rowsToDelete.length) {
    const rect = getSelectionRect(tr.selection);
    if (rect) {
      rowsToDelete = [];
      for (let i = rect.top; i < rect.bottom; i++) {
        // skip header row if its required
        if (isHeaderRowRequired) {
          const cell = table.node.nodeAt(map.map[i * map.width]);
          if (cell && cell.type !== cell.type.schema.nodes.tableHeader) {
            rowsToDelete.push(i);
          }
        } else {
          rowsToDelete.push(i);
        }
      }
    }
  }
  if (!rowsToDelete.length) {
    return tr;
  }

  const rows: PMNode[] = [];
  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    if (rowsToDelete.indexOf(rowIndex) === -1) {
      rows.push(table.node.child(rowIndex));
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
  const cursorPos = getNextCursorPos(newTable, rowsToDelete);

  return (
    tr
      .replaceWith(
        table.pos,
        table.pos + table.node.nodeSize,
        removeEmptyColumns(newTable),
      )
      // move cursor before the deleted rows if possible, otherwise - to the first row
      .setSelection(Selection.near(tr.doc.resolve(table.pos + cursorPos)))
  );
};

function getNextCursorPos(table: PMNode, deletedRows: number[]): number {
  const minRow = Math.min(...deletedRows);
  const nextRowWithCursor = minRow > 0 ? minRow - 1 : 0;
  const map = TableMap.get(table);
  return map.map[nextRowWithCursor * map.width];
}
