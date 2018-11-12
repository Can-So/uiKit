import { ContentLink } from './link-parser';
import { Token } from '../index';
import { Schema } from 'prosemirror-model';

export function mentionLinkResolver(
  link: ContentLink,
  schema: Schema,
): Token | null {
  if (link.notLinkBody.startsWith('~')) {
    const mentionText = link.notLinkBody.substring(1);

    const mentionNode = schema.nodes.mention.createChecked({
      id: mentionText,
    });

    return {
      type: 'pmnode',
      nodes: [mentionNode],
      length: link.originalLinkText.length + 2,
    };
  } else {
    return null;
  }
}
