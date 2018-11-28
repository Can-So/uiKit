import {
  AnalyticsEventPayload,
  createAndFireEvent,
  CreateAndFireEventFunction,
  CreateUIAnalyticsEventSignature,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import { User } from './types.js';

export type UserPickerSession = {
  start: number;
  upCount: number;
  downCount: number;
  lastKey?: number;
};

type ActionType = 'select' | 'cancel';

export const startSession = (): UserPickerSession => ({
  start: Date.now(),
  upCount: 0,
  downCount: 0,
  lastKey: undefined,
});

export const createAndFireEventInElementsChannel: CreateAndFireEventFunction = createAndFireEvent(
  'fabric-elements',
);

export const createAndFireSafe = <
  U extends any[],
  T extends ((...args: U) => AnalyticsEventPayload)
>(
  createAnalyticsEvent: CreateUIAnalyticsEventSignature | void,
  creator: T,
  ...args: U
) => {
  if (createAnalyticsEvent) {
    createAndFireEventInElementsChannel(creator(...args))(createAnalyticsEvent);
  }
};

const getAnalyticsAction = (session: UserPickerSession, action: ActionType) => {
  switch (action) {
    case 'select':
      return session.lastKey === 13 ? 'pressed' : 'clicked';
    case 'cancel':
      return 'cancelled';
  }
};

export const fromSession = (
  session: UserPickerSession,
  action: ActionType,
  query: string,
  userId?: string,
  isMulti?: boolean,
  users?: User[],
  value?: { user: User },
): AnalyticsEventPayload => ({
  action: getAnalyticsAction(session, action),
  actionSubject: 'userPicker',
  eventType: 'ui',
  attributes: {
    packageName,
    packageVersion,
    duration: Date.now() - session.start,
    upKeyCount: session.upCount,
    downKeyCount: session.downCount,
    queryLength: query.length,
    spaceInQuery: query.indexOf(' ') !== -1,
    type: isMulti ? 'multi' : 'single',
    position: users && value ? users.indexOf(value.user) : undefined,
    userId,
  },
});

export const clearEvent = (
  pickerOpen: boolean,
  isMulti?: boolean,
): AnalyticsEventPayload => ({
  action: 'cleared',
  actionSubject: 'userPicker',
  eventType: 'ui',
  attributes: {
    packageName,
    packageVersion,
    type: isMulti ? 'multi' : 'single',
    pickerOpen,
  },
});

export const deleteEvent = (
  pickerOpen: boolean,
  userId: string,
  isMulti?: boolean,
): AnalyticsEventPayload => ({
  action: 'deleted',
  actionSubject: 'userPickerItem',
  eventType: 'ui',
  attributes: {
    packageName,
    packageVersion,
    type: isMulti ? 'multi' : 'single',
    userId,
    pickerOpen,
  },
});

export const failedEvent = () => ({
  action: 'failed',
  actionSubject: 'userPicker',
  eventType: 'Ops',
});
