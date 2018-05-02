// Useful Exports

export { name, version } from './version';

export { default as Editor, EditorWithAnalytics } from './editor';
export { default as getPropsPreset } from './create-editor/get-props-preset';

export { default as EditorContext } from './ui/EditorContext';
export { default as WithEditorActions } from './ui/WithEditorActions';
export { default as WithHelpTrigger } from './ui/WithHelpTrigger';
export { default as CollapsedEditor } from './ui/CollapsedEditor';
export { default as ToolbarHelp } from './ui/ToolbarHelp';
export { default as ToolbarFeedback } from './ui/ToolbarFeedback';
export { default as WithPluginState } from './ui/WithPluginState';

export {
  ErrorReporter,
  ErrorReportingHandler,
  JSONDocNode,
  JSONNode,
  toJSON,
  filterContentByType,
  setTextSelection,
  setGapCursorSelection,
} from './utils';

// Plugin Keys for WithPluginState

export { stateKey as mediaPluginKey } from './plugins/media/pm-plugins/main';
export { mentionPluginKey } from './plugins/mentions/pm-plugins/main';
export { MentionsState } from './plugins/mentions/pm-plugins/main';
export {
  TextFormattingState,
  stateKey as textFormattingStateKey,
} from './plugins/text-formatting/pm-plugins/main';

// Used in editor-test-helpers

export { keyCodes } from './keymaps';
export { ReactEditorView } from './create-editor';
export { getDefaultPluginsList } from './create-editor/create-plugins-list';
export { EditorPlugin, EditorProps, EditorInstance } from './types';
export { default as EditorActions } from './actions';

// Useless exports

export {
  createJIRASchema,
  ProviderFactory,
  WithProviders,
} from '@atlaskit/editor-common';
export { MacroProvider, MacroAttributes, ExtensionType } from './plugins/macro';

export { CollabEditProvider } from './plugins/collab-edit';

export {
  EmojiProvider,
  AtlassianEmojiMigrationResource as EmojiResource,
} from '@atlaskit/emoji';

export {
  DefaultMediaStateManager,
  MediaStateManager,
  MediaProvider,
  MediaState,
  CustomMediaPicker,
} from './plugins/media';

export { MediaOptions } from './plugins/media';

export {
  AbstractMentionResource,
  MentionProvider,
  MentionResource,
  PresenceProvider,
  PresenceResource,
  MentionsResult,
} from '@atlaskit/mention';

export * from './analytics'; // ?

export {
  default as pickerFacadeLoader,
} from './plugins/media/picker-facade-loader';

export {
  PluginConfig as TablePluginConfig,
} from './plugins/table/pm-plugins/main';
