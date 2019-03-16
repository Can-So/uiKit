import { Color } from './DateLozenge';
import * as React from 'react';
export declare type ValueType = number;
export declare type OnClick = (value: ValueType, event: React.SyntheticEvent<any>) => void;
export declare type Props = {
    onClick?: OnClick;
    value: ValueType;
    format?: string;
    color?: Color;
    className?: string;
    children?: React.StatelessComponent<Props> | string | React.ReactNode;
};
export declare class Date extends React.Component<Props> {
    static defaultProps: Partial<Props>;
    handleOnClick: (event: React.SyntheticEvent<any>) => void;
    renderContent: () => {} | null;
    render(): JSX.Element;
}
