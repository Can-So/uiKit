import * as PropTypes from 'prop-types';
import { Component } from 'react';
import EmojiProvider from '../../api/EmojiResource';
import { EmojiId, OptionalEmojiDescription } from '../../types';
import { EmojiContext } from './internal-types';
import { State as LoadingState } from './LoadingEmojiComponent';
export interface BaseResourcedEmojiProps {
    emojiId: EmojiId;
    showTooltip?: boolean;
    fitToHeight?: number;
}
export interface Props extends BaseResourcedEmojiProps {
    emojiProvider: EmojiProvider;
}
export interface State extends LoadingState {
    emoji: OptionalEmojiDescription;
    loaded: boolean;
}
export default class ResourcedEmojiComponent extends Component<Props, State> {
    static childContextTypes: {
        emoji: PropTypes.Requireable<any>;
    };
    private ready;
    constructor(props: Props);
    getChildContext(): EmojiContext;
    private refreshEmoji;
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    render(): JSX.Element;
    private emojiWrapper;
}
