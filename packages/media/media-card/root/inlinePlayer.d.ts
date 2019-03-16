import { Component } from 'react';
import { Context, FileIdentifier, FileState } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { CardDimensions } from '..';
export interface InlinePlayerProps {
    identifier: FileIdentifier;
    context: Context;
    dimensions: CardDimensions;
    selected?: boolean;
    onError?: (error: Error) => void;
    onClick?: () => void;
}
export interface InlinePlayerState {
    fileSrc?: string;
}
export declare const getPreferredVideoArtifact: (fileState: FileState) => "video_640.mp4" | "video_1280.mp4" | "document.pdf" | "audio.mp3" | undefined;
export declare class InlinePlayer extends Component<InlinePlayerProps, InlinePlayerState> {
    subscription?: Subscription;
    state: InlinePlayerState;
    static defaultProps: {
        dimensions: {
            width: number;
            height: number;
        };
    };
    componentDidMount(): Promise<void>;
    unsubscribe: () => void;
    revoke: () => void;
    componentWillUnmount(): void;
    private getStyle;
    render(): JSX.Element;
}
