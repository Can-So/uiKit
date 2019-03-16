import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface ErrorViewProps {
    readonly message: string;
    readonly onCancel: () => void;
    readonly onRetry?: () => void;
}
export declare class ErrorView extends Component<ErrorViewProps & InjectedIntlProps> {
    render(): JSX.Element;
    private renderHint;
    private renderTryAgainButton;
    private renderCancelButton;
}
declare const _default: React.ComponentClass<ErrorViewProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<ErrorViewProps & InjectedIntlProps>;
};
export default _default;
