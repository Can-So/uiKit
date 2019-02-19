import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import ResizeState from './resizeState';
import ColumnState from './columnState';

import { insertColgroupFromNode } from '../../../utils';
export interface ResizerConfig {
  minWidth: number;
  maxSize: number;
  node: PMNode;
  start: number;
}

export default class Resizer {
  minWidth: number;
  node: PMNode;
  currentState: ResizeState;

  private constructor(
    public tableElem: HTMLTableElement,
    public colgroupChildren: HTMLCollection,
    config: ResizerConfig,
    initialState: ResizeState,
  ) {
    this.minWidth = config.minWidth;
    this.node = config.node;
    this.currentState = initialState;
  }

  /**
   * Create resizer from given DOM element
   */
  static fromDOM(
    view: EditorView,
    tableElem: HTMLTableElement,
    config: ResizerConfig,
  ): Resizer {
    const { maxSize, minWidth, node, start } = config;
    const domAtPos = view.domAtPos.bind(view);
    const colgroupChildren = insertColgroupFromNode(tableElem, node);

    return new Resizer(
      tableElem,
      colgroupChildren,
      config,
      // update state from DOM
      new ResizeState(
        Array.from(colgroupChildren).map((col, i) => {
          return ColumnState.fromDOM(domAtPos, node, start, i, minWidth);
        }),
        maxSize,
      ),
    );
  }

  /**
   * Applies a resize state to the DOM. Does NOT update state.
   */
  apply(state: ResizeState) {
    state.cols
      .filter(col => !!col.width) // if width is 0, we dont want to apply that.
      .forEach((col, i) => {
        (this.colgroupChildren[i] as HTMLElement).style.width = `${
          col.width
        }px`;
      });
  }

  /**
   * Applies the column resize state to the DOM, and sets it for future use.
   */
  update(state: ResizeState) {
    this.apply(state);
    this.currentState = state;
  }

  /**
   * Resize a given column by an amount from the current state and return the new state.
   *
   * You can then either:
   * - #apply() this new state to the DOM while dragging resize handles,
   * - or #update() the resizer state when resizing is finished (typically when the user releases the resize handle)
   * @param {number} col The column index to resize
   * @param {number} amount Delta of pixels to resize by. Can be positive or negative.
   */
  resize(col: number, amount: number): ResizeState {
    return this.currentState.resize(col, amount);
  }

  /**
   * Scale the table to a given size, update state and DOM and return the new state.
   * @param {number} newSize the table new size
   */
  scale(newSize: number): ResizeState {
    const newState = this.currentState.scale(newSize);
    this.update(newState);
    return newState;
  }

  getCol(colIdx: number) {
    return this.currentState.cols[colIdx];
  }
}
