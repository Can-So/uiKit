import * as React from 'react';
import { defineMessages } from 'react-intl';
import FormattedMessage from '../primitives/formatted-message';

import IntlProvider from '../components/intl-provider';

const messages = defineMessages({
  switchTo: {
    id: 'fabric.atlassianSwitcher.switchTo',
    defaultMessage: 'Switch to',
    description:
      'In a context in which users are able to switch between products, this text is the title of the category displaying the products the user is able to switch to.',
  },
  switchToTooltip: {
    id: 'fabric.atlassianSwitcher.switchToTooltip',
    defaultMessage: 'Switch to …',
    description:
      'This text appears as a tooltip when a user hovers over the atlassian switcher icon before clicking on it.',
  },
  recent: {
    id: 'fabric.atlassianSwitcher.recent',
    defaultMessage: 'Recent',
    description:
      "In a context in which users are able to view recent projects or spaces they've viewed, this text is the title of the section displaying all the recent projects or spaces.",
  },
  more: {
    id: 'fabric.atlassianSwitcher.more',
    defaultMessage: 'More',
    description:
      'In a context in which users are able to view predefined custom links, this text is the title of the section displaying all existing custom links.',
  },
  try: {
    id: 'fabric.atlassianSwitcher.try',
    defaultMessage: 'Try',
    description:
      'This text appears as a way to encourage the user to try a new Atlassian product.',
  },
  manageList: {
    id: 'fabric.atlassianSwitcher.manageList',
    defaultMessage: 'Manage list',
    description:
      'This text is for the action for a user to manage the values present in an editable list of links.',
  },
  jiraProject: {
    id: 'fabric.atlassianSwitcher.jiraProject',
    defaultMessage: 'Jira project',
    description:
      'In a context in which several items are listed , this text describes that the specific type of a given item is a Jira project',
  },
  confluenceSpace: {
    id: 'fabric.atlassianSwitcher.confluenceSpace',
    defaultMessage: 'Confluence space',
    description:
      'In a context in which several items are listed , this text describes that the specific type of a given item is a Confluence space',
  },
  people: {
    id: 'fabric.atlassianSwitcher.people',
    defaultMessage: 'People',
    description:
      'The text of a link redirecting the user to the People directory',
  },
  administration: {
    id: 'fabric.atlassianSwitcher.administration',
    defaultMessage: 'Administration',
    description:
      'The text of a link redirecting the user to the site administration',
  },
  discoverMore: {
    id: 'fabric.atlassianSwitcher.discoverMore',
    defaultMessage: 'Discover more',
    description:
      'The text of a link redirecting the user to Discover More Atlassian products',
  },
  errorHeading: {
    id: 'fabric.atlassianSwitcher.errorHeading',
    defaultMessage: 'Something went wrong',
    description:
      'Heading of the error screen which is shown when an unknown error happens in the Atlassian Switcher. Usually due to failed network requests.',
  },
  errorText: {
    id: 'fabric.atlassianSwitcher.errorText',
    defaultMessage:
      'We keep track of these errors, but feel free to contact us if refreshing doesn’t fix things',
    description:
      'Text that is displayed when an unknown error happens in the Atlassian Switcher.',
  },
  errorImageAltText: {
    id: 'fabric.atlassianSwitcher.errorImageAltText',
    defaultMessage: 'A broken robot and a number of people busy fixing it.',
    description:
      'Text displayed as alt text when an error occurs in the Atlassian Switcher',
  },
});

export const SwitchToTooltipText = (
  <IntlProvider>
    <FormattedMessage {...messages.switchToTooltip} />
  </IntlProvider>
);

export default messages;
