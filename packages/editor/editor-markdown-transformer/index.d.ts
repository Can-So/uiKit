import { Transformer } from '@atlaskit/editor-common';
import * as MarkdownIt from 'markdown-it';
import { Schema, Node as PMNode } from 'prosemirror-model';
export declare type Markdown = string;
export declare class MarkdownTransformer implements Transformer<Markdown> {
    private markdownParser;
    constructor(schema?: Schema, tokenizer?: MarkdownIt);
    encode(node: PMNode): Markdown;
    parse(content: Markdown): PMNode;
}
