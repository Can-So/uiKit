import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { RefsNode, Refs } from './schema-builder';
/**
 * Replace the given range, or the selection if no range is given, with a text node containing the given string
 */
export declare function insertText(view: EditorView, text: string, from: number, to?: number): void;
export declare type BuilderContent = (schema: Schema) => RefsNode | RefsNode[];
/**
 * Replace the current selection with the given content, which may be a fragment, node, or array of nodes.
 *
 * @returns refs from the inserted nodes, made relative to the document
 *   insertion position
 */
export declare function insert(view: EditorView, content: Array<string> | BuilderContent): Refs;
