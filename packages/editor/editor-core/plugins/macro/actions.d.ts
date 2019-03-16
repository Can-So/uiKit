import { EditorState } from 'prosemirror-state';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MacroProvider, MacroAttributes } from './types';
import { CommandDispatch } from '../../types';
export declare const insertMacroFromMacroBrowser: (macroProvider: MacroProvider, macroNode?: PmNode<any> | undefined, isEditing?: boolean | undefined) => (state: EditorState<any>, dispatch?: CommandDispatch | undefined) => Promise<boolean>;
export declare const resolveMacro: (macro?: MacroAttributes | undefined, state?: EditorState<any> | undefined, optionalAttrs?: object | undefined) => PmNode<any> | null;
export declare const runMacroAutoConvert: (state: EditorState<any>, text: String) => PmNode<any> | null;
export declare const setMacroProvider: (provider: Promise<MacroProvider>) => (view: EditorView<any>) => Promise<boolean>;
