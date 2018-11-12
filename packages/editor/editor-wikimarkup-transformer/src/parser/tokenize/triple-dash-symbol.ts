import { TextToken } from './';
import { createDashTokenParser } from './dash-token-creator';

const token: TextToken = {
  type: 'text',
  text: '—',
  length: 3,
};
const fallback: TextToken = {
  ...token,
  text: '---',
};

export const tripleDashSymbol = createDashTokenParser(token, fallback);
