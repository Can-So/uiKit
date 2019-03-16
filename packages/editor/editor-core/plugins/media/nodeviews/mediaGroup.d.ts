import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { Context } from '@atlaskit/media-core';
import { EditorAppearance } from '../../../types';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
export declare type MediaGroupProps = {
    forwardRef?: (ref: HTMLElement) => void;
    node: PMNode;
    view: EditorView;
    getPos: () => number;
    selected: number | null;
    disabled?: boolean;
    editorAppearance: EditorAppearance;
};
export interface MediaGroupState {
    viewContext?: Context;
}
export default class MediaGroup extends React.Component<MediaGroupProps, MediaGroupState> {
    private mediaPluginState;
    private mediaNodes;
    state: MediaGroupState;
    constructor(props: MediaGroupProps);
    componentDidMount(): void;
    componentWillReceiveProps(props: MediaGroupProps): void;
    shouldComponentUpdate(nextProps: MediaGroupProps): boolean;
    updateMediaContext(): void;
    setMediaItems: (props: MediaGroupProps) => void;
    renderChildNodes: () => JSX.Element;
    render(): JSX.Element;
}
export declare const ReactMediaGroupNode: (portalProviderAPI: PortalProviderAPI, editorAppearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => (node: PMNode<any>, view: EditorView<any>, getPos: () => number) => NodeView<any>;
