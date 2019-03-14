import { Node as PMNode } from 'prosemirror-model';
import { contentWidth } from './contentWidth';
import {
  calculateColWidth,
  unitToNumber,
  addContainerLeftRightPadding,
  getCellsRefsInColumn,
} from './utils';

import { tableNewColumnMinWidth } from '@atlaskit/editor-common';

export default class ColumnState {
  constructor(public width: number, public minWidth: number = 0) {
    return Object.freeze(this);
  }

  get freeSpace() {
    const { minWidth, width } = this;
    return Math.max(width - minWidth, 0);
  }

  /**
   * Creates a new ResizeState based on the current
   * appearance of an element.
   * @param {Function} domAtPos Find the DOM node that corresponds to the given position
   * @param {PMNode} table ProseMirror node
   * @param {number} colIdx The column index
   * @param {number} minWidth Minimum width a column is permitted to be
   */
  static fromDOM(
    domAtPos: (pos: number) => { node: Node; offset: number },
    table: PMNode,
    start: number,
    colIdx: number,
    minWidth: number,
  ): ColumnState {
    const cells = getCellsRefsInColumn(colIdx, table, start, domAtPos);
    const width = calculateColWidth(cells);

    const minColWidth = calculateColWidth(
      cells,
      (col, computedStyle, colspan) => {
        if (colspan && colspan > 1) {
          return unitToNumber(computedStyle.width);
        }

        const { minWidth: minContentWidth } = contentWidth(col, col);

        // for newly created column (where width < minWidth) we set minWidth = 140px
        const minCellWidth =
          width < minWidth ? tableNewColumnMinWidth : minWidth;
        // Override the min width, if there is content that can't collapse
        // Past a certain width.
        return Math.max(
          addContainerLeftRightPadding(minContentWidth, computedStyle),
          minContentWidth,
          minCellWidth,
        );
      },
    );

    return new ColumnState(width, minColWidth);
  }

  clone(newWidth?: number): ColumnState {
    const { minWidth, width } = this;
    return new ColumnState(newWidth ? newWidth : width, minWidth);
  }
}
