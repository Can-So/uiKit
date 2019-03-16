import { EditorState } from 'prosemirror-state';
export declare const isSelectionEntirelyInsideCodeBlock: (state: EditorState<any>) => boolean;
export declare const isCursorInsideCodeBlock: (state: EditorState<any>) => boolean;
export declare const getStartOfCurrentLine: (state: EditorState<any>) => {
    text: string;
    pos: number;
};
export declare const getEndOfCurrentLine: (state: EditorState<any>) => {
    text: string;
    pos: number;
};
export declare function getLinesFromSelection(state: EditorState): {
    text: string;
    start: number;
    end: number;
};
export declare const forEachLine: (text: string, callback: (line: string, offset: number) => void) => void;
export declare const getLineInfo: (line: string) => {
    indentToken: {
        token: string;
        size: number;
        regex: RegExp;
    };
    indentText: string;
};
