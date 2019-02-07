export default {
  plugins: [
    'compositionPlugin',
    'inlineCursorTargetPlugin',
    'focusHandlerPlugin',
    'submitEditor',
    'newlinePreserveMarksPlugin',
    'imageUpload',
    'imageUploadInputRule',
    'paste',
    'pasteKeymap',
    'mention',
    'mentionInputRule',
    'mentionKeymap',
    'emoji',
    'placeholderText',
    'emojiInputRule',
    'emojiKeymap',
    'emojiAsciiInputRule',
    'blockType',
    'quickInsert',
    'tasksAndDecisions',
    'blockTypeInputRule',
    'tasksAndDecisionsInputRule',
    'typeAhead',
    'typeAheadKeymap',
    'typeAheadInputRule',
    // This should be always after `typeAheadKeymap` & `emojiKeymap`
    'indentationKeymap',
    'lists',
    'textColor',
    'alignmentPlugin',
    'listsInputRule',
    'listsKeymap',
    'codeBlock',
    'codeBlockIDEKeyBindings',
    'codeBlockKeyMap',
    'textFormatting',
    'textFormattingCursor',
    'textFormattingInputRule',
    'textFormattingSmartRule',
    'textFormattingClear',
    'textFormattingKeymap',
    'gapCursorKeymap',
    'gapCursor',
    'syncUrlText',
    'fakeCursorToolbarPlugin',
    'hyperLink',
    'table',
    'tableKeymap',
    'hyperlinkInputRule',
    'tablePMColResizing',
    'hyperlinkKeymap',
    'tableColResizing',
    'blockTypeKeyMap',
    'tableEditing',
    'filterStepsPlugin',
    'pmCollab',
    'collab',
    'ruleInputRule',
    'ruleKeymap',
    'panel',
    'media',
    'mediaKeymap',
    'mediaSingleKeymap',
    'unsupportedContent',
    'jiraIssue',
    'fakeTextCursor',
    'helpDialog',
    'helpDialogKeymap',
    'macro',
    'extension',
    'layout',
    'date',
    'dateKeymap',
    'floatingToolbar',
    'clearMarksOnChange',
    'saveOnEnter',
    'reactNodeView',
    'tasksAndDecisionsKeyMap',
    'history',
    'codeBlockIndent',
    'placeholder',
    'width',
    'maxContentSize',
    'multilineContent',
    'grid',
  ],
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
    'rule',
    'panel',
    'mention',
    'confluenceUnsupportedBlock',
    'confluenceUnsupportedInline',
    'unsupportedBlock',
    'unsupportedInline',
    'confluenceJiraIssue',
    'hardBreak',
    'emoji',
    'placeholder',
    'mediaGroup',
    'table',
    'mediaSingle',
    'media',
    'tableHeader',
    'decisionList',
    'tableRow',
    'decisionItem',
    'tableCell',
    'taskList',
    'taskItem',
    'extension',
    'bodiedExtension',
    'inlineExtension',
    'date',
    'layoutSection',
    'layoutColumn',
    'inlineCard',
    'blockCard',
  ],
  marks: [
    // Inline marks
    'link',
    'confluenceInlineComment',
    'em',
    'strong',
    'strike',
    'action',
    'subsup',
    'underline',
    'code',
    'typeAheadQuery',
    'emojiQuery',
    'textColor',

    // Block marks
    'alignment',
    'breakout',
    'indentation',
    'annotation',
  ],
};
