import * as React from 'react';
import { Component } from 'react';
import { ServiceAccountLink, ServiceName } from '../../../../domain';
export interface AuthStateProps {
    readonly service: ServiceAccountLink;
}
export interface AuthDispatchProps {
    readonly onStartAuth: (serviceName: ServiceName) => void;
}
export declare type AuthProps = AuthStateProps & AuthDispatchProps;
/**
 * Routing class that displays view depending on situation.
 */
export declare class StatelessAuth extends Component<AuthProps> {
    render(): JSX.Element | null;
    private onClick;
}
declare const _default: React.ComponentClass<Pick<AuthProps, never>, any> & {
    WrappedComponent: React.ComponentType<AuthProps>;
};
export default _default;
