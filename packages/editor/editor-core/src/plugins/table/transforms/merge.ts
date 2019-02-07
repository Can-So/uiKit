import { CellSelection, TableMap } from 'prosemirror-tables';
import { Transaction, Selection } from 'prosemirror-state';
import { Node as PMNode, Fragment } from 'prosemirror-model';
import { getSelectionRect, findTable } from 'prosemirror-utils';
import { CellAttributes } from '@atlaskit/adf-schema';
import { CellRect } from '../types';
import { fireAnalytics } from './fix-tables';

// re-creates table node with merged cells
export function mergeCells(tr: Transaction): Transaction {
  const { selection } = tr;
  if (!(selection instanceof CellSelection) || !canMergeCells(tr)) {
    return tr;
  }

  const rect = getSelectionRect(selection)!;
  const table = findTable(selection)!;
  const map = TableMap.get(table.node);
  const seen: number[] = [];
  const selectedCells = map.cellsInRect(rect);
  let mergedCellPos;

  const rows: PMNode[] = [];
  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const rowCells: PMNode[] = [];
    const row = table.node.child(rowIndex);

    for (let colIndex = 0; colIndex < map.width; colIndex++) {
      const cellPos = map.map[rowIndex * map.width + colIndex];
      const cell = table.node.nodeAt(cellPos);
      if (!cell || seen.indexOf(cellPos) > -1) {
        continue;
      }
      seen.push(cellPos);

      // merged cell
      if (colIndex === rect.left && rowIndex === rect.top) {
        mergedCellPos = cellPos;
        // merge content of the selected cells, dropping empty cells
        let content = isEmptyCell(cell) ? Fragment.empty : cell.content;
        const seenContent: number[] = [mergedCellPos];
        for (let i = rect.top; i < rect.bottom; i++) {
          for (let j = rect.left; j < rect.right; j++) {
            const pos = map.map[i * map.width + j];
            if (seenContent.indexOf(pos) === -1) {
              seenContent.push(pos);
              const copyCell = table.node.nodeAt(pos);
              if (copyCell && !isEmptyCell(copyCell)) {
                content = content.append(copyCell.content);
              }
            }
          }
        }
        // update colspan and rowspan of the merged cell to span the selection
        const attrs = addColSpan(
          {
            ...cell.attrs,
            rowspan: rect.bottom - rect.top,
          },
          cell.attrs.colspan,
          rect.right - rect.left - cell.attrs.colspan,
        );
        const newCell =
          content === Fragment.empty
            ? cell.type.createAndFill(attrs, content, cell.marks)
            : cell.type.createChecked(attrs, content, cell.marks);
        rowCells.push(newCell!);
      } else if (selectedCells.indexOf(cellPos) === -1) {
        // if its one of the selected cells, but not the merged cell, we get rid of it
        // otherwise we keep the cell
        rowCells.push(cell);
      }
    }

    if (rowCells.length) {
      rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
    } else {
      // empty row, we need to fix rowspans for rows above the current one
      for (let i = rows.length - 1; i >= 0; i--) {
        const prevRow = rows[i];
        const cells: PMNode[] = [];
        let rowChanged = false;

        for (let j = 0; j < prevRow.childCount; j++) {
          const cell = prevRow.child(j);
          if (cell.attrs.rowspan + i - 1 >= rows.length) {
            rowChanged = true;
            cells.push(
              cell.type.createChecked(
                {
                  ...cell.attrs,
                  rowspan: cell.attrs.rowspan - 1,
                },
                cell.content,
                cell.marks,
              ),
            );
          } else {
            cells.push(cell);
          }
        }
        if (rowChanged) {
          rows[i] = row.type.createChecked(prevRow.attrs, cells, prevRow.marks);
        }
      }
    }
  }

  // empty tables? cancel merging like nothing happened
  if (!rows.length) {
    // using the same message to check if the problem disappears
    fireAnalytics({ message: 'removeEmptyRows', method: 'mergeCells' });
    return tr;
  }

  const newTable = table.node.type.createChecked(
    table.node.attrs,
    rows,
    table.node.marks,
  );

  return tr
    .replaceWith(
      table.pos,
      table.pos + table.node.nodeSize,
      removeEmptyColumns(newTable),
    )
    .setSelection(
      Selection.near(tr.doc.resolve((mergedCellPos || 0) + table.start)),
    );
}

