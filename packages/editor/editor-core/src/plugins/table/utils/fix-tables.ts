import { Transaction } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';

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
