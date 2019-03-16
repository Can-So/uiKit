import { Selection } from 'prosemirror-state';
export interface RowParams {
    startIndex: number;
    endIndex: number;
    height: number;
}
export declare const getRowHeights: (tableRef: HTMLTableElement) => number[];
export declare const isRowInsertButtonVisible: (index: number, selection: Selection<any>) => boolean;
export declare const isRowDeleteButtonVisible: (selection: Selection<any>) => boolean;
export declare const getRowDeleteButtonParams: (rowsHeights: (number | undefined)[], selection: Selection<any>) => {
    top: number;
    indexes: number[];
} | null;
export declare const getRowsParams: (rowsHeights: (number | undefined)[]) => RowParams[];
export declare const getRowClassNames: (index: number, selection: Selection<any>, hoveredRows?: number[], isInDanger?: boolean | undefined, isResizing?: boolean | undefined) => string;
