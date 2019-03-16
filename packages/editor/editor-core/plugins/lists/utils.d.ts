import { Schema, ResolvedPos, NodeType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
export declare const isWrappingPossible: (nodeType: NodeType<any>, state: EditorState<any>) => boolean;
export declare const getListLiftTarget: (schema: Schema<any, any>, resPos: ResolvedPos<any>) => number;
