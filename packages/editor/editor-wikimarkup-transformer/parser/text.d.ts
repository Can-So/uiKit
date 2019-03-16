import { Node as PMNode, Schema } from 'prosemirror-model';
import { TokenType, Context } from './tokenize';
export declare function parseString({ input, schema, ignoreTokenTypes, context, }: {
    input: string;
    schema: Schema;
    ignoreTokenTypes: TokenType[];
    context: Context;
}): PMNode[];
