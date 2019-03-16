import { Schema, Node as PMNode } from 'prosemirror-model';
export declare const fromHTML: (html: string, schema: Schema<any, any>) => PMNode<any>;
export declare const toDOM: (node: PMNode<any>, schema: Schema<any, any>) => Node;
export declare const toHTML: (node: PMNode<any>, schema: Schema<any, any>) => string;
