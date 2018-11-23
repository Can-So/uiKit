import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  placeholder: {
    id: 'fabric.elements.user-picker.placeholder',
    defaultMessage: 'Find a person...',
    description: 'Placeholder description for empty user select field.',
  },
  addMore: {
    id: 'fabric.elements.user-picker.placeholder.add-more',
    defaultMessage: 'add more people...',
    description:
      'Placeholder for multi user picker when the field is not empty.',
  },
  remove: {
    id: 'fabric.elements.user-picker.multi.remove-item',
    defaultMessage: 'Remove',
    description:
      'Tooltip for the single item remove button in a multi user select field.',
  },
  clear: {
    id: 'fabric.elements.user-picker.single.clear',
    defaultMessage: 'Clear',
    description: 'Tooltip for clear button in the single user select field.',
  },
});
