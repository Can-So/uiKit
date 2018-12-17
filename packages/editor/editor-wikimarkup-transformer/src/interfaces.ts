import { Node as PMNode } from 'prosemirror-model';

export interface AddArgs {
  style: string | null;
  content: PMNode[];
}

export interface Builder {
  type: string;

  /**
   * Add a item to the builder
   * @param {AddCellArgs[]} items
   */
  add(items: AddArgs[]): void;

  /**
   * Compile a prosemirror node from the root list
   * @returns {PMNode}
   */
  buildPMNode(): PMNode;
}

export interface ListItem {
  content?: any[];
  parent: List;
  children: List[];
}

export interface List {
  children: ListItem[];
  type: ListType;
  parent?: ListItem;
}

export type ListType = 'bulletList' | 'orderedList';

export type CellType = 'tableHeader' | 'tableCell';

export interface TableCell {
  type: CellType;
  content: PMNode[];
}

export interface TableRow {
  cells: TableCell[];
}

export interface Table {
  rows: TableRow[];
}

export interface AddCellArgs extends AddArgs {
  style: string;
  content: PMNode[];
}
