import { ContentLink } from './link-parser';
import { Token, Context } from '../index';
import { Schema } from 'prosemirror-model';
export declare function resolveLink(link: ContentLink, schema: Schema, context: Context): Token;
