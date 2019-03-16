import { Node as PMNode, Schema } from 'prosemirror-model';
import { Transformer } from '@findable/editor-common';
export interface TransformerOptions {
    disableBitbucketLinkStripping?: boolean;
}
export declare class BitbucketTransformer implements Transformer<string> {
    private serializer;
    private schema;
    private options;
    constructor(schema: Schema, options?: TransformerOptions);
    encode(node: PMNode): string;
    parse(html: string): PMNode;
    buildDOMTree(html: string): HTMLElement;
}
