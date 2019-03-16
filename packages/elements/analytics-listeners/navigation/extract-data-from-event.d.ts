import { UIAnalyticsEventInterface } from '@findable/analytics-next-types';
export declare const getSources: (event: UIAnalyticsEventInterface) => any[];
export declare const getComponents: (event: UIAnalyticsEventInterface) => any[];
export declare const getExtraAttributes: (event: UIAnalyticsEventInterface) => any;
export declare const getPackageInfo: (event: UIAnalyticsEventInterface) => {
    packageName: any;
    packageVersion: any;
}[];
export declare const getPackageVersion: (event: UIAnalyticsEventInterface) => any[];
