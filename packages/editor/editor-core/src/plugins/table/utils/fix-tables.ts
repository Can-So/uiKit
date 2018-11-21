import { Transaction } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { getCellsInRow } from 'prosemirror-utils';

const fixTable = (
  table: PMNode,
  tablePos: number,
  tr: Transaction,
): Transaction => {
  let rowPos = tablePos + 1;
  for (let i = 0; i < table.childCount; i++) {
    const row = table.child(i);
    if (!row.childCount) {
      rowPos = tr.mapping.map(rowPos);
      tr.delete(rowPos, rowPos + row.nodeSize);

      // decrement rowspans @see ED-5802
      for (let j = i - 1; j >= 0; j--) {
        const cells = getCellsInRow(j)(tr.selection);
        if (cells) {
          cells.forEach(cell => {
            const { rowspan } = cell.node.attrs;
            if (rowspan + j - 1 >= i) {
              tr.setNodeMarkup(cell.pos, cell.node.type, {
                ...cell.node.attrs,
                rowspan: rowspan - 1,
              });
            }
          });
        }
      }
    }
    rowPos += row.nodeSize;
  }
  return tr;
};

export const fixTables = (tr: Transaction): Transaction => {
  tr.doc.descendants((node, pos) => {
    if (node.type.name === 'table') {
      tr = fixTable(node, pos, tr);
    }
  });
  return tr;
};
