import { ContentLink } from './link-parser';
import { Schema, Node as PMNode } from 'prosemirror-model';
import { Context } from '..';

export function issueLinkResolver(
  link: ContentLink,
  schema: Schema,
  context: Context,
): PMNode[] | undefined {
  const { originalLinkText } = link;

  if (
    context.inlineCardConversion &&
    context.inlineCardConversion[originalLinkText]
  ) {
    const url = context.inlineCardConversion[originalLinkText];

    return [
      schema.nodes.inlineCard.createChecked({
        url: `${url}`,
      }),
    ];
  }
}
