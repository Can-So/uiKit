import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { ResolvedPos, MarkType } from 'prosemirror-model';
import { Command } from '../types';
declare type Predicate = (state: EditorState, view?: EditorView) => boolean;
declare const filter: (predicates: Predicate | Predicate[], cmd: Command) => Command;
declare const isEmptySelectionAtStart: (state: EditorState<any>, view?: EditorView<any> | undefined) => boolean;
declare const isFirstChildOfParent: (state: EditorState<any>, view?: EditorView<any> | undefined) => boolean;
/**
 * Creates a filter that checks if the node at a given number of parents above the current
 * selection is of the correct node type.
 * @param nodeType The node type to compare the nth parent against
 * @param depthAway How many levels above the current node to check against. 0 refers to
 * the current selection's parent, which will be the containing node when the selection
 * is usually inside the text content.
 */
declare const isNthParentOfType: (nodeType: string, depthAway: number) => (state: EditorState<any>, view?: EditorView<any> | undefined) => boolean;
declare function findCutBefore($pos: ResolvedPos): ResolvedPos | null;
/**
 * A wrapper over the default toggleMark, except when we have a selection
 * we only toggle marks on text nodes rather than inline nodes.
 * @param markType
 * @param attrs
 */
declare const toggleMark: (markType: MarkType<any>, attrs?: {
    [key: string]: any;
} | undefined) => Command;
export { Predicate, filter, isEmptySelectionAtStart, isFirstChildOfParent, isNthParentOfType, findCutBefore, toggleMark, };
