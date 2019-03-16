import * as React from 'react';
import { Component } from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MacroProvider } from '../../../../macro';
export interface Props {
    node: PmNode;
    macroProvider?: MacroProvider;
    handleContentDOMRef: (node: HTMLElement | null) => void;
    onSelectExtension: (hasBody: boolean) => void;
    children?: React.ReactNode;
    view: EditorView;
}
export default class Extension extends Component<Props, any> {
    private onSelectExtension;
    render(): JSX.Element;
}
