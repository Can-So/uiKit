/// <reference types="react" />
import { EditorState } from 'prosemirror-state';
import { Direction } from './direction';
import { Side } from './selection';
import { Command } from '../../types';
export declare const arrow: (dir: Direction, endOfTextblock: (dir: string, state?: EditorState<any> | undefined) => boolean) => Command;
export declare const deleteNode: (dir: Direction) => Command;
export declare const setGapCursorAtPos: (position: number, side?: Side) => Command;
export declare const setCursorForTopLevelBlocks: (event: import("react").MouseEvent<any>, editorRef: HTMLElement, posAtCoords: (coords: {
    left: number;
    top: number;
}) => void | {
    pos: number;
    inside: number;
} | null, editorFocused: boolean) => Command;
