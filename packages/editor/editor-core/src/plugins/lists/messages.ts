// Common Translations will live here
import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  unorderedList: {
    id: 'fabric.editor.unorderedList',
    defaultMessage: 'Bullet list',
    description: 'A list with bullets. Also known as an “unordered” list',
  },
  orderedList: {
    id: 'fabric.editor.orderedList',
    defaultMessage: 'Numbered list',
    description: 'A list with ordered items 1… 2… 3…',
  },
  lists: {
    id: 'fabric.editor.lists',
    defaultMessage: 'Lists',
    description: 'Menu shows ordered/bullet list and unordered/numbered lists',
  },
});
