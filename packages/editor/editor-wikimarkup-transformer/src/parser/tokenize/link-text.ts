import { isSafeUrl } from '@atlaskit/adf-schema';
import { Schema } from 'prosemirror-model';
import { Token } from './';

// https://www.atlassian.com
export const LINK_TEXT_REGEXP = /^(https?:\/\/|irc:\/\/|mailto:)([\w.?\/\\#-=@]+)/;

export function linkText(
  input: string,
  position: number,
  schema: Schema,
): Token {
  const match = input.substring(position).match(LINK_TEXT_REGEXP);

  if (!match) {
    return fallback(input, position);
  }

  // Remove mailto:
  const textRepresentation = match[1] === 'mailto:' ? match[2] : match[0];
  const url = unescape(match[0]);

  if (!isSafeUrl(url)) {
    return fallback(input, position);
  }

  const mark = schema.marks.link.create({
    href: encodeURI(url),
  });
  const textNode = schema.text(textRepresentation, [mark]);

  return {
    type: 'pmnode',
    nodes: [textNode],
    length: match[0].length,
  };
}

function unescape(url: string) {
  let result = '';
  for (let i = 0; i < url.length; i++) {
    const char = url[i];
    if (char !== '\\') {
      result += char;
      continue;
    }
    const nextChar = url[i + 1];
    if (nextChar) {
      result += nextChar;
      i++;
    }
  }
  return result;
}

function fallback(input: string, position: number): Token {
  return {
    type: 'text',
    text: input.substr(position, 1),
    length: 1,
  };
}
