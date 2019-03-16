import * as React from 'react';
import { ComponentClass } from 'react';
import LoadingEmojiComponent, { Props as LoadingProps, State as LoadingState } from './LoadingEmojiComponent';
import EmojiProvider from '../../api/EmojiResource';
import { Props as ComponentProps, BaseResourcedEmojiProps } from './ResourcedEmojiComponent';
export interface Props extends BaseResourcedEmojiProps, LoadingProps {
}
export default class ResourcedEmoji extends LoadingEmojiComponent<Props, LoadingState> {
    static AsyncLoadedComponent: ComponentClass<ComponentProps>;
    state: {
        asyncLoadedComponent: React.ComponentClass<ComponentProps, any>;
    };
    asyncLoadComponent(): void;
    renderLoading(): JSX.Element;
    renderLoaded(loadedEmojiProvider: EmojiProvider, ResourcedEmojiComponent: ComponentClass<ComponentProps>): JSX.Element;
}
