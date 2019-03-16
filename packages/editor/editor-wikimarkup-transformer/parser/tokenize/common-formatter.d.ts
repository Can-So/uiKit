import { Schema } from 'prosemirror-model';
import { Token, Context } from './';
export interface FormatterOption {
    context: Context;
    opening: string;
    closing: string;
    rawContentProcessor: (raw: string, length: number) => Token;
}
export declare function commonFormatter(input: string, position: number, schema: Schema, opt: FormatterOption): Token;
