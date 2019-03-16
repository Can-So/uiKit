import { Component } from 'react';
export interface Props {
    className: string;
    retryClassName: string;
    label: string;
    appearance: string;
    error: boolean;
    onSubmit: () => void;
    loading: boolean;
}
export default class RetryableButton extends Component<Props, {}> {
    constructor(props: Props);
    renderLoading(): JSX.Element;
    renderRetry(): JSX.Element;
    render(): JSX.Element;
}
