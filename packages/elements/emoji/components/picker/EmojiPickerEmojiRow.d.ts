import { PureComponent } from 'react';
import { EmojiDescription, OnEmojiEvent } from '../../types';
export interface Props {
    emojis: EmojiDescription[];
    title: string;
    showDelete: boolean;
    onSelected?: OnEmojiEvent;
    onMouseMove?: OnEmojiEvent;
    onDelete?: OnEmojiEvent;
}
export default class EmojiPickerEmojiRow extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
