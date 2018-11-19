import { contentWidth } from './contentWidth';
import {
  calculateColWidth,
  unitToNumber,
  addContainerLeftRightPadding,
} from './utils';

export default class ColumnState {
  constructor(
    public width: number,
    public wrapWidth: number,
    public minWidth: number = 0,
  ) {
    return Object.freeze(this);
  }

  get freeSpace() {
    const { minWidth, width, wrapWidth } = this;
    return Math.max(width - Math.max(wrapWidth, minWidth), 0);
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
    let minColWidth = minWidth;
    const width = calculateColWidth(table, colIdx);

    const wrapWidth = calculateColWidth(table, colIdx, (col, computedStyle) => {
      const borderWidth = computedStyle
        .borderWidth!.split(' ')
        .reduce((acc, current) => (acc += unitToNumber(current)), 0);

      const { width, minWidth } = contentWidth(col, col);

      // Override the min width, if their is content that can't collapse
      // Past a certain width.
      minColWidth = Math.max(
        addContainerLeftRightPadding(minWidth, computedStyle),
        minColWidth,
      );

      return addContainerLeftRightPadding(width + borderWidth, computedStyle);
    });

    return new ColumnState(width, wrapWidth, minColWidth);
  }

  clone(newWidth?: number): ColumnState {
    const { minWidth, width, wrapWidth } = this;
    return new ColumnState(newWidth ? newWidth : width, wrapWidth, minWidth);
  }
}
