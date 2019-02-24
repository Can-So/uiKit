import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder } from '..';
import { unknown } from './unknown';
import { INLINE_CARD_FROM_TEXT_STAMP } from '../../parser/tokenize/issue-key';

export const inlineCard: NodeEncoder = (node: PMNode): string => {
  if (!node.attrs.url) {
    return unknown(node);
  }

  const match = node.attrs.url.match(INLINE_CARD_FROM_TEXT_STAMP);
  if (!match) {
    return unknown(node);
  }

  return `[${match[2]}]`;
};
