import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export interface Props {
    children?: React.ReactNode;
    node: PMNode;
    getPos: () => number;
    view: EditorView;
    selected?: boolean;
}
export default class WrappedInline extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
