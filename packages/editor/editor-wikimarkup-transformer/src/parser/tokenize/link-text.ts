import { isSafeUrl } from '@atlaskit/editor-common';
import { Schema } from 'prosemirror-model';
import { Token } from './';

// https://www.atlassian.com
export const LINK_TEXT_REGEXP = /^(https?|irc):\/\/[\w.?\/\\#-=]+/;

export function linkText(
  input: string,
  position: number,
  schema: Schema,
): Token {
  const match = input.substring(position).match(LINK_TEXT_REGEXP);

  if (!match) {
    return fallback(input, position);
  }

  const textRepresentation = match[0];
  const url = match[0];

  if (!isSafeUrl(url)) {
    return fallback(input, position);
  }

  const mark = schema.marks.link.create({
    href: url,
  });
  const textNode = schema.text(textRepresentation, [mark]);

  return {
    type: 'pmnode',
    nodes: [textNode],
    length: match[0].length,
  };
}

function fallback(input: string, position: number): Token {
  return {
    type: 'text',
    text: input.substr(position, 1),
    length: 1,
  };
}
