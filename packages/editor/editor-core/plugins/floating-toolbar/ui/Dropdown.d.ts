import * as React from 'react';
import { Component, ReactElement } from 'react';
export interface RenderOptionsPropsT<T> {
    hide: () => void;
    dispatchCommand: (command: T) => void;
}
export interface DropdownOptionT<T> {
    title: string;
    onClick: T;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
}
export declare type DropdownOptions<T> = Array<DropdownOptionT<T>> | {
    render: ((props: RenderOptionsPropsT<T>) => React.ReactElement<any> | null);
    height: number;
    width: number;
};
export interface Props {
    title: string;
    icon?: ReactElement<any>;
    hideExpandIcon?: boolean;
    options: DropdownOptions<Function>;
    dispatchCommand: (command: Function) => void;
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
}
export interface State {
    isOpen: boolean;
}
export default class Dropdown extends Component<Props, State> {
    state: State;
    render(): JSX.Element;
    private renderArrayOptions;
    private toggleOpen;
    private hide;
}
