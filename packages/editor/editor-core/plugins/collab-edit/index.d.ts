import { EditorPlugin } from '../../types';
import { pluginKey } from './plugin';
import { CollabEditOptions } from './types';
export { CollabProvider, CollabEditProvider } from './provider';
export { CollabEditOptions, pluginKey };
declare const collabEditPlugin: (options?: CollabEditOptions | undefined) => EditorPlugin;
export default collabEditPlugin;
