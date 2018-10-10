// Common Translations will live here
import { defineMessages } from 'react-intl';

export default defineMessages({
  layoutFixedWidth: {
    id: 'fabric.editor.layoutFixedWidth',
    defaultMessage: 'Center',
    description:
      'Display your element (image, table, extension, etc) as standard width',
  },
  layoutWide: {
    id: 'fabric.editor.layoutWide',
    defaultMessage: 'Wide',
    description:
      'Display your element (image, table, extension, etc) wider than normal',
  },
  layoutFullWidth: {
    id: 'fabric.editor.layoutFullWidth',
    defaultMessage: 'Full width',
    description:
      'Display your element (image, table, extension, etc) as full width',
  },
  remove: {
    id: 'fabric.editor.remove',
    defaultMessage: 'Remove',
    description:
      'Delete the element (image, panel, table, etc.) from your document',
  },
  visit: {
    id: 'fabric.editor.visit',
    defaultMessage: 'Open link in a new window',
    description: '',
  },
});
