import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import { INPUT_METHOD } from '../../analytics';
export declare const createHorizontalRule: (state: EditorState<any>, start: number, end: number, inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR) => import("prosemirror-state").Transaction<any> | null;
export declare function inputRulePlugin(schema: Schema): Plugin | undefined;
export default inputRulePlugin;
