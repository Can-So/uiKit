import { Node as PMNode, Schema } from 'prosemirror-model';
export declare function createEmptyParagraphNode(schema: Schema): PMNode;
/**
 * Create paragraphs from inline nodes. Two and more
 * hardbreaks will start a new paragraph
 */
export declare function createParagraphNodeFromInlineNodes(inlineNodes: PMNode[], schema: Schema): PMNode[];
