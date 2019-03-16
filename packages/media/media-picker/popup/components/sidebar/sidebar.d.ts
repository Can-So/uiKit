import * as React from 'react';
import { Component } from 'react';
export interface SidebarStateProps {
    readonly selected: string;
}
export declare type SidebarProps = SidebarStateProps;
export declare class StatelessSidebar extends Component<SidebarProps> {
    render(): JSX.Element;
    private getCloudPickingSidebarItems;
}
declare const _default: React.ComponentClass<Pick<SidebarStateProps, never>, any> & {
    WrappedComponent: React.ComponentType<SidebarStateProps>;
};
export default _default;
