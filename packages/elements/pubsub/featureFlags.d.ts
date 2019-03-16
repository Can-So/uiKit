export declare enum FeatureFlag {
}
export declare class FeatureFlags {
    private flags;
    constructor(flags?: {
        [key: string]: boolean;
    });
    isEnabled(key: FeatureFlag): boolean;
}
