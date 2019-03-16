import { Node as PMNode, ResolvedPos } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { MediaState } from '../types';
export declare const posOfMediaGroupNearby: (state: EditorState<any>) => number | undefined;
export declare const isSelectionNonMediaBlockNode: (state: EditorState<any>) => boolean;
export declare const posOfPrecedingMediaGroup: (state: EditorState<any>) => number | undefined;
/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
export declare const isInsidePotentialEmptyParagraph: (state: EditorState<any>) => boolean;
export declare const posOfMediaGroupBelow: (state: EditorState<any>, $pos: ResolvedPos<any>, prepend?: boolean) => number | undefined;
export declare const posOfParentMediaGroup: (state: EditorState<any>, $pos?: ResolvedPos<any> | undefined, prepend?: boolean) => number | undefined;
/**
 * The function will return the position after current selection where mediaGroup can be inserted.
 */
export declare function endPositionForMedia(state: EditorState, resolvedPos: ResolvedPos): number;
export declare const removeMediaNode: (view: EditorView<any>, node: PMNode<any>, getPos: ProsemirrorGetPosHandler) => void;
export declare const splitMediaGroup: (view: EditorView<any>) => boolean;
export declare const copyOptionalAttrsFromMediaState: (mediaState: MediaState, node: PMNode<any>) => void;
