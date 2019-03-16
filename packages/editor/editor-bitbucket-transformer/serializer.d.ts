import { MarkdownSerializer as PMMarkdownSerializer, MarkdownSerializerState as PMMarkdownSerializerState } from 'prosemirror-markdown';
import { Node as PMNode } from 'prosemirror-model';
export declare class MarkdownSerializerState extends PMMarkdownSerializerState {
    context: {
        insideTable: boolean;
    };
    renderContent(parent: PMNode): void;
    /**
     * This method override will properly escape backticks in text nodes with "code" mark enabled.
     * Bitbucket uses python-markdown which does not honor escaped backtick escape sequences \`
     * inside a backtick fence.
     *
     * @see node_modules/prosemirror-markdown/src/to_markdown.js
     * @see MarkdownSerializerState.renderInline()
     */
    renderInline(parent: PMNode): void;
}
export declare class MarkdownSerializer extends PMMarkdownSerializer {
    serialize(content: PMNode, options?: {
        [key: string]: any;
    }): string;
}
export declare const nodes: {
    table(state: PMMarkdownSerializerState, node: PMNode<any>): void;
    tableRow(state: PMMarkdownSerializerState, node: PMNode<any>): void;
    tableHeader: (state: PMMarkdownSerializerState, node: PMNode<any>) => void;
    /**
     * This method override will properly escape backticks in text nodes with "code" mark enabled.
     * Bitbucket uses python-markdown which does not honor escaped backtick escape sequences \`
     * inside a backtick fence.
     *
     * @see node_modules/prosemirror-markdown/src/to_markdown.js
     * @see MarkdownSerializerState.renderInline()
     */
    tableCell: (state: PMMarkdownSerializerState, node: PMNode<any>) => void;
    blockquote(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    codeBlock(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    heading(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    rule(state: MarkdownSerializerState, node: PMNode<any>): void;
    bulletList(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    orderedList(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    listItem(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    paragraph(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    mediaGroup(state: MarkdownSerializerState, node: PMNode<any>): void;
    mediaSingle(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>): void;
    media(state: MarkdownSerializerState, node: PMNode<any>): void;
    image(state: MarkdownSerializerState, node: PMNode<any>): void;
    hardBreak(state: MarkdownSerializerState): void;
    text(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    empty_line(state: MarkdownSerializerState, node: PMNode<any>): void;
    mention(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
    emoji(state: MarkdownSerializerState, node: PMNode<any>, parent: PMNode<any>, index: number): void;
};
export declare const marks: {
    em: {
        open: string;
        close: string;
        mixable: boolean;
        expelEnclosingWhitespace: boolean;
    };
    strong: {
        open: string;
        close: string;
        mixable: boolean;
        expelEnclosingWhitespace: boolean;
    };
    strike: {
        open: string;
        close: string;
        mixable: boolean;
        expelEnclosingWhitespace: boolean;
    };
    link: {
        open: string;
        close(state: MarkdownSerializerState, mark: any): string;
    };
    code: {
        open: string;
        close: string;
    };
    mentionQuery: {
        open: string;
        close: string;
        mixable: boolean;
    };
    emojiQuery: {
        open: string;
        close: string;
        mixable: boolean;
    };
};
