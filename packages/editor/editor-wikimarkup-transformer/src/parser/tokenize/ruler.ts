import { Schema } from 'prosemirror-model';
import { createRuleNode } from '../nodes/rule';
import { Token } from './';

export function ruler(input: string, position: number, schema: Schema): Token {
  return {
    type: 'pmnode',
    nodes: createRuleNode(schema),
    length: 4,
  };
}
