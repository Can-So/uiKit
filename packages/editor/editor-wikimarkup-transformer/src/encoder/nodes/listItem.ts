import { Node as PMNode } from 'prosemirror-model';
import { encode } from '..';

import { paragraph } from './paragraph';
import { unknown } from './unknown';
import { codeBlock } from './code-block';

export const listItem = (node: PMNode, prefix: string): string => {
  const result: string[] = [];
  let contentBuffer: string[] = [];
  node.forEach((n, offset, index) => {
    switch (n.type.name) {
      case 'paragraph': {
        contentBuffer.push(paragraph(n));
        break;
      }
      case 'bulletList':
      case 'orderedList': {
        if (contentBuffer.length) {
          result.push(`${prefix} ${contentBuffer.join('\n')}`);
          contentBuffer = [];
        }
        const nestedList = encode(n)
          .split('\n')
          .map(line => {
            if (['#', '*'].indexOf(line.substr(0, 1)) !== -1) {
              return `${prefix}${line}`;
            }
            return line;
          })
          .join('\n');
        result.push(nestedList);
        break;
      }
      case 'codeBlock': {
        contentBuffer.push(codeBlock(n));
        break;
      }
      default:
        contentBuffer.push(unknown(n));
    }
  });
  if (contentBuffer.length) {
    result.push(`${prefix} ${contentBuffer.join('\n')}`);
  }
  return result.join('\n');
};
