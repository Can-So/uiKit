import { NodeSpec } from 'prosemirror-model';

// Nodes
import { PanelDefinition as Panel } from './panel';
import { ParagraphDefinition as Paragraph } from './paragraph';
import { BlockQuoteDefinition as Blockquote } from './blockquote';
import { OrderedListDefinition as OrderedList } from './ordered-list';
import { BulletListDefinition as BulletList } from './bullet-list';
import { RuleDefinition as Rule } from './rule';
import { HeadingDefinition as Heading } from './heading';
import { CodeBlockDefinition as CodeBlock } from './code-block';
import { MediaGroupDefinition as MediaGroup } from './media-group';
import { MediaSingleDefinition as MediaSingle } from './media-single';
import { ApplicationCardDefinition as ApplicationCard } from './applicationCard';
import { DecisionListDefinition as DecisionList } from './decision-list';
import { TaskListDefinition as TaskList } from './task-list';
import { TableDefinition as Table } from './tableNodes';
import { ExtensionDefinition as Extension } from './extension';
import { InlineExtensionDefinition as InlineExtension } from './inline-extension';
import { BodiedExtensionDefinition as BodiedExtension } from './bodied-extension';

import { TextDefinition as Text } from './text';
import { HardBreakDefinition as HardBreak } from './hard-break';
import { MentionDefinition as Mention } from './mention';
import { EmojiDefinition as Emoji } from './emoji';
import { DateDefinition as Date } from './date';
import { StatusDefinition as Status } from './status';
import { PlaceholderDefinition as Placeholder } from './placeholder';
import { InlineCardDefinition as InlineCard } from './inline-card';
import { BlockCardDefinition as BlockCard } from './block-card';

// Marks
import { LinkDefinition as Link } from '../marks/link';
import { EmDefinition as Em } from '../marks/em';
import { StrongDefinition as Strong } from '../marks/strong';
import { StrikeDefinition as Strike } from '../marks/strike';
import { CodeDefinition as Code } from '../marks/code';
import { SubSupDefinition as SubSup } from '../marks/subsup';
import { UnderlineDefinition as Underline } from '../marks/underline';
import { TextColorDefinition as TextColor } from '../marks/text-color';
import { ActionDefinition as Action } from '../marks/action';

/**
 * @name top_level_node
 * @minItems 1
 */
export type TopLevel = Array<
  | Panel
  | Paragraph
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | ApplicationCard
  | DecisionList
  | TaskList
  | Table
  | Extension
  | BodiedExtension
  | BlockCard
>;

/**
 * @name table_cell_content
 * @minItems 1
 */
export type TableCellContent = Array<
  | Panel
  | Paragraph
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | ApplicationCard
  | DecisionList
  | TaskList
  | Extension
  | BlockCard
>;

// exclude Extension and BodiedExtension
/**
 * @name extension_content
 * @minItems 1
 */
export type ExtensionContent = Array<
  | Panel
  | Paragraph
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | ApplicationCard
  | DecisionList
  | TaskList
  | Table
  | Extension
  | BlockCard
>;

/**
 * @additionalProperties true
 */
export interface MarksObject<T> {
  marks?: Array<T>;
}

/**
 * @additionalProperties true
 */
export interface NoMark {
  /**
   * @maxItems 0
   */
  marks?: Array<any>;
}

/**
 * @name formatted_text_inline_node
 */
export type InlineFormattedText = Text &
  MarksObject<
    Link | Em | Strong | Strike | SubSup | Underline | TextColor | Action
  >;

/**
 * @name link_text_inline_node
 */
export type InlineLinkText = Text & MarksObject<Link>;

/**
 * @name code_inline_node
 */
export type InlineCode = Text & MarksObject<Code | Link>;

/**
 * @name atomic_inline_node
 */
export type InlineAtomic =
  | HardBreak
  | Mention
  | Emoji
  | InlineExtension
  | Date
  | Placeholder
  | InlineCard
  | Status;

/**
 * @name inline_node
 */
export type Inline = InlineFormattedText | InlineCode | InlineAtomic;

/**
 * @name doc_node
 */
export interface DocNode {
  version: 1;
  type: 'doc';
  content: TopLevel;
}

export const doc: NodeSpec = {
  content: '(block|layoutSection)+',
};
