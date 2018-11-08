import { Token } from './';

const TYPE = 'text';
const SYMBOL = '–';
const LENGTH = 2;

export function doubleDashSymbol(input: string, position: number): Token {
  const charAfterToken: string = input.charAt(position + LENGTH);
  const charBeforeToken: string = input.charAt(position - 1);
  const tuple: [string, string] = [charBeforeToken, charAfterToken];

  if (isAlphanumericalOrUnicodeOrParenthesis(tuple)) {
    return fallback();
  }

  return {
    type: TYPE,
    text: SYMBOL,
    length: LENGTH,
  };
}

function isAlphanumericalOrUnicodeOrParenthesis(
  tuple: [string, string],
): boolean {
  // The unicode regex must ignore the space
  return tuple.some(char =>
    /[a-zA-Z0-9\(\)]|[^\u0000-\u007F]|\(|\)/.test(char),
  );
}

function fallback(): Token {
  return {
    type: TYPE,
    text: '--',
    length: LENGTH,
  };
}
