// @flow

import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';
import StarLargeIcon from '@atlaskit/icon/glyph/star-large';
import NotificationIcon from '@atlaskit/icon/glyph/notification';

import type { DefaultConfigShape } from './types';

export default function generateDefaultConfig(): DefaultConfigShape {
  return {
    product: {
      label: 'Atlassian',
      rank: 1,
      section: 'primary',
      tooltip: 'Atlassian',
    },
    starred: {
      icon: StarLargeIcon,
      label: 'Starred and recent',
      rank: 2,
      section: 'primary',
      tooltip: 'Starred and recent',
    },
    search: {
      icon: SearchIcon,
      label: 'Search',
      section: 'primary',
      rank: 3,
      tooltip: 'Search',
    },
    create: {
      icon: CreateIcon,
      label: 'Create',
      section: 'primary',
      rank: 4,
      tooltip: 'Create',
    },
    notification: {
      icon: NotificationIcon,
      label: 'Notifications',
      section: 'secondary',
      rank: 1,
      tooltip: 'Notifications',
    },
    appSwitcher: {
      label: 'App Switcher',
      section: 'secondary',
      rank: 3,
      tooltip: 'App Switcher',
    },
    help: {
      label: 'Help',
      section: 'secondary',
      rank: 4,
      tooltip: 'Help',
    },
    profile: {
      label: 'Your profile and Settings',
      section: 'secondary',
      rank: 5,
      tooltip: 'Your profile and Settings',
    },
  };
}
