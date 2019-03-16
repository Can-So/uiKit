import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorAppearance } from '../../../types';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
    providerFactory: ProviderFactory;
    editorAppearance: EditorAppearance;
}
export default class MentionNode extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
