import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface LineWidthButtonProps {
    readonly lineWidth: number;
    readonly isActive: boolean;
    readonly onClick: () => void;
}
export declare class LineWidthButton extends Component<LineWidthButtonProps & InjectedIntlProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<LineWidthButtonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<LineWidthButtonProps & InjectedIntlProps>;
};
export default _default;
