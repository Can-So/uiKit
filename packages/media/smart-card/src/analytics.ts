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
  attributes: {
    ...context,
    url,
    reson: state.status,
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
  attributes: {
    ...context,
    url,
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
  attributes: {
    ...context,
    url,
    reason,
    ...((state as any).definitionId
      ? { definitionId: (state as any).definitionId }
      : {}),
  },
});
