import { AnalyticsWebClient } from '../types';
import Logger from '../helpers/logger';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
export declare const handleEvent: (event: UIAnalyticsEventInterface, tag: string, logger: Logger, client?: AnalyticsWebClient | Promise<AnalyticsWebClient> | undefined) => void;
