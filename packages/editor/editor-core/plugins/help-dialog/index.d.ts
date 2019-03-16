import { Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
export declare const pluginKey: PluginKey<any>;
export declare const openHelpCommand: (tr: Transaction<any>, dispatch?: Function | undefined) => void;
export declare const closeHelpCommand: (tr: Transaction<any>, dispatch: Function) => void;
export declare const stopPropagationCommand: (e: Event) => void;
export declare function createPlugin(dispatch: Function, imageEnabled: boolean): Plugin<any>;
declare const helpDialog: EditorPlugin;
export default helpDialog;
