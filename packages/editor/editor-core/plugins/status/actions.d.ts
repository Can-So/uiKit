import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { StatusType } from './plugin';
export declare const DEFAULT_STATUS: StatusType;
export declare const createStatus: (showStatusPickerAtOffset?: number) => (insert: (node: string | Object | Node) => Transaction<any>, state: EditorState<any>) => Transaction<any>;
export declare const updateStatus: (status?: StatusType | undefined) => (editorView: EditorView<any>) => boolean;
export declare const setStatusPickerAt: (showStatusPickerAt: number | null) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const commitStatusPicker: () => (editorView: EditorView<any>) => void;
