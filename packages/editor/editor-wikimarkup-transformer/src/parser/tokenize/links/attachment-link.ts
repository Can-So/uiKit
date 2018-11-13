import { ContentLink } from './link-parser';
import getMediaGroupNodeView from '../../nodes/mediaGroup';
import { Schema, Node as PMNode } from 'prosemirror-model';

export function attachmentLinkResolver(
  link: ContentLink,
  schema: Schema,
): PMNode[] | undefined {
  if (link.attachmentName) {
    return [getMediaGroupNodeView(schema, link.attachmentName)];
  }
}
