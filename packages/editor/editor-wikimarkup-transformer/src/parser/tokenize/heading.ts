import { Schema } from 'prosemirror-model';
import { parseString } from '../text';
import { Token, TokenType } from './';

// h1. HEADING
const HEADING_REGEXP = /^h([1|2|3|4|5|6])\.\s(.*)/;

export function heading(input: string, schema: Schema): Token {
  /**
   * The following token types will be ignored in parsing
   * the content of a strong mark
   */
  const ignoreTokenTypes = [
    TokenType.DOUBLE_DASH_SYMBOL,
    TokenType.TRIPLE_DASH_SYMBOL,
    TokenType.QUADRUPLE_DASH_SYMBOL,
  ];

  const match = input.match(HEADING_REGEXP);

  if (!match) {
    return fallback(input);
  }

  const level = parseInt(match[1], 10);
  const content = parseString(match[2], schema, ignoreTokenTypes);

  const headingNode = schema.nodes.heading.createChecked(
    {
      level,
    },
    content,
  );

  return {
    type: 'pmnode',
    nodes: [headingNode],
    length: match[0].length,
  };
}

function fallback(input: string): Token {
  return {
    type: 'text',
    text: input.substr(0, 1),
    length: 1,
  };
}
