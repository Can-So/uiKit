import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder } from '..';

import { unknown } from './unknown';

export const extension: NodeEncoder = (node: PMNode): string => {
  if (node.attrs.extensionType === 'com.atlassian.jira.macro') {
    return `{${node.attrs.extensionKey}}${node.attrs.text}{${
      node.attrs.extensionKey
    }}`;
  }

  return unknown(node);
};
