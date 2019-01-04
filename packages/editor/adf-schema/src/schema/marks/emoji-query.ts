import { MarkSpec } from 'prosemirror-model';
import { SEARCH_QUERY } from '../groups';
import { B400 } from '../../utils/colors';

export const emojiQuery: MarkSpec = {
  inclusive: true,
  group: SEARCH_QUERY,
  parseDOM: [{ tag: 'span[data-emoji-query]' }],
  toDOM() {
    return [
      'span',
      {
        'data-emoji-query': 'true',
        style: `color: ${B400}`,
      },
    ];
  },
};
