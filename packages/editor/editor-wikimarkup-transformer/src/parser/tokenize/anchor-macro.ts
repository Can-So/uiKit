import { Schema } from 'prosemirror-model';
import { Token, TokenErrCallback, TokenParser } from '.';
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
    tokenErrCallback: context.tokenErrCallback,
    rawContentProcessor,
  });
};

const rawContentProcessor = (
  rawAttrs: string,
  rawContent: string,
  length: number,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token => {
  return {
    type: 'text',
    text: '',
    length,
  };
};
