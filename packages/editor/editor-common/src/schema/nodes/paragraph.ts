import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';
import { Inline, MarksObject, NoMark } from './doc';
import { AlignmentMarkDefinition } from '..';

/**
 * @name paragraph_node
 */
export interface ParagraphBaseDefinition {
  type: 'paragraph';
  /**
   * @allowUnsupportedInline true
   */
  content?: Array<Inline>;
  marks?: Array<any>;
}

/**
 * @name paragraph_with_no_marks_node
 */
export type ParagraphDefinition = ParagraphBaseDefinition & NoMark;

/**
 * @name paragraph_with_marks_node
 * @stage 0
 */
export type ParagraphWithMarksDefinition = ParagraphBaseDefinition &
  MarksObject<AlignmentMarkDefinition>;

const pDOM: DOMOutputSpec = ['p', 0];
export const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  marks:
    'strong code em link strike subsup textColor typeAheadQuery underline mentionQuery emojiQuery confluenceInlineComment action',
  parseDOM: [{ tag: 'p' }],
  toDOM() {
    return pDOM;
  },
};
