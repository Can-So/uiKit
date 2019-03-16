import { Fragment, Mark, Node as PMNode, Schema, NodeType } from 'prosemirror-model';
/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
export declare function ensureBlocks(fragment: Fragment, schema: Schema, nodeType?: NodeType): Fragment;
/**
 * This function will convert all content to inline nodes
 */
export declare const ensureInline: (schema: Schema<any, any>, content: Fragment<any>, supportedMarks: Mark<any>[]) => Fragment<any>;
export declare function convert(content: Fragment, node: Node, schema: Schema): Fragment | PMNode | null | undefined;
export declare function bfsOrder(root: Node): Node[];
