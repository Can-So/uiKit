import { EditorState, Transaction } from 'prosemirror-state';
export declare const selectColumns: (columnIndexes: number[]) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const selectRows: (rowIndexes: number[]) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
