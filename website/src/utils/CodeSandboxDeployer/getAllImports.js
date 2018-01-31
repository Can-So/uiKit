import { importPattern } from './constants';

export default (getAllImports = code =>
  code
    .match(new RegExp(importPattern, 'g'))
    .map(mpt => new RegExp(importPattern).exec(mpt)));
