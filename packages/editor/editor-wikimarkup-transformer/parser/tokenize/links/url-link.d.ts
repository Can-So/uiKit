import { ContentLink } from './link-parser';
import { Context } from '../index';
import { Node as PMNode, Schema } from 'prosemirror-model';
export declare function urlLinkResolver(link: ContentLink, schema: Schema, context: Context): PMNode[] | undefined;
