import { Schema } from 'prosemirror-model';
import { Token, TokenErrCallback } from '.';
import { commonMacro } from './common-macro';

export function noformatMacro(
  input: string,
  position: number,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token {
  return commonMacro(input.substring(position), schema, {
    opening: /^\{noformat(?::([^\{\n\}]*))?\}/,
    closing: /\{noformat\}/,
    rawContentProcessor,
    tokenErrCallback,
  });
}

const rawContentProcessor = (
  rawAttrs: string,
  rawContent: string,
  length: number,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token => {
  const { codeBlock } = schema.nodes;
  const textNode = schema.text(rawContent);

  return {
    type: 'pmnode',
    nodes: [codeBlock.createChecked({ language: 'java' }, textNode)],
    length,
  };
};
