import { ContentLink } from './link-parser';
import { Schema, Node as PMNode } from 'prosemirror-model';

export function mentionLinkResolver(
  link: ContentLink,
  schema: Schema,
): PMNode[] | undefined {
  if (link.notLinkBody.startsWith('~')) {
    const mentionText = link.notLinkBody.substring(1);

    return [
      schema.nodes.mention.createChecked({
        id: mentionText,
      }),
    ];
  }
}
