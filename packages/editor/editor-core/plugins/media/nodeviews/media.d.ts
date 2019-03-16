import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ImageLoaderProps } from '@findable/editor-common';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import { MediaProvider } from '../pm-plugins/main';
import { Context, ImageResizeMode } from '@findable/media-core';
import { CardDimensions, CardEventHandler, CardOnClickCallback } from '@findable/media-card';
import { MediaType, MediaBaseAttributes } from '@findable/adf-schema';
import { ImageStatus } from '@findable/editor-common';
import { EditorAppearance } from '../../../types';
export declare const MEDIA_HEIGHT = 125;
export declare const FILE_WIDTH = 156;
export declare type Appearance = 'small' | 'image' | 'horizontal' | 'square';
export interface MediaNodeProps extends ReactNodeProps, ImageLoaderProps {
    getPos: ProsemirrorGetPosHandler;
    view: EditorView;
    node: PMNode;
    providerFactory?: ProviderFactory;
    cardDimensions: CardDimensions;
    isMediaSingle?: boolean;
    onClick?: CardOnClickCallback;
    onExternalImageLoaded?: (dimensions: {
        width: number;
        height: number;
    }) => void;
    editorAppearance: EditorAppearance;
    mediaProvider?: Promise<MediaProvider>;
    viewContext?: Context;
}
export interface Props extends Partial<MediaBaseAttributes> {
    type: MediaType;
    cardDimensions?: CardDimensions;
    onClick?: CardOnClickCallback;
    onDelete?: CardEventHandler;
    resizeMode?: ImageResizeMode;
    appearance?: Appearance;
    selected?: boolean;
    url?: string;
    imageStatus?: ImageStatus;
    context: Context;
    disableOverlay?: boolean;
    mediaProvider?: Promise<MediaProvider>;
    viewContext?: Context;
}
export interface MediaNodeState {
    viewContext?: Context;
}
declare const _default: React.ComponentClass<MediaNodeProps & ImageLoaderProps, any>;
export default _default;
