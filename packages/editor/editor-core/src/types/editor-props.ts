import { ReactElement } from 'react';
import { Node, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorActionsOptions } from '../actions/index';

import {
  Transformer,
  ContextIdentifierProvider,
  ExtensionHandlers,
} from '@atlaskit/editor-common';
import { ActivityProvider } from '@atlaskit/activity';
import { DelegateAnalyticsEvent } from '@atlaskit/analytics';
import { MentionProvider } from '@atlaskit/mention';
import { EmojiProvider } from '@atlaskit/emoji';
import { TaskDecisionProvider } from '@atlaskit/task-decision';

import { PluginConfig as TablesPluginConfig } from '../plugins/table/types';
import { TextColorPluginConfig } from '../plugins/text-color/pm-plugins/main';
import { MediaProvider, MediaState } from '../plugins/media/types';
import { ErrorReportingHandler } from '../utils/error-reporter';
import { AnalyticsHandler } from '../analytics/handler';

import { ImageUploadHandler } from '../plugins/image-upload/pm-plugins/main';
import { TextFormattingOptions } from '../plugins/text-formatting';
import { CollabEditProvider } from '../plugins/collab-edit/provider';
import { MacroProvider } from '../plugins/macro/types';
import { MediaOptions } from '../plugins/media';
import { PlaceholderTextOptions } from '../plugins/placeholder-text';
import { CollabEditOptions } from '../plugins/collab-edit/types';
import { CodeBlockOptions } from '../plugins/code-block';
import { CardProvider, CardOptions } from '../plugins/card/types';
import { QuickInsertOptions } from '../plugins/quick-insert/types';

export type EditorAppearance =
  | 'message'
  | 'inline-comment'
  | 'comment'
  | 'full-page'
  | 'chromeless'
  | 'mobile';

export type ReactComponents = ReactElement<any> | ReactElement<any>[];

export type InsertMenuCustomItem = {
  content: string;
  value: { name: string | null };
  tooltipDescription?: string;
  tooltipPosition?: string;
  elemBefore?: ReactComponents | string;
  elemAfter?: ReactComponents | string;
  isDisabled?: boolean;
  className?: string;
  onClick?: (editorActions: EditorActionsOptions) => void;
};

export interface ExtensionConfig {
  stickToolbarToBottom?: boolean;
  allowBreakout?: boolean;
}

export interface EditorProps {
  /*
  Configure the display mode of the editor. Different modes may have different feature sets supported.

  - `message` - editor which was used for Stride has now been deprecated.
  - `inline-comment` - should be used for inline comments, no toolbar is displayed
  - `comment` - should be used for things like comments where you have a field input but require a toolbar & save/cancel buttons
  - `full-page` - should be used for a full page editor where it is the user focus of the page
  - `chromeless` - is essentially the `comment` editor but without the editor chrome, like toolbar & save/cancel buttons
  - `mobile` - should be used for the mobile web view. It is a full page editor version for mobile.
  */
  appearance?: EditorAppearance;

  // Legacy analytics support handler, which will be removed soon. **Do not use**.
  analyticsHandler?: AnalyticsHandler;

  // For `@atlaskit/analytics` support
  delegateAnalyticsEvent?: DelegateAnalyticsEvent;

  contentComponents?: ReactComponents;
  primaryToolbarComponents?: ReactComponents;
  secondaryToolbarComponents?: ReactComponents;
  addonToolbarComponents?: ReactComponents;

  // Configure allowed blocks in the editor, currently only supports `heading`, `blockquote` and `hardBreak`.
  allowBlockType?: { exclude?: Array<string> };

  // Whether or not you want to allow Action and Decision elements in the editor. You can currently only enable both or disable both.
  // To enable, you need to also provide a `taskDecisionProvider`. You will most likely need backend ADF storage for this feature.
  allowTasksAndDecisions?: boolean;

  // Enables horizontal rules.
  allowRule?: boolean;

  // Enables code blocks. This is different to inline code, it is a block element and support languages.
  allowCodeBlocks?: boolean | CodeBlockOptions;

  // Enables bullet and numbered lists.
  allowLists?: boolean;

  // Enables text colour. Ew are you sure you want to enable this?
  allowTextColor?: boolean | TextColorPluginConfig;

  // Enables tables. You can enable individual table features like table header rows and cell background colour.
  // You will most likely need backend ADF storage for the advanced table features.
  allowTables?: boolean | TablesPluginConfig;

