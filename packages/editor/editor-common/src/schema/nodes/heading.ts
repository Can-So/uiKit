import { NodeSpec } from 'prosemirror-model';
import { Inline } from './doc';

/**
 * @name heading_node
 */
export interface Definition {
  type: 'heading';
  /**
   * @minItems 0
   */
  content: Array<Inline>;
  attrs: {
    /**
     * @minimum 1
     * @maximum 6
     */
    level: number;
  };
}

export const heading: NodeSpec = {
  attrs: { level: { default: 1 } },
  content: `inline*`,
  group: 'block',
  defining: true,
  parseDOM: [
    { tag: 'h1', attrs: { level: 1 } },
    { tag: 'h2', attrs: { level: 2 } },
    { tag: 'h3', attrs: { level: 3 } },
    { tag: 'h4', attrs: { level: 4 } },
    { tag: 'h5', attrs: { level: 5 } },
    { tag: 'h6', attrs: { level: 6 } },
  ],
  toDOM(node) {
    return ['h' + node.attrs['level'], 0];
  },
};
