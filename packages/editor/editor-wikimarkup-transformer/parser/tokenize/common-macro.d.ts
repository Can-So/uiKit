import { Schema } from 'prosemirror-model';
import { Token, Context } from './';
export interface MacroOption {
    keyword: string;
    paired: boolean;
    context: Context;
    rawContentProcessor: (rawAttrs: string, rawContent: string, length: number, schema: Schema, context: Context) => Token;
}
export declare function commonMacro(input: string, schema: Schema, opt: MacroOption): Token;
