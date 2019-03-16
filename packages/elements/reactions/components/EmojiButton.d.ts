import { EmojiId, EmojiProvider, OnEmojiEvent } from '@findable/emoji';
import { PureComponent } from 'react';
export interface Props {
    emojiId: EmojiId;
    emojiProvider: Promise<EmojiProvider>;
    onClick: OnEmojiEvent;
}
export declare class EmojiButton extends PureComponent<Props, {}> {
    private handleMouseDown;
    render(): JSX.Element;
}
