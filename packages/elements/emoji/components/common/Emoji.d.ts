/// <reference types="react" />
import { EmojiDescription, OnEmojiEvent } from '../../types';
export interface Props {
    /**
     * The emoji to render
     */
    emoji: EmojiDescription;
    /**
     * Show the emoji as selected
     */
    selected?: boolean;
    /**
     * Automatically show the emoji as selected based on mouse hover.
     *
     * CSS, fast, does not require a re-render, but selected state not
     * externally controlled via props.
     */
    selectOnHover?: boolean;
    /**
     * Called when an emoji is selected
     */
    onSelected?: OnEmojiEvent;
    /**
     * Called when the mouse moved over the emoji.
     */
    onMouseMove?: OnEmojiEvent;
    /**
     * Called when an emoji is deleted
     */
    onDelete?: OnEmojiEvent;
    /**
     * Callback for if an emoji image fails to load.
     */
    onLoadError?: OnEmojiEvent<HTMLImageElement>;
    /**
     * Additional css classes, if required.
     */
    className?: string;
    /**
     * Show a tooltip on mouse hover.
     */
    showTooltip?: boolean;
    /**
     * Show a delete button on mouse hover
     * Used only for custom emoji
     */
    showDelete?: boolean;
    /**
     * Fits emoji to height in pixels, keeping aspect ratio
     */
    fitToHeight?: number;
}
export declare const Emoji: (props: Props) => JSX.Element;
export default Emoji;
