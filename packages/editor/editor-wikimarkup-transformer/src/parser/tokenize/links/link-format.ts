import { Schema } from 'prosemirror-model';
import { Token, TokenErrCallback } from '../index';
import { resolveLink } from './link-resolver';
import { parseContentLink } from './link-parser';

// [http://www.example.com] and [Example|http://www.example.com]
const LINK_FORMAT_REGEXP = /^\[([^\]\n]+)]/;

export function linkFormat(
  input: string,
  position: number,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token {
  const match = input.substring(position).match(LINK_FORMAT_REGEXP);

  if (!match) {
    return fallback();
  }

  const content = parseContentLink(match[1]);

  return resolveLink(content, schema, tokenErrCallback);
}

function fallback(): Token {
  return {
    type: 'text',
    text: '[',
    length: 1,
  };
}
