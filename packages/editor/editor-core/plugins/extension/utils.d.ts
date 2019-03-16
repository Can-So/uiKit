import { Node as PmNode, Schema } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
declare type ExtensionNode = {
    node: PmNode;
    pos: number;
} | undefined;
export declare const getExtensionNode: (state: EditorState<any>) => ExtensionNode;
export declare const isSelectionNodeExtension: (selection: Selection<any>, schema: Schema<any, any>) => boolean;
export {};
