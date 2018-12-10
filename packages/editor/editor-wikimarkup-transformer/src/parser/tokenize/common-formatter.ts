import { Schema } from 'prosemirror-model';
import { Token, TokenType } from './';
import { linkFormat } from './links/link-format';
import { parseNewlineOnly } from './whitespace';
import { parseMacroKeyword } from './keyword';
import { parseToken } from '.';

export interface FormatterOption {
  /** The opening symbol */
  opening: string;
  /** The closing symbol */
  closing: string;
  /** This function will be called with the rawContent */
  rawContentProcessor: (raw: string, length: number) => Token;
}

const processState = {
  START: 0,
  BUFFER: 1,
  END: 2,
  INLINE_MACRO: 3,
  LINK_FORMAT: 4,
};

export function commonFormatter(
  input: string,
  position: number,
  schema: Schema,
  opt: FormatterOption,
): Token {
  let index = position;
  let state = processState.START;
  let buffer = '';
  const openingSymbolLength = opt.opening.length;
  const closingSymbolLength = opt.closing.length;

  while (index < input.length) {
    const char = input.charAt(index);
    const twoChar = input.substr(index, 2);
    const charsMatchClosingSymbol = input.substr(index, closingSymbolLength);

    switch (state) {
      case processState.START: {
        if (position > 0) {
          /**
           * If the previous char is a alphanumeric, then it's not a valid
           * formatter
           */
          const charBeforeOpening = input.charAt(position - 1);
          if (/[a-zA-Z0-9]|[^\u0000-\u007F]/.test(charBeforeOpening)) {
            return fallback(input, index, openingSymbolLength);
          }
        }
        const charAfterOpening = input.charAt(index + openingSymbolLength);
        if (
          !input.substring(position).startsWith(opt.opening) ||
          charAfterOpening === ' '
        ) {
          // this is not a valid formatter mark
          return fallback(input, position, openingSymbolLength);
        }
        state = processState.BUFFER;
        index += openingSymbolLength;
        continue;
      }
      case processState.BUFFER: {
        // the linebreak would break the strong marks
        const length = parseNewlineOnly(input.substring(index));
        if (length) {
          return fallback(input, position, openingSymbolLength);
        }
        if (charsMatchClosingSymbol === opt.closing) {
          state = processState.END;
          continue;
        } else if (twoChar === '{{') {
          // this is a monospace
          buffer += twoChar;
          index += 2;
          continue;
        } else if (char === '{') {
          state = processState.INLINE_MACRO;
          continue;
        } else if (char === '[') {
          state = processState.LINK_FORMAT;
          continue;
        } else {
          buffer += char;
        }
        break;
      }
      case processState.END: {
        index += closingSymbolLength;

        // empty formatter mark is treated as normal text
        if (buffer.length === 0) {
          return fallback(input, position, openingSymbolLength);
        }

        /**
         * If the closing symbol is followed by a alphanumeric, it's
         * not a valid formatter, and we keep looking for
         * next valid closing formatter
         */
        if (index < input.length) {
          const charAfterEnd = input.charAt(index);

          if (/[a-zA-Z0-9]|[^\u0000-\u007F]/.test(charAfterEnd)) {
            buffer += charsMatchClosingSymbol;
            state = processState.BUFFER;
            continue;
          }
        }

        /**
         * If the closing symbol has an empty space before it,
         * it's not a valid formatter
         */
        if (buffer.endsWith(' ')) {
          return fallback(input, position, openingSymbolLength);
        }

        return opt.rawContentProcessor(buffer, index - position);
      }
      case processState.INLINE_MACRO: {
        const match = parseMacroKeyword(input.substring(index));
        if (!match) {
          buffer += char;
          state = processState.BUFFER;
          break;
        }
        const token = parseToken(input, match.type, index, schema);
        if (token.type === 'text') {
          buffer += token.text;
          index += token.length;
          state = processState.BUFFER;
          continue;
        } else if (match.type === TokenType.COLOR_MACRO) {
          /**
           * {color} is valid in formatter, we simply jump over the length
           */
          buffer += input.substr(index, token.length);
          index += token.length;
          state = processState.BUFFER;
          continue;
        } else {
          // No macro are accepted in formater
          return fallback(input, position, openingSymbolLength);
        }
      }
      case processState.LINK_FORMAT: {
        /**
         * We should "fly over" the link format and we dont want
         * -awesome [link|https://www.atlass-ian.com] nice
         * to be a strike through because of the '-' in link
         */
        const token = linkFormat(input, index, schema);
        if (token.type === 'text') {
          buffer += token.text;
          index += token.length;
          state = processState.BUFFER;
          continue;
        } else if (token.type === 'pmnode') {
          buffer += input.substr(index, token.length);
          index += token.length;
          state = processState.BUFFER;
          continue;
        }
        return fallback(input, position, openingSymbolLength);
      }
      default:
    }
    index++;
  }
  return fallback(input, position, openingSymbolLength);
}

function fallback(input: string, position: number, length: number): Token {
  return {
    type: 'text',
    text: input.substr(position, length),
    length: length,
  };
}
