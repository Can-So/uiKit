// Note: the transformer will replace the regex with unicode charsets within the RegExp

// @ts-ignore
const sampleRegex = new RegExp("\\p{Han}|\\p{L}+[\\p{Mn}|']*\\p{L}*", 'gi');
