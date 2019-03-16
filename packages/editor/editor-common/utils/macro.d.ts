import { Node as PmNode } from 'prosemirror-model';
export interface Params {
    node: PmNode;
    type: 'image' | 'icon';
}
export declare const getExtensionLozengeData: ({ node, type, }: Params) => {
    url: string;
    width?: number | undefined;
    height?: number | undefined;
} | undefined;
