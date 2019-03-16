import { Schema } from 'prosemirror-model';
import { Token, TokenParser, Context } from '.';
export declare const quoteMacro: TokenParser;
export declare const rawContentProcessor: (rawAttrs: string, rawContent: string, length: number, schema: Schema<any, any>, context: Context) => Token;
