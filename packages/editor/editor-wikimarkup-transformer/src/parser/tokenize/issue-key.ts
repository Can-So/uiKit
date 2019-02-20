import { Schema, Node as PMNode } from 'prosemirror-model';
import { Token, TokenParser, Context, InlineCardConversion } from './';

interface Issue {
  key: string;
  url: string;
}

export const issueKey: TokenParser = ({ input, position, schema, context }) => {
  // This scenario happens when context is empty
  if (!context.issueKeyRegex) {
    return fallback(input, position);
  }

  const match = input.substring(position).match(context.issueKeyRegex);

  if (!match) {
    return fallback(input, position);
  }

  const issue: Issue | null = getIssue(context, match[0]);

  // This scenario happens when context doesn't has all the issues inside a markup
  if (!issue) {
    return fallback(input, position);
  }

  return {
    type: 'pmnode',
    nodes: buildInlineCard(schema, issue),
    length: match[0].length,
  };
};

const fallback = (input: string, position: number): Token => ({
  type: 'text',
  text: input.substr(position, 1),
  length: 1,
});

const getIssue = (context: Context, key: string): Issue | null =>
  context.inlineCardConversion && context.inlineCardConversion[key]
    ? { key, url: context.inlineCardConversion[key] }
    : null;

const buildInlineCard = (schema: Schema, issue: Issue): PMNode[] => [
  schema.nodes.inlineCard.createChecked({
    url: `${issue.url}#icft=${issue.key}`,
  }),
];

export const buildIssueKeyRegex = (
  inlineCardConversion?: InlineCardConversion,
): RegExp | undefined => {
  if (!inlineCardConversion) {
    return undefined;
  }

  const pattern: string = Object.keys(inlineCardConversion).join('|');

  return new RegExp(`^(${pattern})`, 'g');
};
