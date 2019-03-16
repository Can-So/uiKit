import { EditorState } from 'prosemirror-state';
import { Schema, Node } from 'prosemirror-model';
export declare const isMediaSelected: (state: EditorState<any>) => boolean;
export declare const canInsertMedia: (state: EditorState<any>) => boolean;
export declare const createExternalMediaNode: (url: string, schema: Schema<any, any>) => Node<any> | null;
