import { NodeSpec, Node as PMNode } from 'prosemirror-model';
import { CardAttributes } from './block-card';

export interface UrlType {
  url: string;
}

export interface DataType {
  /**
   * @additionalProperties true
   */
  data: object;
}

/**
 * @name inlineCard_node
 */
export interface InlineCardDefinition {
  type: 'inlineCard';
  attrs: CardAttributes;
}

export const inlineCard: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: true,
  attrs: {
    url: { default: '' },
    data: { default: null },
  },
  parseDOM: [
    {
      tag: 'span[data-inline-card]',
      getAttrs: dom => {
        const data = (dom as HTMLElement).getAttribute('data-card-data');

        return {
          url: (dom as HTMLElement).getAttribute('data-card-url'),
          data: data ? JSON.parse(data) : null,
        };
      },
    },
  ],
  toDOM(node: PMNode) {
    const attrs = {
      'data-inline-card': '',
      'data-card-url': node.attrs.url,
      'data-card-data': node.attrs.data ? JSON.stringify(node.attrs.data) : '',
    };
    return ['span', attrs];
  },
};
