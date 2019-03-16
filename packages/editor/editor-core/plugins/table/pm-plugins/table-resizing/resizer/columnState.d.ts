import { Node as PMNode } from 'prosemirror-model';
export default class ColumnState {
    width: number;
    minWidth: number;
    constructor(width: number, minWidth?: number);
    readonly freeSpace: number;
    /**
     * Creates a new ResizeState based on the current
     * appearance of an element.
     * @param {Function} domAtPos Find the DOM node that corresponds to the given position
     * @param {PMNode} table ProseMirror node
     * @param {number} colIdx The column index
     * @param {number} minWidth Minimum width a column is permitted to be
     */
    static fromDOM(domAtPos: (pos: number) => {
        node: Node;
        offset: number;
    }, table: PMNode, start: number, colIdx: number, minWidth: number): ColumnState;
    clone(newWidth?: number): ColumnState;
}
