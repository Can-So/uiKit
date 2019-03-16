import { Node as PMNode } from 'prosemirror-model';
export declare type MarkEncoder = (text: string, attrs: any) => string;
export declare type NodeEncoder = (node: PMNode, parent?: PMNode) => string;
export declare function encode(node: PMNode): string;
