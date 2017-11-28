import { Node, NodeSpec } from 'prosemirror-model';
import { Inline } from './doc';
import { uuid } from '../../utils';

/**
 * @name decisionItem_node
 */
export interface Definition {
  type: 'decisionItem';
  content: Array<Inline>;
  attrs: {
    localId: string;
    state: string;
  };
}

export const decisionItem: NodeSpec = {
  content: 'inline*',
  marks: '_',
  attrs: {
    localId: { default: '' },
    state: { default: 'DECIDED' },
  },
  parseDOM: [
    {
      tag: 'li[data-decision-local-id]',

      // Default priority is 50. We normaly don't change this but since this node type is
      // also used by list-item we need to make sure that we run this parser first.
      priority: 100,

      getAttrs: (dom: Element) => ({
        localId: uuid.generate(),
        state: dom.getAttribute('data-decision-state')!,
      }),
    },
  ],
  toDOM(node: Node) {
    const { localId, state } = node.attrs;
    const attrs = {
      'data-decision-local-id': localId || 'local-decision',
      'data-decision-state': state,
    };
    return ['li', attrs, 0];
  },
};
