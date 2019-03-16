import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiDescription, OnEmojiEvent } from '../../types';
export interface Props {
    onMouseMove: OnEmojiEvent;
    onSelection: OnEmojiEvent;
    selected: boolean;
    emoji: EmojiDescription;
}
export default class EmojiTypeAheadItem extends PureComponent<Props, {}> {
    onEmojiSelected: React.MouseEventHandler<HTMLDivElement>;
    onEmojiMenuItemMouseMove: React.MouseEventHandler<HTMLDivElement>;
    render(): JSX.Element;
}
