import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView, Decoration } from 'prosemirror-view';
import DecisionItem from '../ui/Decision';
import { ReactNodeView, ReactComponentProps } from '../../../nodeviews';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import {
  stateKey as taskPluginKey,
  TaskDecisionPluginState,
} from '../pm-plugins/main';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Decision extends ReactNodeView {
  private isContentEmpty() {
    return this.node.content.childCount === 0;
  }

  createDomRef() {
    const domRef = document.createElement('li');
    domRef.style['list-style-type' as any] = 'none';
    return domRef;
  }

  getContentDOM() {
    return { dom: document.createElement('div') };
  }

  render(_props: ReactComponentProps, forwardRef: any) {
    return (
      <WithPluginState
        plugins={{
          taskDecisionPlugin: taskPluginKey,
        }}
        render={({
          taskDecisionPlugin,
        }: {
          taskDecisionPlugin: TaskDecisionPluginState;
        }) => {
          let insideCurrentNode = false;
          if (
            taskDecisionPlugin &&
            taskDecisionPlugin.currentTaskDecisionItem
          ) {
            insideCurrentNode = this.node.eq(
              taskDecisionPlugin.currentTaskDecisionItem,
            );
          }
          return (
            <DecisionItem
              contentRef={forwardRef}
              showPlaceholder={!insideCurrentNode && this.isContentEmpty()}
            />
          );
        }}
      />
    );
  }

  update(node: PMNode, decorations: Decoration[]) {
    /**
     * Returning false here when the previous content was empty – fixes an error where the editor fails to set selection
     * inside the contentDOM after a transaction. See ED-2374.
     */
    return super.update(
      node,
      decorations,
      (_currentNode, _newNode) => !this.isContentEmpty(),
    );
  }
}

export const decisionItemNodeView = (portalProviderAPI: PortalProviderAPI) => (
  node: any,
  view: any,
  getPos: () => number,
): NodeView => {
  return new Decision(node, view, getPos, portalProviderAPI).init();
};
