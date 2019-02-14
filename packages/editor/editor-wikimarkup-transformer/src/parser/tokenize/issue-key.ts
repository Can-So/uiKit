import { Schema, Node as PMNode } from 'prosemirror-model';
import { Token, TokenParser, Context } from './';

export const ISSUE_KEY_REGEX = /^[A-Z][A-Z]+-[0-9]+/;

export const issueKey: TokenParser = ({ input, position, schema, context }) => {
  const match = input.substring(position).match(ISSUE_KEY_REGEX);

  if (!match) {
    return fallback(input, position);
  }

  const issue: { key: string; url: string } | null = getIssue(
    context,
    match[0],
  );

  /* This scenario happens when consumers (Jira) doesn't provide to us all the
   * issues inside a markup.
   */
  if (!issue) {
    /* TODO: Instead of call the fallback we can throw an error (IssueNotFound)
     * which will be handled by the tokenErrCallback in the parseToken function.
     * This can help us to debug why some issues are not being renderd properly.
     */
    return fallback(input, position);
  }

  return {
    type: 'pmnode',
    nodes: buildInlineCard(schema, issue.url),
    length: match[0].length,
  };
};

const fallback = (input: string, position: number): Token => ({
  type: 'text',
  text: input.substr(position, 1),
  length: 1,
});

const getIssue = (
  context: Context,
  key: string,
): { key: string; url: string } | null =>
  context.inlineCardConversion && context.inlineCardConversion[key]
    ? { key, url: context.inlineCardConversion[key] }
    : null;

const buildInlineCard = (schema: Schema, url: string): PMNode[] => [
  schema.nodes.inlineCard.createChecked({ url }),
];
