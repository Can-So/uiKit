import * as React from 'react';
import { ComponentClass } from 'react';
import LoadingEmojiComponent, { Props as LoadingProps, State as LoadingState } from '../common/LoadingEmojiComponent';
import { UploadRefHandler, Props as ComponentProps } from './EmojiUploadComponent';
import { EmojiProvider } from '../../api/EmojiResource';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
export interface Props extends LoadingProps {
    onUploaderRef?: UploadRefHandler;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}
export declare class EmojiUploaderInternal extends LoadingEmojiComponent<Props, LoadingState> {
    static AsyncLoadedComponent?: ComponentClass<ComponentProps>;
    state: {
        asyncLoadedComponent: React.ComponentClass<ComponentProps, any> | undefined;
    };
    constructor(props: Props);
    asyncLoadComponent(): void;
    renderLoaded(loadedEmojiProvider: EmojiProvider, EmojiUploadComponent: ComponentClass<ComponentProps>): JSX.Element;
}
declare const EmojiUploader: typeof EmojiUploaderInternal;
declare type EmojiUploader = EmojiUploaderInternal;
export default EmojiUploader;
