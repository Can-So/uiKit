import { EditorState } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { CollabEditOptions } from './types';
export interface Color {
    solid: string;
    selection: string;
}
export declare const colors: Color[];
export declare const getAvatarColor: (str: string) => {
    index: number;
    color: Color;
};
export declare const findPointers: (id: string, decorations: DecorationSet<any>) => Decoration[];
export declare const createTelepointers: (from: number, to: number, sessionId: string, isSelection: boolean, initial: string) => Decoration[];
export declare const replaceDocument: (doc: any, state: EditorState<any>, version?: number | undefined, options?: CollabEditOptions | undefined) => import("prosemirror-state").Transaction<any>;
