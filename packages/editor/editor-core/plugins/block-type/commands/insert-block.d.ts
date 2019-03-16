import { NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
export declare const insertBlock: (state: EditorState<any>, nodeType: NodeType<any>, nodeName: string, start: number, end: number, attrs?: {
    [key: string]: any;
} | undefined) => Transaction<any> | null;
