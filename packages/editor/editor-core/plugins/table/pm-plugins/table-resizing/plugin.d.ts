import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { ColumnResizingPlugin } from '../../types';
import { Dispatch } from '../../../../event-dispatcher';
export declare const pluginKey: PluginKey<any>;
export declare function createPlugin(dispatch: Dispatch<ResizeState>, { handleWidth, cellMinWidth, lastColumnResizable, dynamicTextSizing, }?: ColumnResizingPlugin): Plugin<any>;
export declare class ResizeState {
    activeHandle: number;
    dragging: {
        startX: number;
        startWidth: number;
    } | null;
    constructor(activeHandle: number, dragging: {
        startX: number;
        startWidth: number;
    } | null);
    apply(tr: Transaction, state: EditorState): ResizeState;
}
