import { Node as PMNode, Schema } from 'prosemirror-model';
export declare type NodeReducer = (node: PMNode, schema: Schema) => string;
export declare const reduce: NodeReducer;
export declare const nodeToReducerMapping: {
    [key: string]: NodeReducer;
};
