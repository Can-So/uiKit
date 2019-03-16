import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MediaSingleLayout } from '@findable/adf-schema';
import { CardEvent } from '@findable/media-card';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { EventDispatcher } from '../../../event-dispatcher';
import { MediaProvider } from '../types';
import { EditorAppearance } from '../../../types';
import { Context } from '@findable/media-core';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface MediaSingleNodeProps {
    node: PMNode;
    eventDispatcher: EventDispatcher;
    view: EditorView;
    width: number;
    selected: Function;
    getPos: () => number;
    lineLength: number;
    editorAppearance: EditorAppearance;
    mediaProvider?: Promise<MediaProvider>;
}
export interface MediaSingleNodeState {
    width?: number;
    height?: number;
    viewContext?: Context;
}
export default class MediaSingleNode extends Component<MediaSingleNodeProps, MediaSingleNodeState> {
    private mediaPluginState;
    state: {
        height: undefined;
        width: undefined;
        viewContext: undefined;
    };
    constructor(props: MediaSingleNodeProps);
    componentDidMount(): Promise<void>;
    getRemoteDimensions(): Promise<false | {
        id: string;
        height: number;
        width: number;
    }>;
    private onExternalImageLoaded;
    selectMediaSingle: ({ event }: CardEvent) => void;
    updateSize: (width: number | null, layout: MediaSingleLayout) => void;
    render(): JSX.Element;
}
declare class MediaSingleNodeView extends ReactNodeView {
    lastOffsetLeft: number;
    createDomRef(): HTMLElement;
    render(): JSX.Element;
    ignoreMutation(): boolean;
}
export declare const ReactMediaSingleNode: (portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher<any>, editorAppearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => (node: PMNode<any>, view: EditorView<any>, getPos: () => number) => MediaSingleNodeView;
export {};
