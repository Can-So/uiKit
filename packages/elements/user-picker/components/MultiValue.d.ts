import * as React from 'react';
import { Option, UserPickerProps } from '../types';
export declare const scrollToValue: (valueContainer: HTMLDivElement, control: HTMLElement) => void;
declare type Props = {
    isFocused?: boolean;
    data: Option;
    innerProps: any;
    removeProps: {
        onClick: Function;
    };
    selectProps: UserPickerProps;
};
export declare class MultiValue extends React.Component<Props> {
    private containerRef;
    constructor(props: Props);
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: Props): boolean;
    getElemBefore: () => JSX.Element;
    render(): JSX.Element;
}
export {};
