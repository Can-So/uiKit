import * as React from 'react';
import { PureComponent } from 'react';
import { Color as ColorType } from '../Status';
export interface ColorProps {
    value: ColorType;
    tabIndex?: number;
    isSelected?: boolean;
    onClick: (value: ColorType) => void;
    onHover?: (value: ColorType) => void;
    backgroundColor: string;
    borderColor: string;
}
export default class Color extends PureComponent<ColorProps> {
    private hoverStartTime;
    render(): JSX.Element;
    componentWillUnmount(): void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: React.MouseEventHandler<HTMLButtonElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
