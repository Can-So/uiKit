import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { EditorPlugin, EditorProps } from '../types';
import {
  basePlugin,
  breakoutPlugin,
  blockTypePlugin,
  clearMarksOnChangeToEmptyDocumentPlugin,
  codeBlockPlugin,
  collabEditPlugin,
  confluenceInlineComment,
  datePlugin,
  emojiPlugin,
  extensionPlugin,
  fakeTextCursorPlugin,
  helpDialogPlugin,
  hyperlinkPlugin,
  imageUploadPlugin,
  insertBlockPlugin,
  isMultilineContentPlugin,
  jiraIssuePlugin,
  layoutPlugin,
  listsPlugin,
  macroPlugin,
  maxContentSizePlugin,
  mediaPlugin,
  mentionsPlugin,
  panelPlugin,
  pastePlugin,
  placeholderPlugin,
  placeholderTextPlugin,
  rulePlugin,
  saveOnEnterPlugin,
  submitEditorPlugin,
  tablesPlugin,
  tasksAndDecisionsPlugin,
  textColorPlugin,
  textFormattingPlugin,
  unsupportedContentPlugin,
  widthPlugin,
  typeAheadPlugin,
  quickInsertPlugin,
  gapCursorPlugin,
  inlineActionPlugin,
  cardPlugin,
  floatingToolbarPlugin,
  statusPlugin,
  gridPlugin,
  alignment,
  editorDisabledPlugin,
  indentationPlugin,
  annotationPlugin,
  compositionPlugin,
  analyticsPlugin,
} from '../plugins';

/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export function getDefaultPluginsList(
  props: EditorProps,
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin[] {
  let defaultPluginList: EditorPlugin[] = [];

  if (props.allowAnalyticsGASV3) {
    defaultPluginList.push(analyticsPlugin(createAnalyticsEvent));
  }

  return defaultPluginList.concat([
    pastePlugin,
    basePlugin,
    blockTypePlugin,
    placeholderPlugin,
    clearMarksOnChangeToEmptyDocumentPlugin,
    hyperlinkPlugin,
    textFormattingPlugin(props.textFormatting || {}),
    widthPlugin,
    typeAheadPlugin,
    unsupportedContentPlugin,
    editorDisabledPlugin,
  ]);
}

/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(
  props: EditorProps,
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
): EditorPlugin[] {
  const plugins = getDefaultPluginsList(props, createAnalyticsEvent);

  if (props.allowBreakout && props.appearance === 'full-page') {
    plugins.push(breakoutPlugin);
  }

  if (props.allowTextAlignment) {
    plugins.push(alignment);
  }

  if (props.allowInlineAction) {
    plugins.push(inlineActionPlugin);
  }

  if (props.allowTextColor) {
    plugins.push(textColorPlugin);
  }

  if (props.allowLists) {
    plugins.push(listsPlugin);
  }

  if (props.allowRule) {
    plugins.push(rulePlugin);
  }

  if (props.media || props.mediaProvider) {
    plugins.push(mediaPlugin(props.media));
  }

  if (props.allowCodeBlocks) {
    const options = props.allowCodeBlocks !== true ? props.allowCodeBlocks : {};
    plugins.push(codeBlockPlugin(options));
  }

  if (props.mentionProvider) {
    plugins.push(mentionsPlugin(createAnalyticsEvent));
  }

  if (props.emojiProvider) {
    plugins.push(emojiPlugin);
  }

  if (props.allowTables) {
    plugins.push(tablesPlugin(props.allowTables));
  }

  if (props.allowTasksAndDecisions || props.taskDecisionProvider) {
    plugins.push(tasksAndDecisionsPlugin);
  }

  if (props.allowHelpDialog) {
    plugins.push(helpDialogPlugin);
  }

  if (props.saveOnEnter) {
    plugins.push(saveOnEnterPlugin);
  }

  if (props.legacyImageUploadProvider) {
    plugins.push(imageUploadPlugin);

    if (!props.media && !props.mediaProvider) {
      plugins.push(
        mediaPlugin({
          allowMediaSingle: { disableLayout: true },
          allowMediaGroup: false,
        }),
      );
    }
  }

  if (props.collabEdit || props.collabEditProvider) {
    plugins.push(collabEditPlugin(props.collabEdit));
  }

  if (props.maxContentSize) {
    plugins.push(maxContentSizePlugin);
  }

  if (props.allowJiraIssue) {
    plugins.push(jiraIssuePlugin);
  }

  if (props.allowPanel) {
    plugins.push(panelPlugin);
  }

  if (props.allowExtension) {
    plugins.push(extensionPlugin);
  }

  if (props.macroProvider) {
    plugins.push(macroPlugin);
  }

  if (props.allowConfluenceInlineComment) {
    plugins.push(confluenceInlineComment);
  }

  if (props.allowDate) {
    plugins.push(datePlugin);
  }

  if (props.allowTemplatePlaceholders) {
    const options =
      props.allowTemplatePlaceholders !== true
        ? props.allowTemplatePlaceholders
        : {};
    plugins.push(placeholderTextPlugin(options));
  }

  if (props.allowLayouts) {
    plugins.push(layoutPlugin);
  }

  if (props.UNSAFE_cards) {
    plugins.push(cardPlugin);
  }

  let statusMenuDisabled = true;
  if (props.allowStatus) {
    statusMenuDisabled =
      typeof props.allowStatus === 'object'
        ? props.allowStatus.menuDisabled
        : false;
    plugins.push(statusPlugin({ menuDisabled: statusMenuDisabled }));
  }

  if (props.allowIndentation) {
    plugins.push(indentationPlugin);
  }

  // UI only plugins
  plugins.push(
    insertBlockPlugin({
      insertMenuItems: props.insertMenuItems,
      horizontalRuleEnabled: props.allowRule,
      nativeStatusSupported: !statusMenuDisabled,
    }),
  );

  if (props.allowConfluenceInlineComment) {
    plugins.push(annotationPlugin);
  }

  plugins.push(gapCursorPlugin);
  plugins.push(gridPlugin);
  plugins.push(submitEditorPlugin);
  plugins.push(fakeTextCursorPlugin);
  plugins.push(floatingToolbarPlugin);

  if (props.appearance !== 'mobile') {
    plugins.push(quickInsertPlugin);
  }

  if (props.appearance === 'mobile') {
    plugins.push(compositionPlugin);
  }

  if (props.appearance === 'message') {
    plugins.push(isMultilineContentPlugin);
  }

  return plugins;
}
