import { EditorState, Transaction } from 'prosemirror-state';
export declare const showPlaceholderFloatingToolbar: (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const insertPlaceholderTextAtSelection: (value: string) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const hidePlaceholderFloatingToolbar: (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
