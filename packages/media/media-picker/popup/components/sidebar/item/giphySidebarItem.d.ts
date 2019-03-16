import * as React from 'react';
import { Component } from 'react';
export interface SidebarItemOwnProps {
    readonly isActive: boolean;
}
export interface SidebarItemDispatchProps {
    readonly onChangeService: () => void;
}
export declare type SidebarItemProps = SidebarItemOwnProps & SidebarItemDispatchProps;
export declare class StatelessGiphySidebarItem extends Component<SidebarItemProps> {
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<SidebarItemProps, never> & SidebarItemOwnProps, any> & {
    WrappedComponent: React.ComponentType<SidebarItemProps>;
};
export default _default;
