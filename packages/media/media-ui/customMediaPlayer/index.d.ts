import * as React from 'react';
import { Component } from 'react';
import { SetVolumeFunction, NavigateFunction, VideoState, VideoActions } from 'react-video-renderer';
import { InjectedIntlProps } from 'react-intl';
export interface CustomMediaPlayerProps {
    readonly type: 'audio' | 'video';
    readonly src: string;
    readonly isHDActive?: boolean;
    readonly onHDToggleClick?: () => void;
    readonly isHDAvailable?: boolean;
    readonly showControls?: () => void;
    readonly isAutoPlay: boolean;
    readonly isShortcutEnabled?: boolean;
}
export interface CustomMediaPlayerState {
    isFullScreenEnabled: boolean;
}
export declare type ToggleButtonAction = () => void;
export declare class CustomMediaPlayer extends Component<CustomMediaPlayerProps & InjectedIntlProps, CustomMediaPlayerState> {
    videoWrapperRef?: HTMLElement;
    state: CustomMediaPlayerState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onFullScreenChange: () => void;
    onTimeChange: (navigate: NavigateFunction) => (value: number) => void;
    onVolumeChange: (setVolume: SetVolumeFunction) => (value: number) => void;
    shortcutHandler: (toggleButtonAction: ToggleButtonAction) => () => void;
    renderHDButton: () => JSX.Element | undefined;
    renderVolume: ({ isMuted, volume }: VideoState, actions: VideoActions) => JSX.Element;
    onFullScreenClick: () => void;
    saveVideoWrapperRef: (el?: HTMLElement | undefined) => HTMLElement | undefined;
    renderFullScreenButton: () => JSX.Element | undefined;
    renderSpinner: () => JSX.Element;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<CustomMediaPlayerProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<CustomMediaPlayerProps & InjectedIntlProps>;
};
export default _default;
