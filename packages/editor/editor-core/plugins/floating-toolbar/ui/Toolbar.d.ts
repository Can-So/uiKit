import { Component } from 'react';
import { FloatingToolbarItem } from '../types';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';
export interface Props {
    items: Array<FloatingToolbarItem<Function>>;
    dispatchCommand: (command?: Function) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    providerFactory?: ProviderFactory;
    className?: string;
    focusEditor?: () => void;
    editorView?: EditorView;
}
export default class Toolbar extends Component<Props> {
    render(): JSX.Element | null;
    shouldComponentUpdate(nextProps: Props): boolean;
}
