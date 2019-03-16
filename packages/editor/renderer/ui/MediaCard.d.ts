import * as React from 'react';
import { Component } from 'react';
import { CardAppearance, CardDimensions, CardOnClickCallback } from '@atlaskit/media-card';
import { Context, ImageResizeMode } from '@atlaskit/media-core';
import { MediaType } from '@atlaskit/adf-schema';
import { ImageStatus, ImageLoaderProps } from '@atlaskit/editor-common';
import { RendererAppearance } from './Renderer';
export interface MediaProvider {
    viewContext?: Context;
}
export interface MediaCardProps {
    id?: string;
    mediaProvider?: MediaProvider;
    eventHandlers?: {
        media?: {
            onClick?: CardOnClickCallback;
        };
    };
    type: MediaType;
    collection?: string;
    url?: string;
    cardDimensions?: CardDimensions;
    resizeMode?: ImageResizeMode;
    appearance?: CardAppearance;
    rendererAppearance?: RendererAppearance;
    occurrenceKey?: string;
    imageStatus?: ImageStatus;
    disableOverlay?: boolean;
    useInlinePlayer?: boolean;
}
export interface State {
    context?: Context;
}
export declare class MediaCardInternal extends Component<MediaCardProps, State> {
    state: State;
    componentDidMount(): Promise<void>;
    private renderLoadingCard;
    private renderExternal;
    render(): JSX.Element | null;
}
export declare const MediaCard: React.ComponentClass<MediaCardProps & ImageLoaderProps, any>;
