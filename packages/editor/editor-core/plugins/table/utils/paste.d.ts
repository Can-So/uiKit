import { Node as PMNode, Schema, Slice, Fragment } from 'prosemirror-model';
export declare const unwrapContentFromTable: (maybeTable: PMNode<any>) => PMNode<any> | PMNode<any>[];
export declare const removeTableFromFirstChild: (node: PMNode<any>, i: number) => PMNode<any> | PMNode<any>[];
export declare const removeTableFromLastChild: (node: PMNode<any>, i: number, fragment: Fragment<any>) => PMNode<any> | PMNode<any>[];
export declare const transformSliceToRemoveOpenTable: (slice: Slice<any>, schema: Schema<any, any>) => Slice<any>;
