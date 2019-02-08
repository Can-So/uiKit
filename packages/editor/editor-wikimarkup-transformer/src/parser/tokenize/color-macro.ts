import { Schema } from 'prosemirror-model';
import { Token, TokenType, TokenErrCallback, TokenParser } from '.';
import { commonMacro } from './common-macro';
import { parseAttrs } from '../utils/attrs';
import { parseString } from '../text';
import { getEditorColor } from '../color';
import { hasAnyOfMarks } from '../utils/text';

export const colorMacro: TokenParser = ({
  input,
  position,
  schema,
  context,
}) => {
  return commonMacro(input.substring(position), schema, {
    keyword: 'color',
    paired: true,
    tokenErrCallback: context.tokenErrCallback,
    rawContentProcessor,
  });
};

const rawContentProcessor = (
  rawAttrs: string,
  rawContent: string,
  length: number,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): Token => {
  const ignoreTokens = [
    TokenType.DOUBLE_DASH_SYMBOL,
    TokenType.TRIPLE_DASH_SYMBOL,
    TokenType.QUADRUPLE_DASH_SYMBOL,
  ];

  const parsedAttrs = parseAttrs(rawAttrs);
  const content = parseString({
    ignoreTokens,
    schema,
    tokenErrCallback,
    input: rawContent,
  });
  const decoratedContent = content.map(n => {
    const mark = schema.marks.textColor.create({
      color: getEditorColor(parsedAttrs) || '#000000',
    });

    // We don't want to mix `code` mark with others
    if (n.type.name === 'text' && !hasAnyOfMarks(n, ['textColor', 'code'])) {
      return n.mark([...n.marks, mark]);
    }
    return n;
  });

  return {
    type: 'pmnode',
    nodes: decoratedContent,
    length,
  };
};
