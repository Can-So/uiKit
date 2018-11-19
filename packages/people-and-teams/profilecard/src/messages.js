// @flow
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  inactiveAccountMsg: {
    id: 'pt.profile.card.inactive.account',
    defaultMessage: 'Account deactivated',
    description: 'A text in a grey lozenge shows that this user is inactive',
  },

  inactiveAccountDescNoDateMsg: {
    id: 'pt.profile.card.inactive.account.no.date',
    defaultMessage:
      'You can no longer collaborate with this person. Their account has been deactivated.',
    description:
      'A long text explains this user is inactive when we do not know the date of starting to deactivate',
  },

  inactiveAccountDescHasDateMsg: {
    id: 'pt.profile.card.inactive.account.has.date',
    defaultMessage:
      'You can no longer collaborate with this person. Their account was deactivated {date}.',
    description:
      'A long text explains this user is inactive when we know the date of starting to deactivate',
  },

  closedAccountMsg: {
    id: 'pt.profile.card.closed.account',
    defaultMessage: 'Account deleted',
    description:
      'A text in a grey lozenge shows that this user is closed/deleted',
  },

  closedAccountDescNoDateMsg: {
    id: 'pt.profile.card.closed.account.no.date',
    defaultMessage:
      'You can no longer collaborate with this person. Their account has been deleted.',
    description:
      'A long text explains this user is closed when we do not know the date of starting to close',
  },

  closedAccountDescHasDateMsg: {
    id: 'pt.profile.card.inactive.account.has.date',
    defaultMessage:
      'You can no longer collaborate with this person. Their account has been deleted {date}.',
    description:
      'A long text explains this user is closed when we know the date of starting to close',
  },

  disabledAccountDefaultName: {
    id: 'pt.profile.card.disabled.account.default.name',
    defaultMessage: 'Former user',
    description:
      'A default name when we cannot get name of an inactive or closed user',
  },

  today: {
    id: 'pt.profile.card.today',
    defaultMessage: 'today',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  yesterday: {
    id: 'pt.profile.card.yesterday',
    defaultMessage: 'yesterday',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  thisWeek: {
    id: 'pt.profile.card.this.week',
    defaultMessage: 'this week',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  thisMonth: {
    id: 'pt.profile.card.this.month',
    defaultMessage: 'this month',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  lastMonth: {
    id: 'pt.profile.card.last.month',
    defaultMessage: 'last month',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  aFewMonths: {
    id: 'pt.profile.card.a.few.months',
    defaultMessage: 'a few months',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  severalMonths: {
    id: 'pt.profile.several.months',
    defaultMessage: 'several months',
    description: 'a relative date is showed when a user is closed/deactivated',
  },

  moreThanAYear: {
    id: 'pt.profile.card.more.than.a.year',
    defaultMessage: 'more than a year',
    description: 'a relative date is showed when a user is closed/deactivated',
  },
});

export default messages;
