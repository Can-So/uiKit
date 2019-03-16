import { EditorView } from 'prosemirror-view';
import { Command } from '../../../types';
import { INPUT_METHOD } from '../../analytics';
export declare const moveRight: () => Command;
export declare const moveLeft: (view: EditorView<any> & {
    cursorWrapper?: any;
}) => Command;
export declare const toggleEm: () => Command;
export declare const toggleEmWithAnalytics: ({ inputMethod, }: {
    inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}) => Command;
export declare const toggleStrike: () => Command;
export declare const toggleStrikeWithAnalytics: ({ inputMethod, }: {
    inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}) => Command;
export declare const toggleStrong: () => Command;
export declare const toggleStrongWithAnalytics: ({ inputMethod, }: {
    inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}) => Command;
export declare const toggleUnderline: () => Command;
export declare const toggleUnderlineWithAnalytics: ({ inputMethod, }: {
    inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}) => Command;
export declare const toggleSuperscript: () => Command;
export declare const toggleSuperscriptWithAnalytics: () => Command;
export declare const toggleSubscript: () => Command;
export declare const toggleSubscriptWithAnalytics: () => Command;
export declare const toggleCode: () => Command;
export declare const toggleCodeWithAnalytics: ({ inputMethod, }: {
    inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR;
}) => Command;
export declare const createInlineCodeFromTextInputWithAnalytics: (from: number, to: number, text: string) => Command;
