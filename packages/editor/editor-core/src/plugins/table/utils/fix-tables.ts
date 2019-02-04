import { Transaction } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { sendLogs } from '../../../utils/sendLogs';
import { parseDOMColumnWidths } from '../utils';

const fixTable = (
  table: PMNode,
  tablePos: number,
  tr: Transaction,
): Transaction => {
  const rows: PMNode[] = [];
  let hasProblems = false;

  // detect if table has empty rows that we need to remove
  for (let i = 0; i < table.childCount; i++) {
    if (!table.child(i).childCount) {
      hasProblems = true;
      break;
    }
  }

  if (!hasProblems) {
    return tr;
  }

  for (let rowIndex = 0; rowIndex < table.childCount; rowIndex++) {
    const row = table.child(rowIndex);
    if (row.childCount) {
      rows.push(row);
    } else {
      for (let j = rows.length - 1; j >= 0; j--) {
        const cells: PMNode[] = [];
        const rowToFix = rows[j];

        for (let colIndex = 0; colIndex < rowToFix.childCount; colIndex++) {
          const cell = rowToFix.child(colIndex);
          const { rowspan } = cell.attrs;
          if (rowspan + j - 1 >= rows.length) {
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
        // re-create the row with decremented rowspans @see ED-5802
        if (cells.length) {
          rows[j] = row.type.createChecked(row.attrs, cells, row.marks);
        }
      }
    }
  }

  // remove the table if it's not fixable
  if (!rows.length) {
    // ED-6141: send analytics event
    sendLogs({
      events: [
        {
          name: 'atlaskit.fabric.editor.fixtable',
          product: 'atlaskit',
          properties: {
            message: 'Delete table with empty rows',
          },
          serverTime: new Date().getTime(),
          server: 'local',
          user: '-',
        },
      ],
    });
    return tr.delete(tablePos, tablePos + table.nodeSize);
  }

  const newTable = table.type.createChecked(table.attrs, rows, table.marks);
  return tr.replaceWith(tablePos, tablePos + table.nodeSize, newTable);
};

// We attempt to patch the document when we have extra, unneeded, column widths
// Take this node for example:
//
//    ['td', { colwidth: [100, 100, 100], colspan: 2 }]
//
// This row only spans two columns, yet it contains widths for 3.
// We remove the third width here, assumed duplicate content.
export const removeExtraneousColumnWidths = (node, basePos, tr) => {
  return replaceCells(tr, node, basePos, cell => {
    const { colwidth, colspan } = cell.attrs;

    if (colwidth && colwidth.length > colspan) {
      return cell.type.createChecked(
        {
          ...cell.attrs,
          colwidth: colwidth.slice(0, colspan),
        },
        cell.content,
        cell.marks,
      );
    }

    return cell;
  });
};

export const fixTables = (tr: Transaction): Transaction => {
  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'table') {
      tr = fixTable(node, pos, tr);
      tr = removeExtraneousColumnWidths(node, pos, tr);
    }
  });
  return tr;
};

// When we get a table with an 'auto' attribute, we want to:
// 1. render with table-layout: auto
// 2. capture the column widths
// 3. set the column widths as attributes, and remove the 'auto' attribute,
//    so the table renders the same, but is now fixed-width
//
// This can be used to migrate table appearances from other sources that are
// usually rendered with 'auto'.
//
// We use this when migrating TinyMCE tables for Confluence, for example:
// https://pug.jira-dev.com/wiki/spaces/AEC/pages/3362882215/How+do+we+map+TinyMCE+tables+to+Fabric+tables
export const fixAutoSizedTable = (
  tr: Transaction,
  node: PMNode,
  table: HTMLTableElement,
  basePos: number,
) => {
  const colWidths = parseDOMColumnWidths(table);

  node.forEach((rowNode, rowOffset, i) => {
    rowNode.forEach((colNode, colOffset, j) => {
      const pos = rowOffset + colOffset + basePos + 2;

      tr.setNodeMarkup(pos, undefined, {
        ...colNode.attrs,
        colwidth: colWidths.width(j, colNode.attrs.colspan).map(Math.round),
      });
    });
  });

  // clear autosizing on the table node
  return tr
    .setNodeMarkup(basePos, undefined, {
      ...node.attrs,
      __autoSize: false,
    })
    .setMeta('addToHistory', false);
};

// TODO: move to prosemirror-utils
const replaceCells = (tr, table, tablePos, modifyCell) => {
  const rows: PMNode[] = [];
  let modifiedCells = 0;
  for (let rowIndex = 0; rowIndex < table.childCount; rowIndex++) {
    const row = table.child(rowIndex);
    const cells: PMNode[] = [];

    for (let colIndex = 0; colIndex < row.childCount; colIndex++) {
      const cell = row.child(colIndex);

      // FIXME
      // The rowIndex and colIndex are not accurate in a merged cell scenario
      // e.g. table with 5 columns might have only one cell in a row, colIndex will be 1, where it should be 4
      const node = modifyCell(cell, rowIndex, colIndex);
      if (node.sameMarkup(cell) === false) {
        modifiedCells++;
      }
      cells.push(node);
    }

    if (cells.length) {
      rows.push(row.type.createChecked(row.attrs, cells, row.marks));
    }
  }

  // Check if the table has changed before replacing.
  // If no cells are modified our counter will be zero.
  if (rows.length && modifiedCells !== 0) {
    const newTable = table.type.createChecked(table.attrs, rows, table.marks);
    return tr.replaceWith(tablePos, tablePos + table.nodeSize, newTable);
  }

  return tr;
};
