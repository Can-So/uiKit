/// <reference types="react" />
import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import ReactNodeView, { ForwardRef, getPosHandler } from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface Props {
    node: PmNode;
    view: EditorView;
    allowColumnResizing?: boolean;
    cellMinWidth?: number;
    portalProviderAPI: PortalProviderAPI;
    getPos: () => number;
    dynamicTextSizing?: boolean;
}
export default class TableView extends ReactNodeView {
    private table;
    private observer?;
    constructor(props: Props);
    getContentDOM(): {
        dom: Node;
        contentDOM?: Node | null | undefined;
    };
    setDomAttrs(node: PmNode): void;
    render(props: Props, forwardRef: ForwardRef): JSX.Element;
    ignoreMutation(record: MutationRecord): boolean;
    destroy(): void;
    private resizeForBreakoutContent;
    private handleBreakoutContent;
}
export declare const createTableView: (portalProviderAPI: PortalProviderAPI, dynamicTextSizing?: boolean | undefined) => (node: PmNode<any>, view: EditorView<any>, getPos: getPosHandler) => NodeView<any>;
