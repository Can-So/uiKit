import { PureComponent } from 'react';
import { EditorProps } from '@findable/editor-core';
import { RendererProps } from '@findable/renderer';
export interface Props {
    editorProps?: Partial<EditorProps>;
    rendererProps?: Partial<RendererProps>;
}
export default class DocumentBody extends PureComponent<Props> {
    private renderChild;
    private stateMapper;
    private renderPropsMapper;
    render(): JSX.Element;
}
