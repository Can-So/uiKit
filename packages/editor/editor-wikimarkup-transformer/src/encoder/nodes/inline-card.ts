import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder } from '..';
import { unknown } from './unknown';

const ISSUE_KEY_REGEX = /[A-Z][A-Z]+-[0-9]+/;

export const inlineCard: NodeEncoder = (node: PMNode): string => {
  if (!node.attrs.url) {
    return unknown(node);
  }

  const match = node.attrs.url.match(ISSUE_KEY_REGEX);
  if (!match) {
    return unknown(node);
  }

  return `[${match[0]}]`;
};
