import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
export declare function createPlugin(eventDispatch: Dispatch, onSave?: (editorView: EditorView) => void): Plugin | undefined;
declare const saveOnEnterPlugin: EditorPlugin;
export default saveOnEnterPlugin;
