import { Schema } from 'prosemirror-model';
import { Token } from './';

// [~username]
const MENTION_REGEXP = /^\[[~@]([^\\\],]+?)\]/;

export function mention(
  input: string,
  position: number,
  schema: Schema,
): Token {
  const match = input.substring(position).match(MENTION_REGEXP);

  if (!match) {
    return fallback(input, position);
  }

  const [, mentionText] = match;

  const mentionNode = schema.nodes.mention.createChecked({
    id: mentionText,
  });

  return {
    type: 'pmnode',
    nodes: [mentionNode],
    length: match[0].length,
  };
}

function fallback(input: string, position: number): Token {
  return {
    type: 'text',
    text: input.substr(position, 2),
    length: 2,
  };
}
