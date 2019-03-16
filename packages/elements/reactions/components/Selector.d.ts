import { EmojiId, EmojiProvider, OnEmojiEvent } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
export interface Props {
    emojiProvider: Promise<EmojiProvider>;
    onSelection: OnEmojiEvent;
    showMore?: boolean;
    onMoreClick: React.MouseEventHandler<HTMLElement>;
}
export declare const revealStyle: string;
export declare const defaultReactions: EmojiId[];
export declare const defaultReactionsByShortName: Map<string, EmojiId>;
export declare const isDefaultReaction: (emojiId: EmojiId) => boolean;
export interface State {
    selection: EmojiId | undefined;
}
export declare class Selector extends PureComponent<Props, State> {
    private timeouts;
    constructor(props: Props);
    componentWillUnmount(): void;
    private onEmojiSelected;
    private renderEmoji;
    private renderShowMore;
    render(): JSX.Element;
}
