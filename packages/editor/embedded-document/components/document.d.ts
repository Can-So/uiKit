import { Component } from 'react';
import { EditorProps } from '@atlaskit/editor-core';
import { RendererProps } from '@atlaskit/renderer';
import { Props as BaseProps } from '../context/embedded-document';
import { Mode } from '../context/context';
import { Document as DocumentModel } from '../model';
export interface Props extends BaseProps {
    doc?: DocumentModel;
    isLoading?: boolean;
    hasError?: boolean;
    mode: Mode;
    editorProps?: Partial<EditorProps>;
    rendererProps?: Partial<RendererProps>;
}
export default class Document extends Component<Props> {
    private renderToolbar;
    private renderTitle;
    private renderEditor;
    render(): JSX.Element;
}
