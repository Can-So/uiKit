import { ContentLink } from './link-parser';
import { Schema, Node as PMNode } from 'prosemirror-model';
import { Context } from '..';
export declare function issueLinkResolver(link: ContentLink, schema: Schema, context: Context): PMNode[] | undefined;
