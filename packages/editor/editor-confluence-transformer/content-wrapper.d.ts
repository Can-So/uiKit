import { Fragment, Node as PMNode, Mark, Schema } from 'prosemirror-model';
export declare const docContentWrapper: (schema: Schema<any, any>, content: Fragment<any>, convertedNodesReverted: WeakMap<Fragment<any> | PMNode<any>, Node>) => Fragment<any>;
/**
 * @param content
 * @param convertedNodesReverted
 * Bullet List and Ordered List can only accept listItems
 */
export declare const listContentWrapper: (schema: Schema<any, any>, content: Fragment<any>, convertedNodesReverted: WeakMap<Fragment<any> | PMNode<any>, Node>) => Fragment<any>;
/**
 * @param content
 * @param convertedNodesReverted
 * ListItem content schema 'paragraph (paragraph | bulletList | orderedList)*'
 */
export declare const listItemContentWrapper: (schema: Schema<any, any>, content: Fragment<any>, convertedNodesReverted: WeakMap<Fragment<any> | PMNode<any>, Node>) => Fragment<any>;
/**
 * @param content
 * @param convertedNodesReverted
 * blockquote schema supports one or more number of paragraph nodes
 */
export declare const blockquoteContentWrapper: (schema: Schema<any, any>, content: Fragment<any>, convertedNodesReverted: WeakMap<Fragment<any> | PMNode<any>, Node>) => Fragment<any>;
/**
 * @param content
 * @param convertedNodesReverted
 * This function will convert all content to inline nodes
 */
export declare const ensureInline: (schema: Schema<any, any>, content: Fragment<any>, convertedNodesReverted: WeakMap<Fragment<any> | PMNode<any>, Node>, supportedMarks?: Mark<any>[] | undefined) => Fragment<any>;
/**
 * Ensure that each node in the fragment is valid block, wrapping
 * in a block node if necessary. You pass in a
 * validContent to skip some of the content type
 * Optionaly, you can decide to how to convert invalid node
 */
export declare function ensureBlock(schema: Schema, content: Fragment, convertedNodesReverted: WeakMap<Fragment | PMNode, Node>, validContent: (node: PMNode) => boolean, convertInvalid?: (node: PMNode) => PMNode): Fragment;
