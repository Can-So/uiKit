import { Schema } from 'prosemirror-model';
import { Token } from './';

/**
 * Jira is using the following regex to match force line break
 * private static final Pattern FORCE_NEWLINE = Pattern.compile("(?<!\\\\)\\\\{2}(?!\\S*\\\\)");
 */

const FORCE_LINE_BREAK_REGEX = /^\\{2}(?!\S*\\)/;

export function forceLineBreak(
  input: string,
  position: number,
  schema: Schema,
): Token {
  if (position > 0) {
    const charBefore = input.charAt(position - 1);
    if (charBefore === '\\') {
      return fallback(input, position);
    }
  }

  const match = input.substring(position).match(FORCE_LINE_BREAK_REGEX);

  if (match) {
    return {
      type: 'pmnode',
      nodes: [schema.nodes.hardBreak.createChecked()],
      length: 2,
    };
  }

  return fallback(input, position);
}

function fallback(input, position): Token {
  return {
    type: 'text',
    text: input.substr(position, 1),
    length: 1,
  };
}
