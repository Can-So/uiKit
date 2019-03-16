import * as tslib_1 from "tslib";
export var FeatureFlag;
(function (FeatureFlag) {
})(FeatureFlag || (FeatureFlag = {}));
var defaultFlags = {};
var FeatureFlags = /** @class */ (function () {
    function FeatureFlags(flags) {
        this.flags = tslib_1.__assign({}, defaultFlags, flags);
    }
    FeatureFlags.prototype.isEnabled = function (key) {
        return this.flags[key] === true;
    };
    return FeatureFlags;
}());
export { FeatureFlags };
//# sourceMappingURL=featureFlags.js.map