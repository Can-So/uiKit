import { EditorState } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
export declare const appearanceForNodeType: (spec: NodeType<any>) => "inline" | "block" | undefined;
export declare const selectedCardAppearance: (state: EditorState<any>) => false | "inline" | "block" | undefined;
