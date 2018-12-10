import { createAndFireEvent } from '@atlaskit/analytics-next';
import {
  AnalyticsEventPayload,
  CreateAndFireEventFunction,
} from '@atlaskit/analytics-next-types';
import * as uuid from 'uuid/v4';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import { User, UserOption, UserPickerProps, UserPickerState } from './types.js';

export type UserPickerSession = {
  id: string;
  start: number;
  upCount: number;
  downCount: number;
  lastKey?: number;
};

export const startSession = (): UserPickerSession => ({
  id: uuid(),
  start: Date.now(),
  upCount: 0,
  downCount: 0,
  lastKey: undefined,
});

export const createAndFireEventInElementsChannel: CreateAndFireEventFunction = createAndFireEvent(
  'fabric-elements',
);

const createEvent = (
  eventType: 'ui' | 'operational',
  action: string,
  actionSubject: string,
  attributes = {},
): AnalyticsEventPayload => ({
  eventType,
  action,
  actionSubject,
  attributes: {
    packageName,
    packageVersion,
    ...attributes,
  },
});

const buildValueForAnalytics = (value?: UserOption[] | UserOption) => {
  if (value) {
    const valueToConvert = Array.isArray(value) ? value : [value];
    return valueToConvert.map(({ user }) => ({ id: user ? user.id : null }));
  }

  return [];
};

export interface EventCreator {
  (
    props: UserPickerProps,
    state: UserPickerState,
    session?: UserPickerSession,
  ): AnalyticsEventPayload;
  (
    props: UserPickerProps,
    state: UserPickerState,
    session?: UserPickerSession,
    ...args: any[]
  ): AnalyticsEventPayload;
}

export const focusEvent: EventCreator = (props, state, session) =>
  createEvent('ui', 'focused', 'userPicker', {
    sessionId: sessionId(session),
    values: buildValueForAnalytics(state.value),
    pickerType: pickerType(props),
  });

export const clearEvent: EventCreator = (props, state) =>
  createEvent('ui', 'cleared', 'userPicker', {
    pickerType: pickerType(props),
    pickerOpen: state.menuIsOpen,
  });

export const deleteEvent: EventCreator = (props, state, session, ...args) =>
  createEvent('ui', 'deleted', 'userPickerItem', {
    sessionId: sessionId(session),
    value: { id: args[0] },
    pickerOpen: state.menuIsOpen,
  });

export const cancelEvent: EventCreator = (props, state, session) =>
  createEvent('ui', 'cancelled', 'userPicker', {
    sessionId: sessionId(session),
    duration: duration(session),
    queryLength: queryLength(state),
    spaceInQuery: spaceInQuery(state),
    upKeyCount: upKeyCount(session),
    downKeyCount: downKeyCount(session),
    pickerType: pickerType(props),
  });

export const selectEvent: EventCreator = (props, state, session, ...args) =>
  createEvent('ui', selectEventType(session), 'userPicker', {
    sessionId: sessionId(session),
    pickerType: pickerType(props),
    duration: duration(session),
    position: position(state, args[0]),
    queryLength: queryLength(state),
    spaceInQuery: spaceInQuery(state),
    upKeyCount: upKeyCount(session),
    downKeyCount: downKeyCount(session),
    result: result(args[0]),
  });

export const failedEvent: EventCreator = () =>
  createEvent('operational', 'failed', 'userPicker');

function queryLength(state: UserPickerState) {
  return state.preventFilter ? 0 : state.inputValue.length;
}

function selectEventType(session?: UserPickerSession): string {
  return session && session.lastKey === 13 ? 'pressed' : 'clicked';
}

function upKeyCount(session?: UserPickerSession) {
  return session ? session.upCount : null;
}

function downKeyCount(session?: UserPickerSession) {
  return session ? session.downCount : null;
}

function spaceInQuery(state: UserPickerState) {
  return state.preventFilter ? false : state.inputValue.indexOf(' ') !== -1;
}

function duration(session?: UserPickerSession) {
  return session ? Date.now() - session.start : null;
}

function sessionId(session?: UserPickerSession) {
  return session && session.id;
}

function position(state: UserPickerState, value?: { user: User }) {
  return value ? state.users.findIndex(user => user === value.user) : -1;
}

function pickerType(props: UserPickerProps) {
  return props.isMulti ? 'multi' : 'single';
}

function result(value?: { user: User }) {
  return value ? { id: value.user.id } : null;
}
