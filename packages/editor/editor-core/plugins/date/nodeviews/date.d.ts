import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
export default class DateNodeView extends React.Component<Props> {
    render(): JSX.Element;
    private handleClick;
}
