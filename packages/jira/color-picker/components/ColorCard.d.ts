import * as React from 'react';
import { PureComponent } from 'react';
export interface Props {
    value: string;
    label: string;
    onClick?: (value: string) => void;
    checkMarkColor?: string;
    selected?: boolean;
    focused?: boolean;
    isOption?: boolean;
}
export default class ColorCard extends PureComponent<Props> {
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    ref: React.RefObject<HTMLButtonElement>;
    render(): JSX.Element;
}
