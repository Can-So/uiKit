import * as React from 'react';
import { Node, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import EditorActions from '../actions';

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

import { PluginConfig as TablesPluginConfig } from '../plugins/table/pm-plugins/main';
import { MediaProvider, MediaState } from '../plugins/media/pm-plugins/main';
import { ErrorReportingHandler } from '../utils/error-reporter';
import { AnalyticsHandler } from '../analytics';

import { ImageUploadHandler } from '../plugins/image-upload';
import { TextFormattingOptions } from '../plugins/text-formatting';
import { CollabEditProvider } from '../plugins/collab-edit';
import { ExtensionProvider } from '../plugins/macro/types';
import { MediaOptions } from '../plugins/media';
import { PlaceholderTextOptions } from '../plugins/placeholder-text';

export type EditorAppearance =
  | 'message'
  | 'inline-comment'
  | 'comment'
  | 'full-page'
  | 'chromeless'
  | 'mobile'
  | undefined;

export type ReactElement = React.ReactElement<any> | React.ReactElement<any>[];

export type InsertMenuCustomItem = {
  content: string;
  value: { name: string };
  tooltipDescription: string;
  tooltipPosition: string;
  onClick: (editorActions: EditorActions) => void;
};

export interface EditorProps {
  appearance?: EditorAppearance;
  // Legacy analytics support
  analyticsHandler?: AnalyticsHandler;
  // For @atlaskit/analytics support
  delegateAnalyticsEvent?: DelegateAnalyticsEvent;

  contentComponents?: ReactElement;
  primaryToolbarComponents?: ReactElement;
  secondaryToolbarComponents?: ReactElement;
  addonToolbarComponents?: ReactElement;

  allowBlockType?: { exclude?: Array<string> };
  allowMentions?: boolean;
  allowTasksAndDecisions?: boolean;
  allowRule?: boolean;
  allowCodeBlocks?: boolean;
  allowLists?: boolean;
  allowTextColor?: boolean;
  allowTables?: boolean | TablesPluginConfig;
  allowHelpDialog?: boolean;
  allowJiraIssue?: boolean;
  allowUnsupportedContent?: boolean;
  allowPanel?: boolean;
  allowExtension?: boolean;
  allowConfluenceInlineComment?: boolean;
  allowPlaceholderCursor?: boolean;
  allowTemplatePlaceholders?: boolean | PlaceholderTextOptions;
  allowDate?: boolean;

  saveOnEnter?: boolean;
  shouldFocus?: boolean;
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
  extensionProvider?: Promise<ExtensionProvider>;
  waitForMediaUpload?: boolean;
  contentTransformerProvider?: (schema: Schema) => Transformer<string>;

  media?: MediaOptions;
  textFormatting?: TextFormattingOptions;

  maxHeight?: number;
  maxContentSize?: number;
  placeholder?: string;
  defaultValue?: Node | string | Object;

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;

  insertMenuItems?: InsertMenuCustomItem[];
  editorActions?: EditorActions;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
  onCancel?: (editorView: EditorView) => void;

  // TODO: Deprecated remove after v63.0.0
  allowTextFormatting?: boolean | TextFormattingOptions;

  extensionHandlers?: ExtensionHandlers;
}
