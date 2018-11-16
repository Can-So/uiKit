import { ContentLink } from './link-parser';
import { TokenErrCallback, TokenType } from '../index';
import { isSafeUrl } from '@atlaskit/editor-common';
import { parseString } from '../../text';
import { hasAnyOfMarks } from '../../utils/text';
import { Node as PMNode, Schema } from 'prosemirror-model';

export function urlLinkResolver(
  link: ContentLink,
  schema: Schema,
  tokenErrCallback?: TokenErrCallback,
): PMNode[] | undefined {
  const output: PMNode[] = [];

  const url = link.notLinkBody;
  const textRepresentation = link.linkBody || link.notLinkBody;

  if (!isSafeUrl(url)) {
    return;
  }

  const ignoreTokenTypes = [
    TokenType.DOUBLE_DASH_SYMBOL,
    TokenType.TRIPLE_DASH_SYMBOL,
    TokenType.QUADRUPLE_DASH_SYMBOL,
    TokenType.LINK_TEXT,
  ];

  const rawContent = parseString(
    textRepresentation.replace(/^mailto:/, ''),
    schema,
    ignoreTokenTypes,
    tokenErrCallback,
  );

  const decoratedContent = rawContent.map(n => {
    const mark = schema.marks.link.create({
      href: url,
    });

    // We don't want to mix `code` mark with others
    if (n.type.name === 'text' && !hasAnyOfMarks(n, ['link', 'code'])) {
      return n.mark([...n.marks, mark]);
    }
    return n;
  });

  output.push(...decoratedContent);
  if (!hasTextNode(rawContent)) {
    const mark = schema.marks.link.create({
      href: url,
    });

    const linkTextNode = schema.text(textRepresentation, [mark]);
    output.push(linkTextNode);
  }

  return output;
}

function hasTextNode(nodes: PMNode[]) {
  return nodes.find(n => {
    return n.type.name === 'text';
  });
}
