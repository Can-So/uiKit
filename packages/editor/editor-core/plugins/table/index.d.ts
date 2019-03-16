import { EditorPlugin } from '../../types';
import { PluginConfig } from './types';
export declare const HANDLE_WIDTH = 6;
export declare const pluginConfig: (tablesConfig?: boolean | PluginConfig | undefined) => PluginConfig;
declare const tablesPlugin: (options?: boolean | PluginConfig | undefined) => EditorPlugin;
export default tablesPlugin;
