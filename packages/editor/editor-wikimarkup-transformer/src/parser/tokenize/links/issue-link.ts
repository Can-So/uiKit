import { ContentLink } from './link-parser';
import { Schema, Node as PMNode } from 'prosemirror-model';

export function issueLinkResolver(
  link: ContentLink,
  schema: Schema,
): PMNode[] | undefined {
  // TODO: check if the link content is inside context
  if (link.linkBody === 'smart-link') {
    return [
      schema.nodes.inlineCard.createChecked({
        url: `${link.notLinkBody}`,
      }),
    ];
  }
}
