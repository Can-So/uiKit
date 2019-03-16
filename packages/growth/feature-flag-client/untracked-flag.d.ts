import { Flag, FlagShape } from './types';
export default class UntrackedFlag implements Flag {
    flagKey: string;
    value: string | boolean | object;
    constructor(flagKey: string, flag: FlagShape);
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
