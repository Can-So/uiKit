import { Serializer } from './serializer';
import { ADNode, ADFStage } from '@findable/editor-common';
import { Schema } from 'prosemirror-model';
export interface RenderOutput<T> {
    result: T;
    stat: RenderOutputStat;
}
export interface RenderOutputStat {
    buildTreeTime?: number;
    sanitizeTime: number;
    serializeTime?: number;
}
export interface ResultWithTime<T> {
    output: T;
    time: number;
}
export declare const renderDocument: <T>(doc: any, serializer: Serializer<T>, schema?: Schema<any, any>, adfStage?: ADFStage) => RenderOutput<T | null>;
export declare const renderNodes: <T>(nodes: ADNode[], serializer: Serializer<T>, schema?: Schema<any, any>, target?: any, adfStage?: ADFStage) => T | null;
