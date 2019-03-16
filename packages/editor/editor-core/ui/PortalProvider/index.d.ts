import * as React from 'react';
import { EventDispatcher } from '../../event-dispatcher';
export declare type PortalProviderProps = {
    render: (portalProviderAPI: PortalProviderAPI) => React.ReactChild | JSX.Element | null;
};
export declare type Portals = Map<HTMLElement, React.ReactChild>;
export declare type PortalRendererState = {
    portals: Portals;
};
declare type MountedPortal = {
    children: () => React.ReactChild | null;
    hasReactContext: boolean;
};
export declare class PortalProviderAPI extends EventDispatcher {
    portals: Map<HTMLElement, MountedPortal>;
    context: any;
    setContext: (context: any) => void;
    render(children: () => React.ReactChild | JSX.Element | null, container: HTMLElement, hasReactContext?: boolean): void;
    forceUpdate(): void;
    remove(container: HTMLElement): void;
}
export declare class PortalProvider extends React.Component<PortalProviderProps> {
    portalProviderAPI: PortalProviderAPI;
    constructor(props: PortalProviderProps);
    render(): string | number | React.ReactElement<any> | JSX.Element | null;
    componentDidUpdate(): void;
}
export declare class PortalRenderer extends React.Component<{
    portalProviderAPI: PortalProviderAPI;
}, PortalRendererState> {
    constructor(props: {
        portalProviderAPI: PortalProviderAPI;
    });
    handleUpdate: (portals: Map<HTMLElement, React.ReactChild>) => void;
    render(): JSX.Element;
}
export {};
