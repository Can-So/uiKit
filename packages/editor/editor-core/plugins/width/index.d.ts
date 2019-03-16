import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
export declare const pluginKey: PluginKey<any>;
export declare type WidthPluginState = {
    width: number;
    lineLength?: number;
};
export declare function createPlugin(dispatch: Dispatch<WidthPluginState>): Plugin | undefined;
declare const widthPlugin: EditorPlugin;
export default widthPlugin;
