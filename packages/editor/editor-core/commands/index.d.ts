import { Node as PMNode, NodeType, MarkType, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Command } from '../types';
import { EditorView } from 'prosemirror-view';
export declare function preventDefault(): Command;
export declare function insertNewLine(): Command;
export declare const insertNewLineWithAnalytics: Command;
export declare function insertRule(): Command;
export declare const createNewParagraphAbove: Command;
export declare const createNewParagraphBelow: Command;
export declare function createParagraphNear(append?: boolean): Command;
export declare function createParagraphAtEnd(): Command;
export interface Command {
    (state: EditorState, dispatch: (tr: Transaction) => void, view?: EditorView): boolean;
}
export declare const changeImageAlignment: (align?: "center" | "end" | "start" | undefined) => Command;
/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror's `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
export declare const toggleBlockMark: <T = object>(markType: MarkType<any>, getAttrs: (prevAttrs?: T | undefined, node?: PMNode<any> | undefined) => false | T | undefined, allowedBlocks?: NodeType<any>[] | ((schema: Schema<any, any>, node: PMNode<any>, parent: PMNode<any>) => boolean) | undefined) => Command;
