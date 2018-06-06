import { AnalyticsWebClient } from './types';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import Logger from './helpers/logger';

export const sendEvent = (client: AnalyticsWebClient, logger: Logger) => (
  event: GasPayload,
): void => {
  const gasEvent = {
    ...event,
  };
  delete gasEvent.eventType;

  switch (event.eventType) {
    case 'ui':
      logger.debug('Sending UI Event via analytics client', gasEvent);
      client.sendUIEvent(gasEvent);
      break;

    case 'operational':
      logger.debug('Sending Operational Event via analytics client', gasEvent);
      client.sendOperationalEvent(gasEvent);
      break;

    case 'track':
      logger.debug('Sending Track Event via analytics client', gasEvent);
      client.sendTrackEvent(gasEvent);
      break;

    case 'screen':
      logger.debug('Sending Screen Event via analytics client', gasEvent);
      client.sendScreenEvent(gasEvent);
      break;

    default:
      logger.error(
        `cannot map eventType ${
          event.eventType
        } to an analytics-web-client function`,
      );
  }
};
