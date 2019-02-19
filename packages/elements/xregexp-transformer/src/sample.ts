// Note: the transformer will replace the regex with unicode charsets within the RegExp

// \p{Han} => each chinese character is a separate token
// \p{L}+[\p{Mn}|']*\p{L} => consecutive letters, including non spacing mark and apostrophe are a single token
// @ts-ignore
const sampleRegex = new RegExp("\\p{Han}|\\p{L}+[\\p{Mn}|']*\\p{L}*", 'gi');
