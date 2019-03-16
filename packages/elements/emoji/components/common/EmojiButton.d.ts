/// <reference types="react" />
import { EmojiDescription } from '../../types';
export interface Props {
    emoji: EmojiDescription;
    onSelected?: () => void;
    selectOnHover?: boolean;
}
export declare const EmojiButton: (props: Props) => JSX.Element;
export default EmojiButton;
