import { PureComponent } from 'react';
import { EmojiDescription, OnEmojiEvent } from '../../types';
export interface Props {
    emojis: EmojiDescription[];
    onEmojiSelected?: OnEmojiEvent;
    loading?: boolean;
}
export interface State {
    selectedIndex: number;
    selectedKey?: string;
}
export default class EmojiTypeAheadList extends PureComponent<Props, State> {
    private lastMousePosition?;
    private scrollable?;
    private items;
    static defaultProps: {
        onEmojiSelected: () => void;
    };
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    componentDidUpdate(): void;
    selectNext: () => void;
    selectPrevious: () => void;
    chooseCurrentSelection: () => void;
    private revealItem;
    private selectIndexNewEmoji;
    private selectIndex;
    private selectByEmojiId;
    private selectIndexOnHover;
    private itemSelected;
    private renderItems;
    private isSelectedEmoji;
    render(): JSX.Element;
    private handleScrollableRef;
}
