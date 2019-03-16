export declare type OriginTracingWithIdGenerated = {
    originIdGenerated: string;
    originProduct: string;
};
export declare type OriginTracingForSubSequentEvents = {
    originId: string;
    originProduct: string;
};
export declare type OriginAnalyticAttributes = {
    hasGeneratedId: boolean;
};
export declare type OriginTracing = {
    id: string;
    addToUrl: (link: string) => string;
    toAnalyticsAttributes: (attrs: OriginAnalyticAttributes) => OriginTracingWithIdGenerated | OriginTracingForSubSequentEvents;
};
export declare type OriginTracingFactory = () => OriginTracing;
