import { AnalyticsWebClient } from './types';
import { GasPayload, GasScreenEventPayload } from '@findable/analytics-gas-types';
import Logger from './helpers/logger';
export declare const sendEvent: (logger: Logger, client?: AnalyticsWebClient | Promise<AnalyticsWebClient> | undefined) => (event: GasPayload | GasScreenEventPayload) => void;
