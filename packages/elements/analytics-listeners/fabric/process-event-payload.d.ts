import { GasPayload, GasScreenEventPayload } from '@atlaskit/analytics-gas-types';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
export declare const processEventPayload: (event: UIAnalyticsEventInterface, tag: string) => GasPayload | GasScreenEventPayload;
