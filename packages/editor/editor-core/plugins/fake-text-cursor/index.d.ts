import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
export declare const stateKey: PluginKey<any>;
export declare const createPlugin: () => Plugin<any>;
declare const fakeTextCursorPlugin: EditorPlugin;
export default fakeTextCursorPlugin;
