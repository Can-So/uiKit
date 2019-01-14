import { NodeSpec, Node as PMNode } from 'prosemirror-model';
import { uuid } from '../../utils/uuid';

/**
 * @name status_node
 * @stage 0
 */
export interface StatusDefinition {
  type: 'status';
  attrs: {
    /**
     * @minLength 1
     */
    text: string;
    color: 'neutral' | 'purple' | 'blue' | 'red' | 'yellow' | 'green';
    localId?: string;
    /**
     * Supported values are bold and subtle
     */
    style?: string;
  };
}

export const status: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: true,
  attrs: {
    text: { default: '' },
    color: { default: '' },
    localId: { default: uuid.generate() },
    style: { default: null },
  },
  parseDOM: [
    {
      tag: 'span[data-node-type="status"]',
      getAttrs: domNode => {
        const dom = domNode as HTMLElement;
        return {
          text: dom.textContent!.replace(/\n/, '').trim(),
          color: dom.getAttribute('data-color'),
          localId: dom.getAttribute('data-local-id') || uuid.generate(),
          style: dom.getAttribute('data-style'),
        };
      },
    },
  ],
  toDOM(node: PMNode) {
    const { text, color, localId, style } = node.attrs;

    const attrs = {
      'data-node-type': 'status',
      'data-color': color,
      'data-local-id': localId,
      'data-style': style,
    };
    return ['span', attrs, text];
  },
};
