import { Transaction } from 'prosemirror-state';
export declare const deleteRows: (rowsToDelete?: number[], isHeaderRowRequired?: boolean) => (tr: Transaction<any>) => Transaction<any>;
