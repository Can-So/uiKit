// @flow
import { type Element as ReactElement, type Node as ReactNode } from 'react';
import type { IntlShape } from 'react-intl';

export type PresenceTypes =
  | 'none'
  | 'available'
  | 'busy'
  | 'unavailable'
  | 'focus';

export type StatusTypes = 'active' | 'inactive' | 'closed';

export type StatusModifiedDateType =
  | 'noDate'
  | 'thisWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'aFewMonths'
  | 'severalMonths'
  | 'moreThanAYear';

export type ProfileCardAction = {
  callback?: Function,
  shouldRender?: Function,
  id: string,
  label: string,
};

export type ProfilecardProps = {
  status?: StatusTypes,
  isBot?: boolean,
  avatarUrl?: string,
  fullName?: string,
  meta?: string,
  nickname?: string,
  email?: string,
  location?: string,
  companyName?: string,
  timestring?: string,
  presence?: PresenceTypes,
  actions?: ProfileCardAction[],
  isLoading?: boolean,
  hasError?: boolean,
  errorType?: ?ProfileCardErrorType,
  clientFetchProfile?: Function,
  analytics?: Function,
  presenceMessage?: string,
  statusModifiedDate?: number,
  // allow to pass custom elevation, example value of this prop is: `e100`, `e200`, `e300`, `e400` and `e500`
  // Reference from `packages/core/theme/src/elevation.js` to see all valid values.
  customElevation?: string,

  // Allow to pass custom message for disabled account which `status` prop is `inactive` or `closed`.
  // `disabledAccountMessage` should not contain react-intl components, ex: `FormattedMessage`,
  // because ProfileCard component is wrapped in its own `IntlProvider` and `FormattedMessage` will loads messages of `@atlaskit/profilecard`,
  // not from the consumer of `@atlaskit/profilecard`.
  disabledAccountMessage?: ReactNode,
  // Allow to show a status lozenge for disabled account which `status` prop is `inactive` or `closed`
  hasDisabledAccountLozenge?: boolean,
};

export type MessageIntlProviderProps = {
  children: ReactElement<*>,
  intl: IntlShape,
};

export type RelativeDateKeyType =
  | 'ThisWeek'
  | 'ThisMonth'
  | 'LastMonth'
  | 'AFewMonths'
  | 'SeveralMonths'
  | 'MoreThanAYear'
  | null;

export type ProfileClient = {
  makeRequest: (cloudId: string, userId: string) => Promise<any>,
  setCachedProfile: (cloudId: string, userId: string, cacheItem: any) => void,
  getCachedProfile: (cloudId: string, userId: string) => any,
  flushCache: () => void,
  getProfile: (cloudId: string, userId: string) => Promise<any>,
};

export type ProfilecardTriggerPosition =
  | 'top left'
  | 'top right'
  | 'right top'
  | 'right bottom'
  | 'bottom right'
  | 'bottom left'
  | 'left bottom'
  | 'left top';

export type ProfileCardErrorType = {
  reason: 'default' | 'NotFound',
};

export type AkProfileClientConfig = {
  url: string,
  cacheSize?: number,
  cacheMaxAge?: number,
};
