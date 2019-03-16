import * as React from 'react';
export declare type CommonProps<T> = {
    container?: T;
    button?: T;
};
export declare type Props = {
    onClick?: React.MouseEventHandler<HTMLElement>;
    style?: CommonProps<React.CSSProperties>;
    className?: CommonProps<string>;
};
export declare class ShowMore extends React.PureComponent<Props> {
    static defaultProps: {
        className: {};
        style: {};
    };
    render(): JSX.Element;
}
