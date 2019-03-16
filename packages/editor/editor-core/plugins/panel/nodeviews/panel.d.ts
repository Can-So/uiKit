import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { PanelType } from '@atlaskit/adf-schema';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
export declare type PanelComponentProps = {
    panelType: PanelType;
    forwardRef: (ref: HTMLElement) => void;
};
declare type PanelWrapperProps = React.HTMLProps<HTMLDivElement> & {
    panelType: PanelType;
};
export declare const PanelWrapper: React.ComponentType<PanelWrapperProps>;
export declare const IconWrapper: React.ComponentType<PanelWrapperProps>;
export declare const panelNodeView: (portalProviderAPI: PortalProviderAPI) => (node: any, view: any, getPos: () => number) => NodeView<any>;
export {};
