import { Mark as PMMark, Schema } from 'prosemirror-model';
export declare type ADFStage = 'stage0' | 'final';
export interface ADDoc {
    version: 1;
    type: 'doc';
    content: ADNode[];
}
export interface ADNode {
    type: string;
    attrs?: any;
    content?: ADNode[];
    marks?: ADMark[];
    text?: string;
}
export interface ADMark {
    type: string;
    attrs?: any;
}
export interface ADMarkSimple {
    type: {
        name: string;
    };
    attrs?: any;
}
export declare const markOrder: string[];
export declare const isSubSupType: (type: string) => type is "sub" | "sup";
export declare const getMarksByOrder: (marks: PMMark<any>[]) => PMMark<any>[];
export declare const isSameMark: (mark: PMMark<any> | null, otherMark: PMMark<any> | null) => boolean;
export declare const getValidDocument: (doc: ADDoc, schema?: Schema<any, any>, adfStage?: ADFStage) => ADDoc | null;
export declare const getValidContent: (content: ADNode[], schema?: Schema<any, any>, adfStage?: ADFStage) => ADNode[];
/**
 * Sanitize unknown node tree
 *
 * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/11174043/Document+structure#Documentstructure-ImplementationdetailsforHCNGwebrenderer
 */
export declare const getValidUnknownNode: (node: ADNode) => ADNode;
export declare const getValidNode: (originalNode: ADNode, schema?: Schema<any, any>, adfStage?: ADFStage) => ADNode;
export declare const getValidMark: (mark: ADMark, adfStage?: ADFStage) => ADMark | null;
