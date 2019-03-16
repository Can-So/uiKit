import { PureComponent } from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EmojiProvider } from '@findable/emoji';
export interface Props {
    isReducedSpacing?: boolean;
    isDisabled?: boolean;
    editorView: EditorView;
    pluginKey: PluginKey;
    emojiProvider: Promise<EmojiProvider>;
    /**
     * The number of secondary toolbar buttons between and including ToolbarEmojiPicker and the right edge of the editor
     * This must be passed in by the integrator (e.g. SecondaryToolbar) that contains the buttons
     * TODO: Implement a better solution as part of ED-2565
     */
    numFollowingButtons: number;
    popupsMountPoint?: HTMLElement | undefined;
    popupsBoundariesElement?: HTMLElement | undefined;
    popupsScrollableElement?: HTMLElement | undefined;
}
export interface State {
    button?: HTMLElement;
    disabled?: boolean;
    isOpen: boolean;
}
export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
    private pickerRef?;
    private buttonRef?;
    private pluginState?;
    state: State;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(props: Props): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    handleEscape: (e: KeyboardEvent) => void;
    private setPluginState;
    private handlePluginStateChange;
    private handleButtonRef;
    private onPickerRef;
    private close;
    private toggleOpen;
    private handleClickOutside;
    private renderPopup;
    render(): JSX.Element;
    private handleSelectedEmoji;
}
