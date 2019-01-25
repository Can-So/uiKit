import { GasPayload } from '@atlaskit/analytics-gas-types';
import {
  name as packageName,
  version as packageVersion,
} from '../package.json';
import { ObjectState } from './Client/types';

export const context = {
  componentName: 'smart-cards',
  packageName,
  packageVersion,
};

export const resolvedEvent = (url: string): GasPayload => ({
  action: 'resolved',
  actionSubject: 'smartCard',
  actionSubjectId: url,
  eventType: 'operational',
  type: 'sendOperationalEvent',
  attributes: {
    ...context,
    url: url,
  },
});

export const unresolvedEvent = (
  url: string,
  state: ObjectState,
): GasPayload => ({
  action: 'unresolved',
  actionSubject: 'smartCard',
  actionSubjectId: url,
  eventType: 'operational',
  type: 'sendOperationalEvent',
  attributes: {
    ...context,
    url,
    reason: state.status,
    ...((state as any).definitionId
      ? { definitionId: (state as any).definitionId }
      : {}),
  },
});

export const connectSucceededEvent = (
  url: string,
  state: ObjectState,
): GasPayload => ({
  action: 'connectSucceeded',
  actionSubject: 'smartCard',
  actionSubjectId: url,
  eventType: 'operational',
  type: 'sendOperationalEvent',
  attributes: {
    ...context,
    ...((state as any).definitionId
      ? { definitionId: (state as any).definitionId }
      : {}),
  },
});

export const connectFailedEvent = (
  reason: string,
  url: string,
  state: ObjectState,
): GasPayload => ({
  action: 'connectFailed',
  actionSubject: 'smartCard',
  actionSubjectId: url,
  eventType: 'operational',
  type: 'sendOperationalEvent',
  attributes: {
    ...context,
    reason,
    ...((state as any).definitionId
      ? { definitionId: (state as any).definitionId }
      : {}),
  },
});

export const trackAppAccountConnected = (definitionId?: string) => ({
  action: 'connected',
  actionObject: 'applicationAccount',
  eventType: 'track',
  type: 'sendTrackEvent',
  attributes: {
    ...context,
    definitionId,
  },
});
