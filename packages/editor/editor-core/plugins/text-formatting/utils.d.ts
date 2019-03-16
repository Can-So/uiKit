import { EditorState } from 'prosemirror-state';
import { Mark as PMMark, MarkType } from 'prosemirror-model';
export declare const nodeLen: (node: Node) => number;
export declare const isIgnorable: (dom: any) => boolean;
export declare const isBlockNode: (dom: any) => boolean;
export declare const domIndex: (node: Node | null) => number | undefined;
export declare const deepEqual: (obj1: any, obj2: any) => boolean;
export declare const hasCode: (state: EditorState<any>, pos: number) => boolean;
/**
 * Determine if a mark (with specific attribute values) exists anywhere in the selection.
 */
export declare const markActive: (state: EditorState<any>, mark: PMMark<any>) => boolean;
/**
 * Determine if a mark of a specific type exists anywhere in the selection.
 */
export declare const anyMarkActive: (state: EditorState<any>, markType: MarkType<any>) => boolean;
export declare const checkFormattingIsPresent: (state: EditorState<any>) => boolean;
