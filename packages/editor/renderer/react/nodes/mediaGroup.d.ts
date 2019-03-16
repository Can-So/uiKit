import * as React from 'react';
import { ReactElement, PureComponent } from 'react';
import { CardEvent } from '@atlaskit/media-card';
import { EventHandlers, CardEventClickHandler } from '@atlaskit/editor-common';
import { Identifier } from '@atlaskit/media-core';
import { MediaProps } from './media';
export interface MediaGroupProps {
    children?: React.ReactNode;
    eventHandlers?: EventHandlers;
}
export interface MediaGroupState {
    animate: boolean;
    offset: number;
}
export default class MediaGroup extends PureComponent<MediaGroupProps, MediaGroupState> {
    state: MediaGroupState;
    private handleSize;
    private handleScroll;
    render(): JSX.Element;
    renderSingleFile(child: ReactElement<MediaProps>): React.ReactElement<MediaProps>;
    renderSingleLink(child: ReactElement<MediaProps>): React.ReactElement<MediaProps>;
    onMediaClick: (cardClickHandler: CardEventClickHandler, child: React.ReactElement<MediaProps>, surroundingItems: Identifier[]) => (event: CardEvent, analyticsEvent?: any) => void;
    cloneFileCard(child: ReactElement<MediaProps>, surroundingItems: Identifier[]): React.ReactElement<MediaProps>;
    renderStrip(): JSX.Element;
    private mapMediaPropsToIdentifier;
}
