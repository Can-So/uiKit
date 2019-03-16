import { Transaction } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export declare const fireAnalytics: (properties?: {}) => Promise<Response>;
export declare const removeExtraneousColumnWidths: (node: PMNode<any>, basePos: number, tr: Transaction<any>) => Transaction<any>;
export declare const fixTables: (tr: Transaction<any>) => Transaction<any>;
export declare const fixAutoSizedTable: (view: EditorView<any>, tableNode: PMNode<any>, tableRef: HTMLTableElement, tablePos: number, opts: {
    dynamicTextSizing: boolean;
    containerWidth: number;
}) => Transaction<any>;
