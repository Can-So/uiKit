import { ContentLink } from './link-parser';
import { Token } from '../index';
import getMediaGroupNodeView from '../../nodes/mediaGroup';
import { Schema } from 'prosemirror-model';

export function attachmentLinkResolver(
  link: ContentLink,
  schema: Schema,
): Token | null {
  if (link.attachmentName) {
    const node = getMediaGroupNodeView(schema, link.attachmentName);

    return {
      type: 'pmnode',
      nodes: [node],
      length: link.originalLinkText.length + 2,
    };
  } else {
    return null;
  }
}