  // Enable the editor help dialog.
  allowHelpDialog?: boolean;

  // This is a temporary setting for Confluence until we ship smart cards. **Please do not use.**
  allowJiraIssue?: boolean;

  // Set this to allow unsupported content in the editor.
  // Anything it doesn’t understand it will wrap in an unsupported block or inline node.
  // It will render a grey non editable box.
  allowUnsupportedContent?: boolean;

  // Enable panel blocks, the thing that displays a coloured box with icons aka info, warning macros.
  // You will most likely need backend ADF storage for this feature.
  allowPanel?: boolean;

  // Enable extensions. Extensions let products and the ecosystem extend ADF and render their own things.
  // Similar to macros in Confluence. You will most likely need backend ADF storage for this feature.
  allowExtension?: boolean | ExtensionConfig;

  allowConfluenceInlineComment?: boolean;
  allowPlaceholderCursor?: boolean;

  // Enable placeholder text which is handy for things like a template editor.
  // Placeholder text is an inline text element that is removed when a user clicks on it.
  // You can also disable the inserts for this feature so users can never insert such placeholder
  // elements in the editor but you could load the initial content in the editor with them.
  allowTemplatePlaceholders?: boolean | PlaceholderTextOptions;

  // Enable dates. You will most likely need backend ADF storage for this feature.
  allowDate?: boolean;
  allowGapCursor?: boolean;
  allowInlineAction?: boolean;

  // Temporary flag to enable layouts while it's under development
  allowLayouts?: boolean;

  // Enable status.
  allowStatus?: boolean;

  allowDynamicTextSizing?: boolean;

  // Set to enable the quick insert menu i.e. '/' key trigger.
  // You can also provide your own insert menu options that will be shown in addition to the enabled
  // editor features e.g. Confluence uses this to provide its macros.
  quickInsert?: QuickInsertOptions;

  UNSAFE_cards?: CardOptions;

  // Submits on the enter key. Probably useful for an inline comment editor use case.
  saveOnEnter?: boolean;

  // Set if the editor should be focused.
  shouldFocus?: boolean;

  // Set if the editor should be disabled.
  disabled?: boolean;

  errorReporterHandler?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;

  activityProvider?: Promise<ActivityProvider>;
  collabEditProvider?: Promise<CollabEditProvider>;
  presenceProvider?: Promise<any>;
  emojiProvider?: Promise<EmojiProvider>;
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>;

  legacyImageUploadProvider?: Promise<ImageUploadHandler>;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;

  // This is temporary for Confluence. **Please do not use**.
  macroProvider?: Promise<MacroProvider>;
  cardProvider?: Promise<CardProvider>;

  // Set if you want to wait for media file uploads before save.
  waitForMediaUpload?: boolean;
  contentTransformerProvider?: (schema: Schema) => Transformer<string>;

  // Set to configure media features. Media single refers to the embedded version of media,
  // which is probably what you want. Media group refers to a filmstrip, thumbnail view of media files which was used in Stride.
  media?: MediaOptions;
  collabEdit?: CollabEditOptions;

  // Set to disable text formatting styles. If not specified, they will be all enabled by default. Code here refers to inline code.
  // Smart text completion refers to the auto replacement of characters like arrows, quotes and correct casing of Atlassian product names.
  // This should only be disabled if the user has an OS setting that disables this.
  textFormatting?: TextFormattingOptions;

  // Set to configure the maximum editor height in pixels for `comment`, `chromeless` and `mobile` editor modes.
  maxHeight?: number;

  // Set to configure the maximum ADF node document size.
  // Understandably this isn’t the best logical max parameter for content, but its the cheapest for now.
  maxContentSize?: number;

  // Default placeholder text to be displayed if the content is empty. e.g. 'Add a comment...'
  placeholder?: string;

  // Set the default editor content.
  defaultValue?: Node | string | Object;

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;

  // Set to add custom menu items to the insert (plus) menu dropdown.
  insertMenuItems?: InsertMenuCustomItem[];
  editorActions?: EditorActionsOptions;

  // Set for an on change callback.
  onChange?: (editorView: EditorView) => void;

  // Set for an on save callback.
  onSave?: (editorView: EditorView) => void;

  // Set for an on cancel callback.
  onCancel?: (editorView: EditorView) => void;

  // Set to provide your extensions handlers.
  extensionHandlers?: ExtensionHandlers;
}
