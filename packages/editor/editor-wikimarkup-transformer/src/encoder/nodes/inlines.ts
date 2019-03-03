import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder } from '..';

import { emoji } from './emoji';
import { hardBreak } from './hard-break';
import { mention } from './mention';
import { text } from './text';
import { inlineCard } from './inline-card';
import { unknown } from './unknown';

const inlinesEncoderMapping: { [key: string]: NodeEncoder } = {
  emoji,
  hardBreak,
  mention,
  text,
  inlineCard,
};

export const inlines: NodeEncoder = (node: PMNode, parent?: PMNode): string => {
  const encoder = inlinesEncoderMapping[node.type.name];
  if (encoder) {
    return encoder(node, parent);
  }
  return unknown(node);
};
