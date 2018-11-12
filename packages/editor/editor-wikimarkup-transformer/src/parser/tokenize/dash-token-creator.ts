import { TextToken, Token } from './';

export const createDashTokenParser = (
  token: TextToken,
  fallback: TextToken,
) => (input: string, position: number): Token => {
  const charAfterToken: string = input.charAt(position + token.length);
  const charBeforeToken: string = input.charAt(position - 1);

  if (isAlphanumericalOrUnicodeOrParenthesis(charBeforeToken, charAfterToken)) {
    return fallback;
  }

  return token;
};

const isAlphanumericalOrUnicodeOrParenthesis = (
  before: string,
  after: string,
): boolean => {
  // The unicode regex must ignore the space
  return [before, after].some(char =>
    /[a-zA-Z0-9\(\)]|[^\u0000-\u007F]/.test(char),
  );
};
