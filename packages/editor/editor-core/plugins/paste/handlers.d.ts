import { Slice } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { CommandDispatch, Command } from '../../types';
export declare function handlePasteIntoTaskAndDecision(slice: Slice): (state: EditorState, dispatch: CommandDispatch) => boolean;
export declare function handlePasteAsPlainText(slice: Slice, event: ClipboardEvent): (state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView) => boolean;
export declare function handlePastePreservingMarks(slice: Slice): (state: EditorState, dispatch: (tr: Transaction) => void) => boolean;
export declare function handleMacroAutoConvert(text: string, slice: Slice): Command;
