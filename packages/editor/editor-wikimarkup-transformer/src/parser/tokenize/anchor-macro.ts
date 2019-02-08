import { Schema } from 'prosemirror-model';
import { Token, TokenParser, Context } from '.';
import { commonMacro } from './common-macro';

export const anchorMacro: TokenParser = ({
  input,
  position,
  schema,
  context,
}) => {
  return commonMacro(input.substring(position), schema, {
    keyword: 'anchor',
    paired: false,
    context,
    rawContentProcessor,
  });
};

const rawContentProcessor = (
  rawAttrs: string,
  rawContent: string,
  length: number,
  schema: Schema,
  context: Context,
): Token => {
  return {
    type: 'text',
    text: '',
    length,
  };
};
