import ColumnState from './columnState';
import { ColIdxPair } from './utils';
export declare enum ColType {
    SOURCE = "src",
    DEST = "dest"
}
export declare function amountFor(colType: ColType): (amount: number) => number;
export declare function widthFor(colType: ColType): (amount: number, srcCol: ColumnState, destCol: ColumnState) => number;
export declare function moveSpaceFrom(state: ResizeState, srcIdx: number, destIdx: number, amount: number, useFreeSpace?: boolean): {
    state: ResizeState;
    amount: number;
};
export declare function getCandidates(state: ResizeState, destIdx: number, amount: number): {
    col: ColumnState;
    idx: number;
}[];
export declare function stackSpace(state: ResizeState, destIdx: number, amount: number): {
    state: ResizeState;
    remaining: number;
};
export declare function reduceSpace(state: ResizeState, amount: number, ignoreCols?: number[]): ResizeState;
export default class ResizeState {
    cols: ColumnState[];
    maxSize: number;
    breakout: boolean;
    freeColFunc: (colIdxObj: Array<ColIdxPair>, direction: number) => number;
    constructor(cols: ColumnState[], maxSize: number, breakout?: boolean, freeColFunc?: (colIdxObj: Array<ColIdxPair>, direction: number) => number);
    readonly totalWidth: number;
    grow(colIdx: number, amount: number): ResizeState;
    shrink(colIdx: number, amount: number): ResizeState;
    resize(colIdx: number, amount: number): ResizeState;
    scale(newWidth: number): ResizeState;
    clone(): ResizeState;
}
