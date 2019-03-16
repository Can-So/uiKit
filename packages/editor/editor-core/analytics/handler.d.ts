export interface AnalyticsProperties {
    [key: string]: string | number | boolean | undefined;
}
export interface AnalyticsHandler {
    (name: string, properties?: AnalyticsProperties): any;
}
/**
 * Provider using globally available, configured Herment instance.
 *
 * @link https://bitbucket.org/atlassian/herment/overview
 */
export declare function hermentHandler(name: string, properties?: AnalyticsProperties): void;
export declare function debugHandler(name: string, properties?: AnalyticsProperties): void;
/**
 * Attempt to detect analytics provider.
 */
export declare function detectHandler(): AnalyticsHandler;
declare global {
    interface Window {
        AJS: {
            EventQueue: {
                push: (...args: any[]) => any;
            };
        };
    }
}
