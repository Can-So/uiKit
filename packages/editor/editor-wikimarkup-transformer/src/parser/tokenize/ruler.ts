import { Schema } from 'prosemirror-model';
import { createRuleNode } from '../nodes/rule';
import { Token } from './';

const RULER_REGEX = /^-{4,5}(\s|$)/;

export function ruler(input: string, position: number, schema: Schema): Token {
  const match = input.substring(position).match(RULER_REGEX);

  if (match) {
    return {
      type: 'pmnode',
      nodes: createRuleNode(schema),
      length: match[0].length,
    };
  }

  return {
    type: 'text',
    text: input.substring(position, 1),
    length: 1,
  };
}
