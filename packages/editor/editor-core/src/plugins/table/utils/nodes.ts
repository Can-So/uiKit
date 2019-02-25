import { Node as PmNode } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import { findTable, hasParentNodeOfType } from 'prosemirror-utils';
import { pluginKey } from '../pm-plugins/main';

export const isIsolating = (node: PmNode): boolean => {
  return !!node.type.spec.isolating;
};

export const containsHeaderColumn = (
  state: EditorState,
  table: PmNode,
): boolean => {
  const map = TableMap.get(table);
  // Get cell positions for first column.
  const cellPositions = map.cellsInRect({
    left: 0,
    top: 0,
    right: 1,
    bottom: map.height,
  });

  for (let i = 0; i < cellPositions.length; i++) {
    try {
      const cell = table.nodeAt(cellPositions[i]);
      if (cell && cell.type !== state.schema.nodes.tableHeader) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return true;
};

export const containsHeaderRow = (
  state: EditorState,
  table: PmNode,
): boolean => {
  const map = TableMap.get(table);
  for (let i = 0; i < map.width; i++) {
    const cell = table.nodeAt(map.map[i]);
    if (cell && cell.type !== state.schema.nodes.tableHeader) {
      return false;
    }
  }
  return true;
};

export function filterNearSelection<T, U>(
  state: EditorState,
  findNode: (selection: Selection) => { pos: number; node: PmNode } | undefined,
  predicate: (state: EditorState, node: PmNode, pos?: number) => T,
  defaultValue: U,
): T | U {
  const found = findNode(state.selection);
  if (!found) {
    return defaultValue;
  }

  return predicate(state, found.node, found.pos);
}

export const checkIfHeaderColumnEnabled = (state: EditorState): boolean =>
  filterNearSelection(state, findTable, containsHeaderColumn, false);

export const checkIfHeaderRowEnabled = (state: EditorState): boolean =>
  filterNearSelection(state, findTable, containsHeaderRow, false);

export const checkIfNumberColumnEnabled = (state: EditorState): boolean =>
  filterNearSelection(
    state,
    findTable,
    (_, table) => !!table.attrs.isNumberColumnEnabled,
    false,
  );

export const isLayoutSupported = (state: EditorState): boolean => {
  const { permittedLayouts } = pluginKey.getState(state).pluginConfig;
  const { bodiedExtension, layoutSection } = state.schema.nodes;

  return (
    !hasParentNodeOfType([layoutSection, bodiedExtension])(state.selection) &&
    permittedLayouts &&
    (permittedLayouts === 'all' ||
      (permittedLayouts.indexOf('default') > -1 &&
        permittedLayouts.indexOf('wide') > -1 &&
        permittedLayouts.indexOf('full-page') > -1))
  );
};

export const getTableWidths = (node: PmNode) => {
  if (!node.content.firstChild) {
    return [];
  }

  let tableWidths: Array<number> = [];
  node.content.firstChild.content.forEach(cell => {
    if (Array.isArray(cell.attrs.colwidth)) {
      const colspan = cell.attrs.colspan || 1;
      tableWidths.push(...cell.attrs.colwidth.slice(0, colspan));
    }
  });

  return tableWidths;
};

export const getTableWidth = (node: PmNode) => {
  return getTableWidths(node).reduce((acc, current) => acc + current, 0);
};

export const tablesHaveDifferentColumnWidths = (
  currentTable: PmNode,
  previousTable: PmNode,
): boolean => {
  let currentTableWidths = getTableWidths(currentTable);
  let previousTableWidths = getTableWidths(previousTable);

  const sameWidths = currentTableWidths.every(
    (value: number, index: number) => {
      return value === previousTableWidths[index];
    },
  );

  return sameWidths === false;
};
