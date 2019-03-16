import { Transformer } from '@atlaskit/editor-common';
import { Node as PMNode } from 'prosemirror-model';
export declare type JSONNode = {
    type: string;
    attrs?: object;
    content?: JSONNode[];
    marks?: any[];
    text?: string;
};
export declare type JSONDocNode = {
    version: number;
    type: 'doc';
    content: JSONNode[];
};
export declare class JSONTransformer implements Transformer<JSONDocNode> {
    encode(node: PMNode): JSONDocNode;
    parse(content: JSONDocNode): PMNode;
    /**
     * This method is used to encode a single node
     */
    encodeNode(node: PMNode): JSONNode;
}
