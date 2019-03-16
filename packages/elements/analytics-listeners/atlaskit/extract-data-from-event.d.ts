/**
 * Largely taken from analytics-web-react
 */
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
export declare const getActionSubject: (event: UIAnalyticsEventInterface) => any;
export declare const getSources: (event: UIAnalyticsEventInterface) => any[];
export declare const getComponents: (event: UIAnalyticsEventInterface) => any[];
export declare const getExtraAttributes: (event: UIAnalyticsEventInterface) => any;
export declare const getPackageInfo: (event: UIAnalyticsEventInterface) => {
    packageName: any;
    packageVersion: any;
}[];
export declare const getPackageVersion: (event: UIAnalyticsEventInterface) => any[];
