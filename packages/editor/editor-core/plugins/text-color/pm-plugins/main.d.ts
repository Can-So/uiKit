import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
export declare type TextColorPluginState = {
    palette: Map<string, string>;
    borderColorPalette: {
        [name: string]: string;
    };
    defaultColor: string;
    disabled?: boolean;
    color: string | null;
};
export declare type ActionHandlerParams = {
    dispatch: Dispatch;
    pluginState: TextColorPluginState;
    tr: Transaction;
    params?: {
        color?: string;
        disabled?: boolean;
    };
};
export declare type TextColorDefaultColor = {
    color: string;
    label: string;
};
export interface TextColorPluginConfig {
    defaultColor: TextColorDefaultColor;
}
export declare const DEFAULT_COLOR: {
    color: string;
    label: string;
};
export declare function createInitialPluginState(editorState: EditorState, pluginConfig?: TextColorPluginConfig): TextColorPluginState;
export declare enum ACTIONS {
    RESET_COLOR = 0,
    SET_COLOR = 1,
    DISABLE = 2
}
export declare const pluginKey: PluginKey<any>;
export declare function createPlugin(dispatch: Dispatch, pluginConfig?: TextColorPluginConfig): Plugin;
