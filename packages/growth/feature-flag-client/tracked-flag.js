import { isBoolean, isObject, isOneOf, isString } from './lib';
var TrackedFlag = /** @class */ (function () {
    function TrackedFlag(flagKey, flag, trackExposure) {
        this.flagKey = flagKey;
        this.value = flag.value;
        this.trackExposure = trackExposure;
        this.flag = flag;
    }
    TrackedFlag.prototype.getBooleanValue = function (options) {
        if (!isBoolean(this.value)) {
            return options.default;
        }
        if (options.shouldTrackExposureEvent) {
            this.trackExposure(this.flagKey, this.flag);
        }
        return this.value;
    };
    TrackedFlag.prototype.getVariantValue = function (options) {
        if (!isString(this.value) ||
            !isOneOf(this.value, options.oneOf)) {
            return options.default;
        }
        if (options.shouldTrackExposureEvent) {
            this.trackExposure(this.flagKey, this.flag);
        }
        return this.value;
    };
    TrackedFlag.prototype.getJSONValue = function () {
        if (!isObject(this.value)) {
            return {};
        }
        return this.value;
    };
    return TrackedFlag;
}());
export default TrackedFlag;
//# sourceMappingURL=tracked-flag.js.map