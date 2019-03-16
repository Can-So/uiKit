import { isBoolean, isObject, isOneOf, isString } from './lib';
var UntrackedFlag = /** @class */ (function () {
    function UntrackedFlag(flagKey, flag) {
        this.flagKey = flagKey;
        this.value = flag.value;
    }
    UntrackedFlag.prototype.getBooleanValue = function (options) {
        if (!isBoolean(this.value)) {
            return options.default;
        }
        return this.value;
    };
    UntrackedFlag.prototype.getVariantValue = function (options) {
        if (!isString(this.value) ||
            !isOneOf(this.value, options.oneOf)) {
            return options.default;
        }
        return this.value;
    };
    UntrackedFlag.prototype.getJSONValue = function () {
        if (!isObject(this.value)) {
            return {};
        }
        return this.value;
    };
    return UntrackedFlag;
}());
export default UntrackedFlag;
//# sourceMappingURL=untracked-flag.js.map