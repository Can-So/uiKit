import * as React from 'react';
export interface MobileRendererProps {
    document?: string;
}
export interface MobileRendererState {
    /** as defined in the renderer */
    document: any;
}
export default class MobileRenderer extends React.Component<MobileRendererProps, MobileRendererState> {
    private providerFactory;
    private objectAri;
    private containerAri;
    constructor(props: MobileRendererProps);
    private handleToggleTask;
    private onLinkClick;
    componentDidMount(): void;
    render(): JSX.Element | null;
}
