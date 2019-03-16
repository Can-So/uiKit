import { ResolvedPos, NodeType, Node } from 'prosemirror-model';
import { EditorState, Transaction, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Command } from '../../types';
import { INPUT_METHOD } from '../analytics';
export declare const enterKeyCommand: Command;
export declare const backspaceKeyCommand: (p1: EditorState<any>, p2?: ((tr: Transaction<any>) => void) | undefined, p3?: EditorView<any> | undefined) => boolean;
export declare function outdentList(): Command;
export declare function indentList(): Command;
export declare function liftListItems(): Command;
/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it's possible for a selection to start or end at an empty node at the very end of
 * a line. This isn't obvious by looking at the editor and it's likely not what the
 * user intended - so we need to adjust the selection a bit in scenarios like that.
 */
export declare function adjustSelectionInList(doc: Node, selection: TextSelection): TextSelection;
export declare const rootListDepth: (pos: ResolvedPos<any>, nodes: Record<string, NodeType<any>>) => number | undefined;
export declare const numberNestedLists: (resolvedPos: ResolvedPos<any>, nodes: Record<string, NodeType<any>>) => number;
export declare const toggleList: (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void, view: EditorView<any>, listType: "bulletList" | "orderedList") => boolean;
export declare function toggleListCommand(listType: 'bulletList' | 'orderedList'): Command;
export declare const toggleListCommandWithAnalytics: (inputMethod: INPUT_METHOD.KEYBOARD, listType: "bulletList" | "orderedList") => Command;
export declare function toggleBulletList(view: EditorView): boolean;
export declare function toggleOrderedList(view: EditorView): boolean;
export declare function wrapInList(nodeType: NodeType): Command;
