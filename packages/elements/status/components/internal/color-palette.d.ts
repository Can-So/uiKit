/// <reference types="react" />
import { Color as ColorType } from '../Status';
interface ColorPaletteProps {
    selectedColor?: ColorType;
    onClick: (value: ColorType) => void;
    onHover?: (value: ColorType) => void;
    cols?: number;
    className?: string;
}
declare const _default: ({ cols, onClick, selectedColor, className, onHover, }: ColorPaletteProps) => JSX.Element;
export default _default;
