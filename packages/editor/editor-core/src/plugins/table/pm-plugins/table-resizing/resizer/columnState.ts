import { contentWidth } from './contentWidth';
import {
  calculateColWidth,
  unitToNumber,
  addContainerLeftRightPadding,
} from './utils';

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
   * @param {HTMLElement} table Reference to the <table> node
   * @param {number} colIdx The column index
   * @param {number} minWidth Minimum width a column is permitted to be
   */
  static fromDOM(
    table: HTMLElement,
    colIdx: number,
    minWidth: number,
  ): ColumnState {
    const width = calculateColWidth(table, colIdx);

    const minColWidth =
      calculateColWidth(table, colIdx, (col, computedStyle, colspan) => {
        if (colspan && colspan > 1) {
          return unitToNumber(computedStyle.width);
        }

        const { minWidth } = contentWidth(col, col);

        // Override the min width, if their is content that can't collapse
        // Past a certain width.
        return Math.max(
          addContainerLeftRightPadding(minWidth, computedStyle),
          minColWidth,
        );
      }) || minWidth;

    return new ColumnState(width, minColWidth);
  }

  clone(newWidth?: number): ColumnState {
    const { minWidth, width } = this;
    return new ColumnState(newWidth ? newWidth : width, minWidth);
  }
}
