import { Schema } from 'prosemirror-model';
import getMediaSingleNodeView from '../nodes/mediaSingle';
import { Token } from './';
import { parseAttrs } from '../utils/attrs';
import { commonFormatter } from './common-formatter';

export function media(input: string, position: number, schema: Schema): Token {
  const rawContentProcessor = (raw: string, length: number): Token => {
    // !image.gif|align=right, vspace=4|ignore-this!
    // If it splits into more than 2 items, we ignore the rest
    const [rawContent, rawAttrs = ''] = raw.split('|');

    const node = getMediaSingleNodeView(
      schema,
      rawContent,
      parseAttrs(rawAttrs, ','),
    );

    return {
      type: 'pmnode',
      nodes: [node],
      length,
    };
  };

  return commonFormatter(input, position, schema, {
    opening: '!',
    closing: '!',
    rawContentProcessor,
  });
}
