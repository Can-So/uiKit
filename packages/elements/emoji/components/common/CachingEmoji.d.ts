import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { EmojiDescription } from '../../types';
import { Props as EmojiProps } from './Emoji';
import { EmojiContext } from './internal-types';
export interface State {
    cachedEmoji?: EmojiDescription;
    invalidImage?: boolean;
}
export interface CachingEmojiProps extends EmojiProps {
    placeholderSize?: number;
}
/**
 * Renders an emoji from a cached image, if required.
 */
export declare const CachingEmoji: (props: CachingEmojiProps) => JSX.Element;
/**
 * Rendering a media emoji image from a cache for media emoji, with different
 * rendering paths depending on caching strategy.
 */
export declare class CachingMediaEmoji extends PureComponent<CachingEmojiProps, State> {
    static contextTypes: {
        emoji: PropTypes.Requireable<any>;
    };
    private mounted;
    context: EmojiContext;
    constructor(props: EmojiProps, context: EmojiContext);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: EmojiProps, nextContext: EmojiContext): void;
    private loadEmoji;
    private handleLoadError;
    render(): JSX.Element;
}
export default CachingEmoji;
