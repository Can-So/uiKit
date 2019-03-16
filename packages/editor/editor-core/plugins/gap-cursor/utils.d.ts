import { Node as PMNode, ResolvedPos, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export declare const isIgnored: (node?: PMNode<any> | null | undefined) => boolean;
export declare const isValidTargetNode: (node?: PMNode<any> | null | undefined) => boolean;
export declare const isTextBlockNearPos: (doc: PMNode<any>, schema: Schema<any, any>, $pos: ResolvedPos<any>, dir: number) => boolean;
export declare const fixCursorAlignment: (view: EditorView<any>) => void;
export declare const isIgnoredClick: (elem: HTMLElement) => boolean | null;
