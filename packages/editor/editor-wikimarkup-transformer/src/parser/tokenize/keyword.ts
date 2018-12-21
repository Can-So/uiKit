import { TokenType } from './';
import { EMOJIS } from './emoji';

const macroKeywordTokenMap = [
  {
    type: TokenType.ADF_MACRO,
    regex: /^{adf/i,
  },
  {
    type: TokenType.ANCHOR_MACRO,
    regex: /^{anchor/i,
  },
  {
    type: TokenType.CODE_MACRO,
    regex: /^{code/i,
  },
  {
    type: TokenType.QUOTE_MACRO,
    regex: /^{quote/i,
  },
  {
    type: TokenType.NOFORMAT_MACRO,
    regex: /^{noformat/i,
  },
  {
    type: TokenType.PANEL_MACRO,
    regex: /^{panel/i,
  },
  {
    type: TokenType.COLOR_MACRO,
    regex: /^{color/,
  },
  {
    type: TokenType.LOREM_MACRO,
    regex: /^{loremipsum/i,
  },
];

/**
 * The order of this mapping determind which keyword
 * will be checked first, so it matters.
 */
const keywordTokenMap = {
  '[': TokenType.LINK_FORMAT,
  http: TokenType.LINK_TEXT,
  irc: TokenType.LINK_TEXT,
  '\\\\': TokenType.FORCE_LINE_BREAK,
  '\r': TokenType.HARD_BREAK,
  '\n': TokenType.HARD_BREAK,
  '\r\n': TokenType.HARD_BREAK,
  '!': TokenType.MEDIA,
  '----': TokenType.QUADRUPLE_DASH_SYMBOL,
  '---': TokenType.TRIPLE_DASH_SYMBOL,
  '--': TokenType.DOUBLE_DASH_SYMBOL,
  '-': TokenType.DELETED,
  '+': TokenType.INSERTED,
  '*': TokenType.STRONG,
  '^': TokenType.SUPERSCRIPT,
  '~': TokenType.SUBSCRIPT,
  _: TokenType.EMPHASIS,
  '{{': TokenType.MONOSPACE,
  '??': TokenType.CITATION,
};

export function parseMacroKeyword(input: string) {
  for (const keyword of macroKeywordTokenMap) {
    if (keyword.regex.test(input)) {
      return {
        type: keyword.type,
      };
    }
  }

  return null;
}

export function parseOtherKeyword(input: string) {
  for (const name in keywordTokenMap) {
    if (keywordTokenMap.hasOwnProperty(name) && input.startsWith(name)) {
      return {
        type: keywordTokenMap[name],
      };
    }
  }

  // Look for a emoji
  const char = input.charAt(0);
  if ([':', '(', ';'].indexOf(char) !== -1) {
    for (const emoji of EMOJIS) {
      for (const text of emoji.markup) {
        if (input.startsWith(text)) {
          return {
            type: TokenType.EMOJI,
          };
        }
      }
    }
  }

  return null;
}

/**
 * These keywords only take effect when it's at the
 * beginning of the line
 * The order of the mapping matters. We should not put
 * LIST in front of RULER for example.
 */
const leadingKeywordTokenMap = [
  {
    type: TokenType.QUOTE,
    regex: /^bq\./,
  },
  {
    type: TokenType.HEADING,
    regex: /^h[1-6]\./,
  },
  {
    type: TokenType.RULER,
    regex: /^-{4,5}(\s|$)/,
  },
  {
    type: TokenType.TRIPLE_DASH_SYMBOL,
    regex: /^-{3}\s/,
  },
  {
    type: TokenType.DOUBLE_DASH_SYMBOL,
    regex: /^-{2}\s/,
  },
  {
    type: TokenType.LIST,
    regex: /^([*#]+|-) /,
  },
  {
    type: TokenType.TABLE,
    regex: /^\|{1,2}/,
  },
];

export function parseLeadingKeyword(input: string) {
  for (const keyword of leadingKeywordTokenMap) {
    if (keyword.regex.test(input)) {
      return {
        type: keyword.type,
      };
    }
  }

  return null;
}
