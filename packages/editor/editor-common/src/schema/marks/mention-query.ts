import { akColorB400 } from '@atlaskit/util-shared-styles';
import { MarkSpec } from 'prosemirror-model';
import { SEARCH_QUERY } from '../groups';

export const mentionQuery: MarkSpec = {
  excludes: `${SEARCH_QUERY}`,
  inclusive: true,
  group: SEARCH_QUERY,
  parseDOM: [{ tag: 'span[data-mention-query]' }],
  toDOM(node): [string, any] {
    return [
      'span',
      {
        'data-mention-query': true,
        'data-active': node.attrs.active,
        style: `color: ${akColorB400}`,
      },
    ];
  },
  attrs: {
    active: {
      default: true,
    },
  },
};
