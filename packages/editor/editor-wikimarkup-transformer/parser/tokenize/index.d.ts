import { Node as PMNode, Schema } from 'prosemirror-model';
export declare enum TokenType {
    ADF_MACRO = "ADF_MACRO",
    ANCHOR_MACRO = "ANCHOR_MACRO",
    CODE_MACRO = "CODE_MACRO",
    QUOTE_MACRO = "QUOTE_MACRO",
    NOFORMAT_MACRO = "NOFORMAT_MACRO",
    PANEL_MACRO = "PANEL_MACRO",
    COLOR_MACRO = "COLOR_MACRO",
    LOREM_MACRO = "LOREM_MACRO",
    QUOTE = "QUOTE",
    STRING = "STRING",
    ISSUE_KEY = "ISSUE_KEY",
    LINK_FORMAT = "LINK_FORMAT",
    LINK_TEXT = "LINK_TEXT",
    MEDIA = "MEDIA",
    HEADING = "HEADING",
    LIST = "LIST",
    TABLE = "TABLE",
    RULER = "RULER",
    HARD_BREAK = "HARD_BREAK",
    DOUBLE_DASH_SYMBOL = "DOUBLE_DASH_SYMBOL",
    TRIPLE_DASH_SYMBOL = "TRIPLE_DASH_SYMBOL",
    QUADRUPLE_DASH_SYMBOL = "QUADRUPLE_DASH_SYMBOL",
    STRONG = "STRONG",
    MONOSPACE = "MONOSPACE",
    SUPERSCRIPT = "SUPERSCRIPT",
    SUBSCRIPT = "SUBSCRIPT",
    EMPHASIS = "EMPHASIS",
    CITATION = "CITATION",
    DELETED = "DELETED",
    INSERTED = "INSERTED",
    EMOJI = "EMOJI",
    FORCE_LINE_BREAK = "FORCE_LINE_BREAK"
}
export interface TextToken {
    readonly type: 'text';
    readonly text: string;
    readonly length: number;
}
export interface PMNodeToken {
    readonly type: 'pmnode';
    readonly nodes: PMNode[];
    readonly length: number;
}
export interface InlineCardConversion {
    [key: string]: string;
}
export interface Context {
    readonly inlineCardConversion?: InlineCardConversion;
    readonly issueKeyRegex?: RegExp | undefined;
    readonly tokenErrCallback?: TokenErrCallback;
}
export declare type Token = TextToken | PMNodeToken;
export declare type TokenErrCallback = (err: Error, tokenType: string) => void;
export declare type TokenParser = ({ input, position, schema, context, }: {
    input: string;
    position: number;
    schema: Schema;
    context: Context;
}) => Token;
export declare function parseToken(input: string, type: TokenType, position: number, schema: Schema, context: Context): Token;
