import { EditorView, NodeView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface Props {
    node: PmNode;
    providerFactory: ProviderFactory;
    view: EditorView;
}
export default function ExtensionNodeView(portalProviderAPI: PortalProviderAPI, providerFactory: ProviderFactory, extensionHandlers: ExtensionHandlers): (node: PmNode<any>, view: EditorView<any>, getPos: () => number) => NodeView<any>;
