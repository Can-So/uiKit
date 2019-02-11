import { TrackAEP } from './events';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
} from './enums';

export const enum INDENT_DIR {
  INDENT = 'indent',
  OUTDENT = 'outdent',
}

export const enum INDENT_TYPE {
  PARAGRAPH = 'paragraph',
  LIST = 'list',
  HEADING = 'heading',
  CODE_BLOCK = 'codeBlock',
}

type FormatAEP<ActionSubjectID, Attributes> = TrackAEP<
  ACTION.FORMATTED,
  ACTION_SUBJECT.TEXT,
  ActionSubjectID,
  Attributes
>;

type FormatBasicAEP = FormatAEP<
  | ACTION_SUBJECT_ID.FORMAT_STRONG
  | ACTION_SUBJECT_ID.FORMAT_ITALIC
  | ACTION_SUBJECT_ID.FORMAT_UNDERLINE
  | ACTION_SUBJECT_ID.FORMAT_CODE
  | ACTION_SUBJECT_ID.FORMAT_STRIKE,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.SHORTCUT
      | INPUT_METHOD.FORMATTING
      | INPUT_METHOD.FLOATING_TB;
  }
>;

type FormatSuperSubAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_SUPER | ACTION_SUBJECT_ID.FORMAT_SUB,
  {
    inputMethod: INPUT_METHOD.TOOLBAR;
  }
>;

type FormatIndentationAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_INDENT,
  {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.KEYBOARD;
    direction: INDENT_DIR.INDENT | INDENT_DIR.OUTDENT;
    previousIndentationLevel: number;
    newIndentLevel: number;
    indentType:
      | INDENT_TYPE.PARAGRAPH
      | INDENT_TYPE.LIST
      | INDENT_TYPE.HEADING
      | INDENT_TYPE.CODE_BLOCK;
  }
>;

type FormatHeadingAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_HEADING,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.SHORTCUT
      | INPUT_METHOD.FORMATTING;
    newHeadingLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
>;

type FormatBlockQuoteAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.KEYBOARD
      | INPUT_METHOD.FORMATTING
      | INPUT_METHOD.QUICK_INSERT;
  }
>;

type FormatClearAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_CLEAR,
  {
    inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
    formattingCleared: string[];
  }
>;

type FormatColorAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_COLOR,
  {
    newColor: string;
    previousColor: string;
  }
>;

type FormatListAEP = FormatAEP<
  ACTION_SUBJECT_ID.FORMAT_LIST_NUMBER | ACTION_SUBJECT_ID.FORMAT_LIST_BULLET,
  {
    inputMethod:
      | INPUT_METHOD.TOOLBAR
      | INPUT_METHOD.KEYBOARD
      | INPUT_METHOD.FORMATTING
      | INPUT_METHOD.QUICK_INSERT;
  }
>;

export type FormatEventPayload =
  | FormatBasicAEP
  | FormatSuperSubAEP
  | FormatIndentationAEP
  | FormatHeadingAEP
  | FormatBlockQuoteAEP
  | FormatClearAEP
  | FormatColorAEP
  | FormatListAEP;
