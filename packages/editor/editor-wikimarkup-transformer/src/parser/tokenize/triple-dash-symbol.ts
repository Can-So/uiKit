import { Token } from './';

const SYMBOL = '—';

export function tripleDashSymbol(input: string): Token {
  return {
    type: 'text',
    text: SYMBOL,
    length: 3,
  };
}
