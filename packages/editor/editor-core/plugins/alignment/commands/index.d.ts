import { Command, CommandDispatch } from '../../../types/command';
import { EditorState } from 'prosemirror-state';
/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
export declare const cascadeCommands: (cmds: Command[]) => (state: EditorState<any>, dispatch?: CommandDispatch | undefined) => boolean;
export declare const isAlignable: (align?: "center" | "end" | "start" | undefined) => Command;
export declare const changeAlignment: (align?: "center" | "end" | "start" | undefined) => Command;
