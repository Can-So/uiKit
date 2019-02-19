import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  placeholder: {
    id: 'fabric.elements.user-picker.placeholder',
    defaultMessage: 'Enter people or teams...',
    description:
      'Placeholder description for empty user/team/email select field.',
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
  memberCount: {
    id: 'fabric.elements.user-picker.team.member.count',
    defaultMessage:
      '{count} {count, plural, one {member} other {members}}{includes, select, true {, including you} other {}}',
    description:
      'Number of members in the team and whether it includes the current user',
  },
  plus50Members: {
    id: 'fabric.elements.user-picker.team.member.50plus',
    defaultMessage:
      '50+ members{includes, select, true {, including you} other {}}',
    description:
      'Number of members in a team exceeds 50 and whether it includes the current user',
  },
  addEmail: {
    id: 'fabric.elements.user-picker.email.add',
    defaultMessage: 'Add user',
    description: 'Byline for email option.',
  },
});
