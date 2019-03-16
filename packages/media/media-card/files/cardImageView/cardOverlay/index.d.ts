import * as React from 'react';
import { Component, ReactNode } from 'react';
import { MediaType } from '@atlaskit/media-core';
import { CardAction, CardEventHandler } from '../../../actions';
export interface CardOverlayProps {
    mediaType?: MediaType;
    mediaName?: string;
    subtitle?: string;
    selectable?: boolean;
    selected?: boolean;
    persistent: boolean;
    error?: ReactNode;
    noHover?: boolean;
    onRetry?: () => void;
    actions?: Array<CardAction>;
    icon?: string;
}
export interface CardOverlayState {
    isMenuExpanded: boolean;
}
export declare class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
    static defaultProps: {
        actions: never[];
        mediaName: string;
    };
    constructor(props: CardOverlayProps);
    private readonly wrapperClassNames;
    render(): JSX.Element;
    errorLine(): false | "" | 0 | JSX.Element | null | undefined;
    tickBox(): false | JSX.Element | undefined;
    bottomLeftColumn(): JSX.Element;
    onMenuToggle: (attrs: {
        isOpen: boolean;
    }) => void;
    removeBtnClick(handler: CardEventHandler): (e: React.MouseEvent<HTMLDivElement>) => void;
}
