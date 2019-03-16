import { Transaction, Selection } from 'prosemirror-state';
export declare const isSelectionUpdated: (oldSelection: Selection<any>, newSelection?: Selection<any> | undefined) => boolean;
export declare const normalizeSelection: (tr: Transaction<any>) => Transaction<any>;
