/// <reference types="react" />
import { EmojiImageRepresentation } from '../../types';
export interface Props {
    shortName: string;
    size?: number;
    showTooltip?: boolean;
    representation?: EmojiImageRepresentation;
}
declare const EmojiPlaceholder: (props: Props) => JSX.Element;
export default EmojiPlaceholder;
