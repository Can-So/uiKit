import { PureComponent } from 'react';
import { Color as ColorType } from './Status';
export interface Props {
    selectedColor: ColorType;
    text: string;
    onEnter: () => void;
    onColorClick: (value: ColorType) => void;
    onColorHover?: (value: ColorType) => void;
    onTextChanged: (value: string) => void;
    autoFocus?: boolean;
}
export declare class StatusPicker extends PureComponent<Props, any> {
    private fieldTextWrapperKey;
    private colorPaletteKey;
    static defaultProps: {
        autoFocus: boolean;
    };
    render(): JSX.Element;
    private onChange;
    private onKeyPress;
    private handleInputRef;
}
