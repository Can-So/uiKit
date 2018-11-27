import { Node as PMNode, Schema } from 'prosemirror-model';
import { createTextNode } from './nodes/text';
import {
  parseOtherKeyword,
  parseLeadingKeyword,
  parseMacroKeyword,
} from './tokenize/keyword';
import { parseToken, TokenType, TokenErrCallback } from './tokenize';
import { parseWhitespaceOnly } from './tokenize/whitespace';

/**
 * In Jira, following characters are escaped
 * private static final Pattern ESCAPING_PATTERN = Pattern.compile("(^|(?<!\\\\))\\\\([\\-\\#\\*\\_\\+\\?\\^\\~\\|\\%\\{\\}\\[\\]\\(\\)\\!\\@])");
 * https://stash.atlassian.com/projects/JIRACLOUD/repos/jira/browse/jira-components/jira-renderer/src/main/java/com/atlassian/renderer/v2/components/BackslashEscapeRendererComponent.java
 */
const escapedChar = [
  '-',
  '#',
  '*',
  '_',
  '+',
  '?',
  '^',
  '~',
  '|',
  '%',
  '{',
  '}',
  '[',
  ']',
  '(',
  ')',
  '!',
  '@',
];

const processState = {
  NEWLINE: 0,
  BUFFER: 1,
  TOKEN: 2,
  ESCAPE: 3,
};

export function parseString(
  input: string,
  schema: Schema,
  ignoreTokens: TokenType[] = [],
  tokenErrCallback?: TokenErrCallback,
): PMNode[] {
  let index = 0;
  let state = processState.NEWLINE;
  let buffer = '';
  let tokenType = TokenType.STRING;
  const output: PMNode[] = [];

  while (index < input.length) {
    const char = input.charAt(index);

    switch (state) {
      case processState.NEWLINE: {
        /**
         * During this state, the parser will trim leading
         * spaces and looking for any leading keywords.
         */
        const substring = input.substring(index);
        const length = parseWhitespaceOnly(substring);
        if (length) {
          index += length;
          continue;
        }

        const match =
          parseLeadingKeyword(substring) ||
          parseMacroKeyword(substring) ||
          parseOtherKeyword(substring);

        if (match && ignoreTokens.indexOf(match.type) === -1) {
          tokenType = match.type;
          state = processState.TOKEN;
          continue;
        } else {
          state = processState.BUFFER;
          continue;
        }
      }

      case processState.BUFFER: {
        /**
         * During this state, the parser will start
         * saving plantext into the buffer until it hits
         * a keyword
         */
        const substring = input.substring(index);
        /**
         * If the previous char is not a alphanumeric, we will parse
         * format keywords.
         * If the previous char is '{', we need to skip parse macro
         * keyword
         */
        let match: { type: TokenType } | null = null;
        if (buffer.endsWith('{')) {
          match = parseOtherKeyword(substring);
        } else {
          match = parseMacroKeyword(substring) || parseOtherKeyword(substring);
        }

        if (match && ignoreTokens.indexOf(match.type) === -1) {
          tokenType = match.type;
          state = processState.TOKEN;
          continue;
        }

        if (char === '\\') {
          state = processState.ESCAPE;
          continue;
        }

        buffer += char;
        break;
      }

      case processState.TOKEN: {
        const token = parseToken(
          input,
          tokenType,
          index,
          schema,
          tokenErrCallback,
        );
        if (token.type === 'text') {
          buffer += token.text;
        } else if (token.type === 'pmnode') {
          output.push(...createTextNode(buffer, schema));
          buffer = ''; // clear the buffer
          output.push(...token.nodes);
        }
        index += token.length;
        if (tokenType === TokenType.HARD_BREAK) {
          state = processState.NEWLINE;
        } else {
          state = processState.BUFFER;
        }
        continue;
      }

      case processState.ESCAPE: {
        const prevChar = input.charAt(index - 1);
        const nextChar = input.charAt(index + 1);
        /**
         * Ported from Jira:
         * If previous char is also a backslash, then this is not a valid escape
         */
        if (escapedChar.indexOf(nextChar) === -1 || prevChar === '\\') {
          // Insert \ in buffer mode
          buffer += char;
        }
        buffer += nextChar;
        state = processState.BUFFER;
        index += 2;
        continue;
      }
      default:
    }
    index++;
  }

  if (buffer.length > 0) {
    // Wrapping the rest of the buffer into a text node
    output.push(...createTextNode(buffer, schema));
  }

  return output;
}
