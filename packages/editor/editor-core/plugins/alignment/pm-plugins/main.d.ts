import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
export declare type AlignmentState = 'start' | 'end' | 'center';
export declare type AlignmentPluginState = {
    align: AlignmentState;
    isEnabled?: boolean;
};
export declare type ActionHandlerParams = {
    dispatch: Dispatch;
    pluginState: AlignmentPluginState;
    tr: Transaction;
    params?: {
        align?: string;
        disabled?: boolean;
    };
};
export declare function createInitialPluginState(editorState: EditorState, pluginConfig: AlignmentPluginState): AlignmentPluginState;
export declare const pluginKey: PluginKey<any>;
export declare function createPlugin(dispatch: Dispatch, pluginConfig: AlignmentPluginState): Plugin;
