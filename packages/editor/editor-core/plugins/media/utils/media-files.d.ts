import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MediaState } from '../types';
export interface Range {
    start: number;
    end: number;
}
/**
 * Insert a media into an existing media group
 * or create a new media group to insert the new media.
 * @param view Editor view
 * @param mediaStates Media files to be added to the editor
 * @param collection Collection for the media to be added
 */
export declare const insertMediaGroupNode: (view: EditorView<any>, mediaStates: MediaState[], collection: string) => void;
/**
 * Return position of media to be inserted, if it is inside a list
 * @param content Content to be inserted
 * @param state Editor State
 */
export declare const getPosInList: (state: EditorState<any>) => number | undefined;
