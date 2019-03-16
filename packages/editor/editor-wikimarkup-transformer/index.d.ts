import { Transformer } from '@atlaskit/editor-common';
import { Node as PMNode, Schema } from 'prosemirror-model';
import { Context } from './parser/tokenize';
export declare class WikiMarkupTransformer implements Transformer<string> {
    private schema;
    constructor(schema?: Schema);
    encode(node: PMNode): string;
    parse(wikiMarkup: string, context?: Context): PMNode;
    private buildContext;
}
export default WikiMarkupTransformer;
