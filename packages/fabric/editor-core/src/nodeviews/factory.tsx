import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import ProviderFactory from '../providerFactory';
import ReactPMNode from './ui/prosemirror-node';

type getPosHandler = () => number;

export interface ReactNodeViewComponents {
  [key: string]: React.ComponentClass<any> | React.StatelessComponent<any>;
}

class NodeViewElem implements NodeView {
  private nodeTypeName: string;
  private domRef: HTMLElement | undefined;
  private view: EditorView;
  private getPos: getPosHandler;
  private providerFactory: ProviderFactory;
  private reactNodeViewComponents: ReactNodeViewComponents;

  constructor(
    node: PMNode,
    view: EditorView,
    getPos: getPosHandler,
    providerFactory: ProviderFactory,
    reactNodeViewComponents: ReactNodeViewComponents,
    isBlockNodeView: boolean,
  ) {
    this.nodeTypeName = node.type.name;
    this.view = view;
    this.getPos = getPos;
    this.providerFactory = providerFactory;
    this.reactNodeViewComponents = reactNodeViewComponents;

    const elementType = isBlockNodeView ? 'div' : 'span';
    this.domRef = document.createElement(elementType);

    this.renderReactComponent(node);
  }

  get dom() {
    return this.domRef;
  }

  update(node: PMNode) {
    // @see https://github.com/ProseMirror/prosemirror/issues/648
    const isValidUpdate = this.nodeTypeName === node.type.name;

    if (isValidUpdate) {
      this.renderReactComponent(node);
    }

    return isValidUpdate;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
  }

  private renderReactComponent(node: PMNode) {
    const { getPos, providerFactory, reactNodeViewComponents, view } = this;

    Object.keys(node.attrs || {}).forEach(attr => {
      if (this.domRef) {
        this.domRef.setAttribute(attr, node.attrs[attr]);
      }
    });

    ReactDOM.render(
      <ReactPMNode
        node={node}
        getPos={getPos}
        view={view}
        providerFactory={providerFactory}
        components={reactNodeViewComponents}
      />,
      this.domRef!,
    );
  }
}

export default function nodeViewFactory(
  providerFactory: ProviderFactory,
  reactNodeViewComponents: ReactNodeViewComponents,
  isBlockNodeView = false,
) {
  return (node: PMNode, view: EditorView, getPos: () => number): NodeView => {
    return new NodeViewElem(
      node,
      view,
      getPos,
      providerFactory,
      reactNodeViewComponents,
      isBlockNodeView,
    );
  };
}
