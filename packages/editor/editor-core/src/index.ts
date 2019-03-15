// Used in products integration code
export { name, version } from './version-wrapper';
export { default as Editor } from './editor';
export { default as EditorContext } from './ui/EditorContext';
export { default as WithEditorActions } from './ui/WithEditorActions';
export { default as WithHelpTrigger } from './ui/WithHelpTrigger';
export { default as CollapsedEditor } from './ui/CollapsedEditor';
export { default as ToolbarHelp } from './ui/ToolbarHelp';
export { default as ToolbarFeedback } from './ui/ToolbarFeedback';
export { EmojiResource } from '@atlaskit/emoji';
export { MediaProvider, CustomMediaPicker } from './plugins/media';
export { CollabEditProvider } from './plugins/collab-edit';
export { MediaOptions } from './plugins/media';
export {
  AbstractMentionResource,
  MentionProvider,
  MentionResource,
  PresenceProvider,
  PresenceResource,
} from '@atlaskit/mention';
export {
  QuickInsertProvider,
  QuickInsertItem,
} from './plugins/quick-insert/types';

// Used in mobile bridge
export { stateKey as mediaPluginKey } from './plugins/media/pm-plugins/main';
export { mentionPluginKey, MentionPluginState } from './plugins/mentions';
export {
  TextFormattingState,
  pluginKey as textFormattingStateKey,
} from './plugins/text-formatting/pm-plugins/main';
export { textColorPluginKey, TextColorPluginState } from './plugins/text-color';
export { changeColor } from './plugins/text-color/commands/change-color';
export { blockPluginStateKey, BlockTypeState } from './plugins';
export {
  HyperlinkState,
  InsertStatus as HyperlinkInsertStatus,
  stateKey as hyperlinkStateKey,
} from './plugins/hyperlink/pm-plugins/main';
export {
  ListsPluginState as ListsState,
  pluginKey as listsStateKey,
} from './plugins/lists/pm-plugins/main';
export {
  indentList,
  outdentList,
  toggleOrderedList,
  toggleBulletList,
} from './plugins/lists/commands';
export {
  toggleSuperscript,
  toggleSubscript,
  toggleStrike,
  toggleCode,
  toggleUnderline,
  toggleEm,
  toggleStrong,
} from './plugins/text-formatting/commands/text-formatting';
export { insertBlockType, setBlockType } from './plugins/block-type/commands';
export { createTable } from './plugins/table/actions';
export { insertTaskDecision } from './plugins/tasks-and-decisions/commands';
export { EventDispatcher } from './event-dispatcher';
export {
  pluginKey as statusPluginKey,
  StatusState,
  StatusType,
} from './plugins/status/plugin';
export {
  commitStatusPicker,
  setStatusPickerAt,
  updateStatus,
} from './plugins/status/actions';
export { typeAheadPluginKey, TypeAheadPluginState } from './plugins/type-ahead';
export { TypeAheadItem } from './plugins/type-ahead/types';
export { selectItem } from './plugins/type-ahead/commands/select-item';
export {
  insertLink,
  isTextAtPos,
  isLinkAtPos,
  setLinkHref,
  setLinkText,
} from './plugins/hyperlink/commands';

// Used in editor-test-helpers
export { setTextSelection } from './utils';
export { ReactEditorView } from './create-editor';
export { getDefaultPluginsList } from './create-editor/create-plugins-list';
export { Command, EditorPlugin, EditorProps, EditorInstance } from './types';
export { default as EditorActions } from './actions';
export { MacroProvider, MacroAttributes, ExtensionType } from './plugins/macro';
export { CardProvider } from './plugins/card';
export {
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer,
} from './ui/PortalProvider';
