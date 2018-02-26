import { createSchema } from './create-schema';
import { Schema } from 'prosemirror-model';

const nodes = [
  'doc',
  'paragraph',
  'blockquote',
  'codeBlock',
  'panel',
  'hardBreak',
  'orderedList',
  'bulletList',
  'heading',
  'mediaGroup',
  'mediaSingle',
  'media',
  'confluenceUnsupportedBlock',
  'confluenceJiraIssue',
  'extension',
  'inlineExtension',
  'bodiedExtension',
  'listItem',
  'mention',
  'text',
  'confluenceUnsupportedInline',
  'media',
  'rule',
  'table',
  'tableCell',
  'tableHeader',
  'tableRow',
  'emoji',
  'taskList',
  'taskItem',
  'date',
  'placeholder',
  'decisionList',
  'decisionItem',
];

const marks = [
  'link',
  'em',
  'strong',
  'strike',
  'subsup',
  'underline',
  'mentionQuery',
  'code',
  'textColor',
  'confluenceInlineComment',
];

export const confluenceSchema: Schema = createSchema({ nodes, marks });
export const confluenceSchemaWithMediaSingle: Schema = createSchema({
  nodes: nodes.concat('mediaSingle'),
  marks,
});
