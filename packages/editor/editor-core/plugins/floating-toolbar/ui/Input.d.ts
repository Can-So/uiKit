import * as React from 'react';
import { Component } from 'react';
export interface Props {
    mountPoint?: HTMLElement;
    boundariesElement?: HTMLElement;
    defaultValue?: string;
    placeholder?: string;
    onBlur?: (text: string) => void;
    onSubmit?: (text: string) => void;
}
export interface State {
    text: string;
}
export default class TextField extends Component<Props, State> {
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<Element>) => void;
    handleBlur: (e: React.FocusEvent<{}>) => void;
    render(): JSX.Element;
}
