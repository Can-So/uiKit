import * as React from 'react';
export declare const countStyle: string;
export declare const highlightStyle: string;
export declare const containerStyle: string;
export declare const slideUpStyle: string;
export declare const slideDownStyle: string;
export declare type Props = {
    value: number;
    highlight?: boolean;
    limit?: number;
    overLimitLabel?: string;
    className?: string;
};
export declare type State = {
    previous?: {
        value: number;
        highlight?: boolean;
    };
};
export declare class Counter extends React.PureComponent<Props, State> {
    static defaultProps: {
        highlight: boolean;
        limit: number;
        overLimitLabel: string;
        className: undefined;
    };
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    private getLabel;
    private hasReachedLimit;
    private renderPrevious;
    private clearPrevious;
    render(): JSX.Element;
}
