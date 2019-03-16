import { PureComponent } from 'react';
import { EmojiDescription, EmojiDescriptionWithVariations, OnToneSelected, ToneSelection } from '../../types';
export interface Props {
    emoji?: EmojiDescription;
    toneEmoji?: EmojiDescriptionWithVariations;
    selectedTone?: ToneSelection;
    onToneSelected?: OnToneSelected;
    uploadEnabled?: boolean;
    onOpenUpload?: () => void;
}
export interface State {
    selectingTone: boolean;
}
export default class EmojiPreview extends PureComponent<Props, State> {
    state: {
        selectingTone: boolean;
    };
    onToneButtonClick: () => void;
    onToneSelected: (toneValue: number) => void;
    onMouseLeave: () => void;
    renderTones(): JSX.Element | null;
    renderEmojiPreview(): JSX.Element | null;
    renderAddOwnEmoji(): JSX.Element | null;
    render(): JSX.Element;
}
