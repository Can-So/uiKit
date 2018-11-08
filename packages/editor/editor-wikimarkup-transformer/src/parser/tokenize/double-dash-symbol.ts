import { Token } from './';

const TOKEN_LENGTH = 2;
const TOKEN_TYPE = 'text';

export function doubleDashSymbol(input: string, position: number): Token {
  const charAfterToken = input.charAt(position + TOKEN_LENGTH);
  if (isAlphanumericalOrUnicode(charAfterToken)) {
    return fallback();
  }

  const charBeforeToken = input.charAt(position - 1);
  if (isAlphanumericalOrUnicode(charBeforeToken)) {
    return fallback();
  }

  const isWrappedByParenthesis =
    isParenthesis(charBeforeToken) || isParenthesis(charAfterToken);
  if (isWrappedByParenthesis) {
    return fallback();
  }

  return {
    type: TOKEN_TYPE,
    text: '–',
    length: TOKEN_LENGTH,
  };
}

function isAlphanumericalOrUnicode(char: string): boolean {
  // Check against alphanumerical or unicode without space
  return /[a-zA-Z0-9\(\)]|[^\u0000-\u007F]/.test(char);
}

function isParenthesis(char: string): boolean {
  return /\(|\)/.test(char);
}

function fallback(): Token {
  return {
    type: TOKEN_TYPE,
    text: '--',
    length: TOKEN_LENGTH,
  };
}
