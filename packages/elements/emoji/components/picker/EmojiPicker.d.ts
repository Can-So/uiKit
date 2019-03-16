import { FireAnalyticsEvent } from '@atlaskit/analytics';
import * as React from 'react';
import { ComponentClass } from 'react';
import { EmojiProvider } from '../../api/EmojiResource';
import { OnEmojiEvent } from '../../types';
import LoadingEmojiComponent, { Props as LoadingProps, State as LoadingState } from '../common/LoadingEmojiComponent';
import { PickerRefHandler, Props as ComponentProps } from './EmojiPickerComponent';
export interface Props extends LoadingProps {
    onSelection?: OnEmojiEvent;
    onPickerRef?: PickerRefHandler;
    hideToneSelector?: boolean;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}
export declare class EmojiPickerInternal extends LoadingEmojiComponent<Props, LoadingState> {
    static AsyncLoadedComponent?: ComponentClass<ComponentProps>;
    state: {
        asyncLoadedComponent: React.ComponentClass<ComponentProps, any> | undefined;
    };
    constructor(props: Props);
    asyncLoadComponent(): void;
    renderLoading(): JSX.Element | null;
    renderLoaded(loadedEmojiProvider: EmojiProvider, EmojiPickerComponent: ComponentClass<ComponentProps>): JSX.Element;
}
declare const EmojiPicker: typeof EmojiPickerInternal;
declare type EmojiPicker = EmojiPickerInternal;
export default EmojiPicker;
