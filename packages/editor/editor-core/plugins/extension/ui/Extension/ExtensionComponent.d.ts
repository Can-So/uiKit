import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { MacroProvider } from '../../../macro';
import { ExtensionHandlers } from '@findable/editor-common';
export interface Props {
    editorView: EditorView;
    macroProvider?: Promise<MacroProvider>;
    node: PMNode;
    handleContentDOMRef: (node: HTMLElement | null) => void;
    extensionHandlers: ExtensionHandlers;
}
export interface State {
    macroProvider?: MacroProvider;
}
export default class ExtensionComponent extends Component<Props, State> {
    state: State;
    mounted: boolean;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    render(): JSX.Element | null;
    private handleMacroProvider;
    private handleSelectExtension;
    private tryExtensionHandler;
    private handleExtension;
}
