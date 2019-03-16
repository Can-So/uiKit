import * as React from 'react';
export declare const Breakpoints: {
    S: string;
    M: string;
    L: string;
};
export declare function getBreakpoint(width?: number): string;
export declare function createWidthContext(width?: number): {
    width: number;
    breakpoint: string;
};
declare const Consumer: React.ComponentType<React.ConsumerProps<{
    width: number;
    breakpoint: string;
}>>;
export declare type WidthProviderState = {
    width?: number;
};
export declare class WidthProvider extends React.Component<any, WidthProviderState> {
    state: {
        width: number;
    };
    constructor(props: any);
    render(): JSX.Element;
    setWidth: any;
}
export { Consumer as WidthConsumer };
