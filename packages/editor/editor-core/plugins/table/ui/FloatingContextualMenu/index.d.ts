/// <reference types="react" />
import { EditorView } from 'prosemirror-view';
import { PluginConfig } from '../../types';
export interface Props {
    editorView: EditorView;
    isOpen: boolean;
    targetCellPosition?: number;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    pluginConfig?: PluginConfig;
}
declare const FloatingContextualMenu: ({ mountPoint, boundariesElement, scrollableElement, editorView, isOpen, targetCellPosition, pluginConfig, }: Props) => JSX.Element | null;
export default FloatingContextualMenu;
