import { Node as PMNode } from 'prosemirror-model';
import ColumnState from './columnState';
export interface ColIdxPair {
    col: ColumnState;
    idx: number;
}
export declare const makeColIdxPair: (cols: ColumnState[]) => {
    col: ColumnState;
    idx: number;
}[];
export declare const findFreeCol: (colIdxObj: ColIdxPair[]) => number | null;
export declare const findNextFreeCol: (colIdxObj: ColIdxPair[], direction: number) => number;
export declare const getRowChildren: (row: HTMLElement) => HTMLElement[];
export declare const calculateColWidth: (cells: HTMLElement[], calculateColWidthCb?: (col: HTMLElement, colComputedStyle: CSSStyleDeclaration, colSpan: number) => number) => number;
export declare const unitToNumber: (unit: string | null) => number;
export declare const addContainerLeftRightPadding: (amount: number, computedStyle: CSSStyleDeclaration) => number;
export declare const getCellsRefsInColumn: (columnIndex: number, table: PMNode<any>, start: number, domAtPos: (pos: number) => {
    node: Node;
    offset: number;
}) => HTMLElement[];
