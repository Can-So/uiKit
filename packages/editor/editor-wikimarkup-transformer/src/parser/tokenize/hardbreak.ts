import { Schema } from 'prosemirror-model';
import { Token } from './';
import { parseNewlineOnly } from './whitespace';

export function hardbreak(
  input: string,
  position: number,
  schema: Schema,
): Token {
  // Look for normal hardbreak \r, \n, \r\n
  const length = parseNewlineOnly(input.substring(position));

  if (length === 0) {
    // not a valid hardbreak
    return {
      type: 'text',
      text: input.substr(position, 1),
      length: 1,
    };
  }

  return {
    type: 'pmnode',
    nodes: [schema.nodes.hardBreak.createChecked()],
    length,
  };
}
