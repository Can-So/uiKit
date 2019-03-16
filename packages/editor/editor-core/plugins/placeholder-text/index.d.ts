import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types/editor-plugin';
import { Dispatch } from '../../event-dispatcher';
export declare const pluginKey: PluginKey<any>;
export interface PlaceholderTextOptions {
    allowInserting?: boolean;
}
export interface PluginState {
    showInsertPanelAt: number | null;
    allowInserting: boolean;
}
export declare function createPlugin(dispatch: Dispatch<PluginState>, options: PlaceholderTextOptions): Plugin | undefined;
declare const placeholderTextPlugin: (options: PlaceholderTextOptions) => EditorPlugin;
export default placeholderTextPlugin;
