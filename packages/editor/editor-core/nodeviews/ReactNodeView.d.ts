import * as React from 'react';
import { NodeView, EditorView, Decoration } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { PortalProviderAPI } from '../ui/PortalProvider';
export declare type getPosHandler = () => number;
export declare type ReactComponentProps = {
    [key: string]: any;
};
export declare type ForwardRef = (node: HTMLElement | null) => void;
export default class ReactNodeView implements NodeView {
    private domRef?;
    private contentDOMWrapper;
    private reactComponent?;
    private portalProviderAPI;
    private hasContext;
    reactComponentProps: ReactComponentProps;
    view: EditorView;
    getPos: getPosHandler;
    contentDOM: Node | undefined;
    node: PMNode;
    constructor(node: PMNode, view: EditorView, getPos: getPosHandler, portalProviderAPI: PortalProviderAPI, reactComponentProps?: ReactComponentProps, reactComponent?: React.ComponentType<any>, hasContext?: boolean);
    /**
     * This method exists to move initialization logic out of the constructor,
     * so object can be initialized properly before calling render first time.
     *
     * Example:
     * Instance properties get added to an object only after super call in
     * constructor, which leads to some methods being undefined during the
     * first render.
     */
    init(): this;
    private renderReactComponent;
    createDomRef(): HTMLElement;
    getContentDOM(): {
        dom: Node;
        contentDOM?: Node | null | undefined;
    } | undefined;
    handleRef: (node: HTMLElement | null) => void;
    private _handleRef;
    render(props: ReactComponentProps, forwardRef?: ForwardRef): React.ReactElement<any> | null;
    update(node: PMNode, decorations: Array<Decoration>, validUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean): boolean;
    /**
     * Copies the attributes from a ProseMirror Node to a DOM node.
     * @param node The Prosemirror Node from which to source the attributes
     */
    setDomAttrs(node: PMNode, element: HTMLElement): void;
    readonly dom: HTMLElement | undefined;
    destroy(): void;
    static fromComponent(component: React.ComponentType<any>, portalProviderAPI: PortalProviderAPI, props?: ReactComponentProps): (node: PMNode<any>, view: EditorView<any>, getPos: getPosHandler) => ReactNodeView;
}
