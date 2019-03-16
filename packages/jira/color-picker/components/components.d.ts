/// <reference types="react" />
import { Color } from '../types';
export interface SelectComponentProps {
    cx: () => string;
    data: Color;
    options: Color[];
    setValue: (option: Color) => void;
    getValue: () => Color[];
    selectProps: {
        label?: string;
        cols?: number;
        checkMarkColor?: string;
        focusedItemIndex: number;
    };
    isFocused: boolean;
    isSelected: boolean;
    innerProps: {};
}
export declare const MenuList: (props: SelectComponentProps) => JSX.Element;
export declare const Option: (props: SelectComponentProps) => JSX.Element;
export declare const DropdownIndicator: () => null;
export declare const Placeholder: () => null;
