// Note: the transformer will replace the regex with unicode charsets within the RegExp

// \p{Han} => each chinese character is a separate token
// \p{L}+[\p{Mn}|']*\p{L} => consecutive letters, including non spacing mark and apostrophe are a single token
const tokenizerRegex = new RegExp("\\p{Han}|\\p{L}+[\\p{Mn}|']*\\p{L}*", 'gi');

// @ts-ignore
const nonSpacingMarkRegex = new RegExp('\\p{Mn}', 'gi');

// @ts-ignore
const REGEX = /\p{Han}|[\p{L}|\p{N}]+[\p{Mn}|\']*\p{L}*/g;

// @ts-ignore
const callingRegex = RegExp(
  "\\p{Han}|[\\p{L}|\\p{N}]+[\\p{Mn}|']*\\p{L}*",
  'g',
);
