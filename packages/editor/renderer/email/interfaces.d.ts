import { Mark } from 'prosemirror-model';
export declare type NodeSerializer = (opts: NodeSerializerOpts) => string;
export declare type MarkSerializer = (opts: MarkSerializerOpts) => string;
export declare type Style = {
    [key: string]: string | number | undefined;
};
export interface NodeSerializerOpts {
    attrs: {
        [key: string]: any;
    };
    marks: Mark[];
    text?: string | null;
}
export interface MarkSerializerOpts {
    mark: Mark;
    text: string;
}
