import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EditorAppearance } from '../../../types';
export interface CellViewProps {
    node: PmNode;
    view: EditorView;
    portalProviderAPI: PortalProviderAPI;
    getPos: () => number;
    appearance?: EditorAppearance;
}
export declare type CellProps = {
    view: EditorView;
    forwardRef: (ref: HTMLElement | null) => void;
    withCursor: boolean;
    isResizing?: boolean;
    isContextualMenuOpen: boolean;
    disabled: boolean;
    appearance?: EditorAppearance;
};
export declare const createCellView: (portalProviderAPI: PortalProviderAPI, appearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => (node: PmNode<any>, view: EditorView<any>, getPos: () => number) => NodeView<any>;
