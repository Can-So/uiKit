/// <reference types="react" />
import { ReactNodeView } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { ReactComponentProps, getPosHandler } from '../../../nodeviews/ReactNodeView';
import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
export declare class CardNodeView extends ReactNodeView {
    static fromComponent(component: React.ComponentType<any>, portalProviderAPI: PortalProviderAPI, props?: ReactComponentProps): (node: Node<any>, view: EditorView<any>, getPos: getPosHandler) => CardNodeView;
}
