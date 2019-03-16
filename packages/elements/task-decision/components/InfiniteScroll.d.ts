import { Component } from 'react';
export declare type ThresholdReachedEventHandler = () => void;
export interface InfiniteScrollProps {
    readonly height?: number | string;
    readonly width?: number | string;
    readonly delay?: number;
    readonly threshold?: number;
    readonly onThresholdReached?: ThresholdReachedEventHandler;
}
export interface InfiniteScrollState {
}
export default class InfiniteScroll extends Component<InfiniteScrollProps, InfiniteScrollState> {
    static defaultProps: {
        width: string;
        delay: number;
        threshold: number;
    };
    private readonly emitOnThresholdReachedWithDebounce;
    private scrollHeight;
    render(): JSX.Element;
    private checkThreshold;
    private emitOnThresholdReached;
}
