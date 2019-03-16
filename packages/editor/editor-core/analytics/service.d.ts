import { AnalyticsHandler } from './handler';
/**
 * The service allows @analytics annotations to access the analytics Handler
 * from an arbitrary scope. This coupling assumes that there is only one analytics
 * Handler that should be used on the page across all components.
 */
export declare class AnalyticsService {
    trackEvent: AnalyticsHandler;
    handler: AnalyticsHandler | null;
}
declare const _default: AnalyticsService;
export default _default;
