import { Selection, Transaction } from 'prosemirror-state';
import { StatusType } from './plugin';
export declare const mayGetStatusNodeAt: (selection: Selection<any>) => StatusType | null;
export declare const isEmptyStatus: (node: StatusType) => boolean;
export declare const setSelectionNearPos: (tr: Transaction<any>, pos: number) => Transaction<any>;
export declare const setNodeSelectionNearPos: (tr: Transaction<any>, pos: number) => Transaction<any>;
