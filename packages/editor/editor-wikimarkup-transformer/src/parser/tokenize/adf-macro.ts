import { Schema } from 'prosemirror-model';
import { Token, TokenParser, Context } from '.';
import { commonMacro } from './common-macro';

export const adfMacro: TokenParser = ({ input, position, schema, context }) => {
  return commonMacro(input.substring(position), schema, {
    keyword: 'adf',
    paired: true,
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
  const json = JSON.parse(rawContent);
  const node = schema.nodeFromJSON(json);

  return {
    type: 'pmnode',
    nodes: [node],
    length,
  };
};
