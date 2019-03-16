import { Component } from 'react';
import { EmojiDescription } from '../../types';
export interface OnDeleteEmoji {
    (emoji: EmojiDescription): Promise<boolean>;
}
export interface Props {
    emoji: EmojiDescription;
    onDeleteEmoji: OnDeleteEmoji;
    onCloseDelete: () => void;
    errorMessage?: string;
}
export interface State {
    loading: boolean;
    error: boolean;
}
export default class EmojiDeletePreview extends Component<Props, State> {
    constructor(props: Props);
    componentWillUpdate(nextProps: Props): void;
    private onSubmit;
    private onCancel;
    render(): JSX.Element;
}
