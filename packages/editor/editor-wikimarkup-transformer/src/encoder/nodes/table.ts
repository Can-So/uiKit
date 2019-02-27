import { Node as PMNode } from 'prosemirror-model';
import { encode, NodeEncoder } from '..';
import { unknown } from './unknown';

export const table: NodeEncoder = (node: PMNode): string => {
  try {
    const result: string[] = [];
    node.forEach(n => {
      result.push(tableRow(n));
    });

    return result.join('\n');
  } catch (err) {
    return unknown(node);
  }
};

const tableRow: NodeEncoder = (node: PMNode): string => {
  const result: string[] = [];
  let separator: string = '|';
  node.forEach(n => {
    if (n.type.name === 'tableHeader') {
      separator = '||';
    }
    result.push(tableCell(n));
  });

  return `${separator}${result.join(`${separator}`)}${separator}`;
};

const tableCell: NodeEncoder = (node: PMNode): string => {
  if (isAdvancedTableCell(node)) {
    // This is an advanced table
    throw new Error('Advanced feature of table is not supported');
  }
  const result: string[] = [];
  node.forEach(n => {
    result.push(encode(n));
  });

  return result.join('\n');
};

const isAdvancedTableCell = (node: PMNode): boolean => {
  if (!node.attrs) {
    return false;
  }

  if (node.attrs.colspan && node.attrs.colspan !== 1) {
    return true;
  }

  if (node.attrs.rowspan && node.attrs.rowspan !== 1) {
    return true;
  }

  if (node.attrs.colwidth) {
    return true;
  }

  if (node.attrs.background) {
    return true;
  }

  return false;
};
