import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
export declare function taskItemNodeViewFactory(portalProviderAPI: PortalProviderAPI, providerFactory: ProviderFactory): (node: any, view: any, getPos: () => number) => NodeView<any>;
