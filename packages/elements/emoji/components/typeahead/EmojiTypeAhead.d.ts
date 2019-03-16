import * as React from 'react';
import { ComponentClass } from 'react';
import { EmojiProvider } from '../../api/EmojiResource';
import { RelativePosition } from '../../types';
import LoadingEmojiComponent, { Props as LoadingProps, State as LoadingState } from '../common/LoadingEmojiComponent';
import { EmojiTypeAheadBaseProps, Props as ComponentProps } from './EmojiTypeAheadComponent';
export interface Props extends EmojiTypeAheadBaseProps, LoadingProps {
    /** CSS selector, or target HTML element */
    target?: string | HTMLElement;
    position?: RelativePosition;
    zIndex?: number | string;
    offsetX?: number;
    offsetY?: number;
}
export default class EmojiTypeahead extends LoadingEmojiComponent<Props, LoadingState> {
    static AsyncLoadedComponent?: ComponentClass<ComponentProps>;
    state: {
        asyncLoadedComponent: React.ComponentClass<ComponentProps, any> | undefined;
    };
    constructor(props: Props);
    selectNext: () => void;
    selectPrevious: () => void;
    chooseCurrentSelection: () => void;
    count: () => number;
    asyncLoadComponent(): void;
    renderLoaded(loadedEmojiProvider: EmojiProvider, EmojiTypeAheadComponent: ComponentClass<ComponentProps>): JSX.Element | null;
}
