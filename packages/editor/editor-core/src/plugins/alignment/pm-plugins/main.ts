import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { getActiveAlignment, canApplyAlignment } from '../utils';

export type AlignmentState = 'left' | 'right' | 'center';

export type AlignmentPluginState = {
  align: AlignmentState;
  isEnabled: boolean;
};

export type ActionHandlerParams = {
  dispatch: Dispatch;
  pluginState: AlignmentPluginState;
  tr: Transaction;
  params?: {
    align?: string;
    disabled?: boolean;
  };
};

export function createInitialPluginState(
  editorState: EditorState,
  pluginConfig: AlignmentPluginState,
): AlignmentPluginState {
  return {
    align: getActiveAlignment(editorState) || pluginConfig.align,
    isEnabled: true,
  };
}

export const pluginKey = new PluginKey('alignmentPlugin');

export function createPlugin(dispatch: Dispatch, pluginConfig): Plugin {
  return new Plugin({
    key: pluginKey,
    state: {
      init(config, editorState) {
        return createInitialPluginState(editorState, pluginConfig);
      },
      apply(tr, state: AlignmentPluginState, prevState, nextState) {
        const nextPluginState = getActiveAlignment(nextState);
        const isEnabled = canApplyAlignment(nextState);
        const newState = {
          ...state,
          align: nextPluginState,
          isEnabled,
        };
        if (nextPluginState !== state.align || isEnabled !== state.isEnabled) {
          dispatch(pluginKey, newState);
        }
        return newState;
      },
    },
  });
}
