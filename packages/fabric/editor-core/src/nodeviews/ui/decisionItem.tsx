import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import { DecisionItem } from '@atlaskit/task-decision';

type getPosHandler = () => number;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Decision implements NodeView {
  private domRef: HTMLElement | undefined;
  private contentDOMRef: HTMLElement | undefined;
  private isContentEmpty: boolean = false;
  private node: PMNode;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler) {
    this.isContentEmpty = node.content.childCount === 0;
    this.node = node;
    this.renderReactComponent();
  }

  private handleRef = (node: HTMLElement | undefined) => {
    this.contentDOMRef = node;
  };

  private renderReactComponent() {
    this.domRef = document.createElement('li');
    this.domRef.style['list-style-type'] = 'none';

    // tslint:disable-next-line:variable-name
    ReactDOM.render(
      <DecisionItem
        contentRef={this.handleRef}
        showPlaceholder={this.isContentEmpty}
      />,
      this.domRef,
    );
  }

  get dom() {
    return this.domRef;
  }

  get contentDOM() {
    return this.contentDOMRef;
  }

  update(node: PMNode) {
    /**
     * Returning false here when the previous content was empty – fixes an error where the editor fails to set selection
     * inside the contentDOM after a transaction. See ED-2374.
     */
    return !this.isContentEmpty || node.type !== this.node.type;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
    this.contentDOMRef = undefined;
  }
}

export const decisionItemNodeView = (
  node: any,
  view: any,
  getPos: () => number,
): NodeView => {
  return new Decision(node, view, getPos);
};
