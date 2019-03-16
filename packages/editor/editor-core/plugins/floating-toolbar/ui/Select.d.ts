import * as React from 'react';
import { Component } from 'react';
export interface RenderOptionsPropsT<T> {
    hide: () => void;
    dispatchCommand: (command: T) => void;
}
export interface SelectOption {
    value: string;
    label: string;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
}
export declare type SelectOptions<T> = Array<SelectOption> | {
    render: ((props: RenderOptionsPropsT<T>) => React.ReactElement<any> | null);
    height: number;
    width: number;
};
export interface Props {
    hideExpandIcon?: boolean;
    options: SelectOptions<Function>;
    dispatchCommand: (command: Function) => void;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    defaultValue?: SelectOption;
    placeholder?: string;
    onChange?: (change: SelectOption) => void;
    width?: number;
}
export interface State {
    isOpen: boolean;
}
export default class Search extends Component<Props, State> {
    state: State;
    render(): JSX.Element;
}
