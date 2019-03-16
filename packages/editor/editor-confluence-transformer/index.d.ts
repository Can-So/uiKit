import { Node as PMNode, Schema } from 'prosemirror-model';
import { Transformer } from '@atlaskit/editor-common';
export { LANGUAGE_MAP as CONFLUENCE_LANGUAGE_MAP } from './languageMap';
export declare class ConfluenceTransformer implements Transformer<string> {
    private schema;
    constructor(schema: Schema);
    parse: (html: string) => PMNode<any>;
    encode: (node: PMNode<any>) => string;
}
