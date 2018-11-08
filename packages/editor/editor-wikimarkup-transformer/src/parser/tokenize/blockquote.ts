import { Schema } from 'prosemirror-model';
import { rawContentProcessor } from './quote-macro';
import { Token, TokenErrCallback } from './';

// bq. sadfsdf
const BLOCKQUOTE_REGEXP = /^bq\.\s(.*)/;

export function blockquote(
  input: string,
  position: number,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token {
  const match = input.substring(position).match(BLOCKQUOTE_REGEXP);

  if (!match) {
    return fallback(input, position);
  }

  const [, rawContent] = match;
  return rawContentProcessor(
    '',
    rawContent,
    match[0].length,
    schema,
    tokenErrCallback,
  );
}

function fallback(input: string, position: number): Token {
  return {
    type: 'text',
    text: input.substr(position, 1),
    length: 1,
  };
}
