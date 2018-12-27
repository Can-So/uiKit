import { GasPayload } from '@atlaskit/analytics-gas-types';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';

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
