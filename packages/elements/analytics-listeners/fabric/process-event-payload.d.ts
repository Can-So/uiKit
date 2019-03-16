import { GasPayload, GasScreenEventPayload } from '@findable/analytics-gas-types';
import { UIAnalyticsEventInterface } from '@findable/analytics-next-types';
export declare const processEventPayload: (event: UIAnalyticsEventInterface, tag: string) => GasPayload | GasScreenEventPayload;
