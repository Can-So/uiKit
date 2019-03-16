import * as React from 'react';
import { Component } from 'react';
import { ServiceAccountLink } from '../../../domain';
export interface BrowserStateProps {
    readonly service: ServiceAccountLink;
}
export declare type BrowserProps = BrowserStateProps;
export declare class Browser extends Component<BrowserProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<BrowserStateProps, never>, any> & {
    WrappedComponent: React.ComponentType<BrowserStateProps>;
};
export default _default;
