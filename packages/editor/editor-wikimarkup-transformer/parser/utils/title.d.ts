import { Node as PMNode, Schema } from 'prosemirror-model';
/**
 * This will return ADF to replace the titles in some macro
 * For example
 * {panel:title}aaa{panel}
 */
export declare function title(text: string, schema: Schema): PMNode;
