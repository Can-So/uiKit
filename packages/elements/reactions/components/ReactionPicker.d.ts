import { EmojiProvider } from '@findable/emoji';
import { PureComponent } from 'react';
import { ReactionSource } from '../types';
export interface Props {
    emojiProvider: Promise<EmojiProvider>;
    onSelection: (emojiId: string, source: ReactionSource) => void;
    miniMode?: boolean;
    boundariesElement?: string;
    className?: string;
    allowAllEmojis?: boolean;
    disabled?: boolean;
    onOpen?: () => void;
    onCancel?: () => void;
    onMore?: () => void;
}
export interface State {
    isOpen: boolean;
    showFullPicker?: boolean;
}
export declare class ReactionPicker extends PureComponent<Props, State> {
    static defaultProps: {
        disabled: boolean;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleClickOutside;
    private close;
    private showFullPicker;
    private renderSelector;
    private renderEmojiPicker;
    private renderContent;
    private onEmojiSelected;
    private onTriggerClick;
    private renderPopup;
    private renderTrigger;
    render(): JSX.Element;
}
