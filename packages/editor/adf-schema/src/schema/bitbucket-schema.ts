import { Schema } from 'prosemirror-model';
import { createSchema } from './create-schema';

export const bitbucketSchema: Schema = createSchema({
  nodes: [
    'doc',
    'paragraph',
    'text',
    'bulletList',
    'orderedList',
    'listItem',
    'heading',
    'blockquote',
    'codeBlock',
    'hardBreak',
    'rule',
    'image',
    'media',
    'mediaSingle',
    'mention',
    'emoji',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow',
  ],
  marks: [
    'em',
    'strong',
    'strike',
    'link',
    'mentionQuery',
    'emojiQuery',
    'code',
  ],
});
