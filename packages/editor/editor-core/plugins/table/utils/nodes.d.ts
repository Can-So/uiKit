import { Node as PmNode } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
export declare const isIsolating: (node: PmNode<any>) => boolean;
export declare const containsHeaderColumn: (state: EditorState<any>, table: PmNode<any>) => boolean;
export declare const containsHeaderRow: (state: EditorState<any>, table: PmNode<any>) => boolean;
export declare function filterNearSelection<T, U>(state: EditorState, findNode: (selection: Selection) => {
    pos: number;
    node: PmNode;
} | undefined, predicate: (state: EditorState, node: PmNode, pos?: number) => T, defaultValue: U): T | U;
export declare const checkIfHeaderColumnEnabled: (state: EditorState<any>) => boolean;
export declare const checkIfHeaderRowEnabled: (state: EditorState<any>) => boolean;
export declare const checkIfNumberColumnEnabled: (state: EditorState<any>) => boolean;
export declare const isLayoutSupported: (state: EditorState<any>) => boolean;
export declare const getTableWidths: (node: PmNode<any>) => number[];
export declare const getTableWidth: (node: PmNode<any>) => number;
export declare const tablesHaveDifferentColumnWidths: (currentTable: PmNode<any>, previousTable: PmNode<any>) => boolean;
