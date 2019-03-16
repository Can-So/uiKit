import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
    providerFactory: ProviderFactory;
}
export default class EmojiNode extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
