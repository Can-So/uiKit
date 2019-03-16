import * as React from 'react';
import { Component } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Tool } from '../../../../common';
export interface ShapeButtonProps {
    readonly activeShape: Tool;
    readonly isActive: boolean;
    readonly onClick: () => void;
}
export declare class ShapeButton extends Component<ShapeButtonProps & InjectedIntlProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<ShapeButtonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<ShapeButtonProps & InjectedIntlProps>;
};
export default _default;
