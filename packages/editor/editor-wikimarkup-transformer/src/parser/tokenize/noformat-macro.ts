import { Schema, Node as PMNode } from 'prosemirror-model';
import { Token, TokenErrCallback } from '.';
import { commonMacro } from './common-macro';
import { parseAttrs } from '../utils/attrs';
import { title } from '../utils/title';

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
  const output: PMNode[] = [];
  const { codeBlock } = schema.nodes;

  const parsedAttrs = parseAttrs(rawAttrs);
  const trimedContent = rawContent.replace(/^\s+|\s+$/g, '');
  const textNode = trimedContent.length
    ? schema.text(trimedContent)
    : undefined;

  if (parsedAttrs.title) {
    output.push(title(parsedAttrs.title, schema));
  }

  output.push(codeBlock.createChecked({ language: 'java' }, textNode));

  return {
    type: 'pmnode',
    nodes: output,
    length,
  };
};
