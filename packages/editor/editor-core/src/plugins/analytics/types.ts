import { Dispatch } from '../../event-dispatcher';

type AEP<Action, ActionSubject, ActionSubjectID, Attributes> = {
  action: Action;
  actionSubject: ActionSubject;
  actionSubjectId?: ActionSubjectID;
  attributes?: Attributes;
};

/* UI events */

type ButtonAEP<ActionSubjectID, Attributes> = AEP<
  'clicked',
  'button',
  ActionSubjectID,
  Attributes
>;

type PickerAEP<ActionSubjectID, Attributes> = AEP<
  'opened',
  'picker',
  ActionSubjectID,
  Attributes
>;

type TypeAheadAEP<ActionSubjectID, Attributes> = AEP<
  'invoked',
  'typeAhead',
  ActionSubjectID,
  Attributes
>;

type EditorStartAEP = AEP<
  'started',
  'editor',
  undefined,
  { platform: 'mobileNative' | 'mobileHybrid' | 'web' }
>;

type EditorStopAEP = AEP<
  'stopped',
  'editor',
  'save' | 'cancel',
  {
    inputMethod: 'toolbar' | 'shortcut';
    documentSize: number;
    nodeCount?: {
      tables: number;
      headings: number;
      lists: number;
      mediaSingles: number;
      mediaGroups: number;
      panels: number;
      extensions: number;
      decisions: number;
      actions: number;
      codeBlocks: number;
    };
  }
>;

type ButtonHelpAEP = ButtonAEP<
  'helpButton',
  { inputMethod: 'shortcut' | 'toolbar' }
>;

type ButtonFeedbackAEP = ButtonAEP<'feedbackButton', undefined>;

type PickerEmojiAEP = PickerAEP<'emojiPicker', { inputMethod: 'toolbar' }>;

type PickerImageAEP = PickerAEP<
  'cloudPicker',
  { inputMethod: 'toolbar' | 'quickInsert' }
>;

type TypeAheadQuickInsertAEP = TypeAheadAEP<
  'quickInsertTypeAhead',
  { inputMethod: 'keyboard' }
>;

type TypeAheadEmojiAEP = TypeAheadAEP<
  'emojiTypeAhead',
  { inputMethod: 'quickInsert' | 'keyboard' }
>;

type TypeAheadLinkAEP = TypeAheadAEP<
  'linkTypeAhead',
  {
    inputMethod: 'toolbar' | 'quickInsert' | 'shortcut';
  }
>;

type TypeAheadMentionAEP = TypeAheadAEP<
  'mentionTypeAhead',
  {
    inputMethod: 'toolbar' | 'quickInsert' | 'keyboard';
  }
>;

type UIEventPayload =
  | EditorStartAEP
  | EditorStopAEP
  | ButtonHelpAEP
  | ButtonFeedbackAEP
  | PickerEmojiAEP
  | PickerImageAEP
  | TypeAheadQuickInsertAEP
  | TypeAheadEmojiAEP
  | TypeAheadLinkAEP
  | TypeAheadMentionAEP;

/** Text input and formatting events */

type FormatAEP<ActionSubjectID, Attributes> = AEP<
  'formatted',
  'text',
  ActionSubjectID,
  Attributes
>;

type SubstituteAEP<ActionSubjectID, Attributes> = AEP<
  'autoSubstituted',
  'text',
  ActionSubjectID,
  Attributes
>;

type FormatBasicAEP = FormatAEP<
  'strong' | 'italic' | 'underline' | 'code' | 'strike',
  {
    inputMethod: 'toolbar' | 'shortcut' | 'autoformatting' | 'floatingToolbar';
  }
>;

type FormatSuperSubAEP = FormatAEP<
  'superscript' | 'subscript',
  {
    inputMethod: 'toolbar';
  }
>;

type FormatIndentationAEP = FormatAEP<
  'indentation',
  {
    inputMethod: 'toolbar' | 'keyboard';
    direction: 'indent' | 'outdent';
    previousIndentationLevel: number;
    newIndentLevel: number;
    indentType: 'paragraph' | 'list' | 'heading' | 'codeBlock';
  }
>;

type FormatHeadingAEP = FormatAEP<
  'heading',
  {
    inputMethod: 'toolbar' | 'shortcut' | 'autoformatting';
    newHeadlineLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
>;

type FormatBlockQuoteAEP = FormatAEP<
  'blockQuote',
  {
    inputMethod: 'toolbar' | 'keyboard' | 'autoformatting' | 'quickInsert';
  }
>;

type FormatClearAEP = FormatAEP<
  'clearFormatting',
  {
    inputMethod: 'toolbar' | 'shortcut';
    formattingCleared: string[];
  }
>;

type FormatColorAEP = FormatAEP<
  'color',
  {
    newColor: string;
    previousColor: string;
  }
>;

type FormatListAEP = FormatAEP<
  'numberedList' | 'bulletedList',
  {
    inputMethod: 'toolbar' | 'keyboard' | 'autoformatting' | 'quickInsert';
  }
>;

type SubstituteProductAEP = SubstituteAEP<
  'productName',
  {
    product: string;
    originalSpelling: string;
  }
>;

type SubstituteSymbolAEP = SubstituteAEP<
  'symbol',
  {
    symbol: 'rightArrow' | 'leftArrow';
  }
>;

type SubstitutePuncAEP = SubstituteAEP<
  'punctuation',
  {
    punctuation: 'emDash' | 'ellipsis' | 'singleQuote' | 'doubleQuote';
  }
>;

type FormatSubstitutionEventPayload =
  | FormatBasicAEP
  | FormatSuperSubAEP
  | FormatIndentationAEP
  | FormatHeadingAEP
  | FormatBlockQuoteAEP
  | FormatClearAEP
  | FormatColorAEP
  | FormatListAEP
  | SubstituteProductAEP
  | SubstituteSymbolAEP
  | SubstitutePuncAEP;

/** Insertion events */

type InsertAEP<ActionSubjectID, Attributes> = AEP<
  'inserted',
  'document',
  ActionSubjectID,
  Attributes
>;

type InsertDividerAEP = InsertAEP<
  'divider',
  {
    inputMethod: 'quickInsert' | 'toolbar' | 'autoformatting';
  }
>;

type InsertPanelAEP = InsertAEP<
  'panel',
  { inputMethod: 'quickInsert' | 'toolbar' }
>;

type InsertCodeBlockAEP = InsertAEP<
  'codeBlock',
  {
    inputMethod: 'quickInsert' | 'toolbar' | 'autoformatting' | 'insertMenu';
  }
>;

type InsertEventPayload =
  | InsertDividerAEP
  | InsertPanelAEP
  | InsertCodeBlockAEP;

export type AnalyticsEventPayload =
  | UIEventPayload
  | FormatSubstitutionEventPayload
  | InsertEventPayload;

export type AnalyticsDispatch = Dispatch<{
  payload: AnalyticsEventPayload;
  channel?: string;
}>;
