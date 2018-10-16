import { Schema } from 'prosemirror-model';
import getMediaSingleNodeView from '../nodes/mediaSingle';
import { Token } from './';
import { parseAttrs } from '../utils/attrs';

// [!image.jpg!|https://www.atlassian.com]
const MEDIA_REGEXP = /^\!([\(\)\w. -]+)(\|[\w=,. ]*)?\!/;

export function media(input: string, schema: Schema): Token {
  const match = input.match(MEDIA_REGEXP);

  if (!match) {
    return fallback(input);
  }

  const rawContent = match[1];
  const rawAttrs = match[2] ? match[2].slice(1) : '';

  /**
   * This is not image ! image.jpg!
   * This is not image !image.jpg !
   */
  if (match[0].startsWith('! ') || match[0].endsWith(' !')) {
    return fallback(input);
  }

  /**
   * If the closing symbol is followed by a alphanumeric, it's
   * not a valid formatter
   */
  const index = match[0].length;
  if (index < input.length) {
    const charAfterEnd = input.charAt(index);
    if (/[a-zA-Z0-9]|[^\u0000-\u007F]/.test(charAfterEnd)) {
      return fallback(input);
    }
  }

  const node = getMediaSingleNodeView(
    schema,
    rawContent,
    parseAttrs(rawAttrs, ','),
  );

  return {
    type: 'pmnode',
    nodes: [node],
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