export function canMergeCells(tr: Transaction): boolean {
  const { selection } = tr;
  if (
    !(selection instanceof CellSelection) ||
    selection.$anchorCell.pos === selection.$headCell.pos
  ) {
    return false;
  }

  const rect = getSelectionRect(selection);
  if (!rect) {
    return false;
  }
  const table = selection.$anchorCell.node(-1);
  const map = TableMap.get(table);
  if (cellsOverlapRectangle(map, rect)) {
    return false;
  }

  return true;
}

function isEmptyCell(cell: PMNode) {
  const { content } = cell;
  return (
    content.childCount === 1 &&
    content.firstChild &&
    content.firstChild.isTextblock &&
    content.firstChild.childCount === 0
  );
}

function addColSpan(attrs: CellAttributes, pos: number, span: number = 1) {
  const newAttrs = {
    ...attrs,
    colspan: (attrs.colspan || 1) + span,
  };
  if (newAttrs.colwidth) {
    newAttrs.colwidth = newAttrs.colwidth.slice();
    for (let i = 0; i < span; i++) {
      newAttrs.colwidth.splice(pos, 0, 0);
    }
  }

  return newAttrs;
}

function cellsOverlapRectangle(
  { width, height, map }: TableMap,
  rect: CellRect,
) {
  let indexTop = rect.top * width + rect.left;
  let indexLeft = indexTop;

  let indexBottom = (rect.bottom - 1) * width + rect.left;
  let indexRight = indexTop + (rect.right - rect.left - 1);

  for (let i = rect.top; i < rect.bottom; i++) {
    if (
      (rect.left > 0 && map[indexLeft] === map[indexLeft - 1]) ||
      (rect.right < width && map[indexRight] === map[indexRight + 1])
    ) {
      return true;
    }
    indexLeft += width;
    indexRight += width;
  }
  for (let i = rect.left; i < rect.right; i++) {
    if (
      (rect.top > 0 && map[indexTop] === map[indexTop - width]) ||
      (rect.bottom < height && map[indexBottom] === map[indexBottom + width])
    ) {
      return true;
    }

    indexTop++;
    indexBottom++;
  }

  return false;
}

// returns an array of numbers, each number indicates the minimum colSpan in each column
function getMinColSpans(table: PMNode): number[] {
  const map = TableMap.get(table);
  const minColspans: number[] = [];
  for (let colIndex = map.width - 1; colIndex >= 0; colIndex--) {
    const cellsPositions = map.cellsInRect({
      left: colIndex,
      right: colIndex + 1,
      top: 0,
      bottom: map.height,
    });
    if (cellsPositions.length) {
      const colspans = cellsPositions.map(cellPos => {
        const cell = table.nodeAt(cellPos);
        if (cell) {
          return cell.attrs.colspan;
        }
      });
      const minColspan = Math.min(...colspans);
      // only care about the case when the next column is invisible
      if (!minColspans[colIndex + 1]) {
        minColspans[colIndex] = minColspan;
      } else {
        minColspans[colIndex] = 1;
      }
    }
  }

  return minColspans;
}

export function removeEmptyColumns(table: PMNode): PMNode {
  const map = TableMap.get(table);
  const minColSpans = getMinColSpans(table);
  if (!minColSpans.some(colspan => colspan > 1)) {
    return table;
  }
  const rows: PMNode[] = [];
  for (let rowIndex = 0; rowIndex < map.height; rowIndex++) {
    const cellsByCols: Record<string, PMNode> = {};
    Object.keys(minColSpans)
      .map(Number)
      .forEach(colIndex => {
        const cellPos = map.map[colIndex + rowIndex * map.width];
        const rect = map.findCell(cellPos);
        const cell = cellsByCols[rect.left] || table.nodeAt(cellPos);
        if (cell && rect.top === rowIndex) {
          if (minColSpans[colIndex] > 1) {
            const colspan = cell.attrs.colspan - minColSpans[colIndex] + 1;
            const { colwidth } = cell.attrs;
            const newCell = cell.type.createChecked(
              {
                ...cell.attrs,
                colspan,
                colwidth: colwidth ? colwidth.slice(0, colspan) : null,
              },
              cell.content,
              cell.marks,
            );
            cellsByCols[rect.left] = newCell;
          } else {
            cellsByCols[rect.left] = cell;
          }
        }
      });

    const rowCells: PMNode[] = Object.keys(cellsByCols).map(
      col => cellsByCols[col],
    );
    const row = table.child(rowIndex);
    if (row) {
      rows.push(row.type.createChecked(row.attrs, rowCells, row.marks));
    }
  }

  if (!rows.length) {
    return table;
  }

  return table.type.createChecked(table.attrs, rows, table.marks);
}
