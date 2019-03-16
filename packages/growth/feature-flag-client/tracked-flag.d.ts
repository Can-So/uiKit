import { FlagShape, Flag } from './types';
export default class TrackedFlag implements Flag {
    flagKey: string;
    flag: FlagShape;
    value: string | boolean | object;
    trackExposure: (flagKey: string, flag: FlagShape) => void;
    constructor(flagKey: string, flag: FlagShape, trackExposure: (flagKey: string, flag: FlagShape) => void);
    getBooleanValue(options: {
        default: boolean;
        shouldTrackExposureEvent?: boolean;
    }): boolean;
    getVariantValue(options: {
        default: string;
        oneOf: string[];
        shouldTrackExposureEvent?: boolean;
    }): string;
    getJSONValue(): object;
}
