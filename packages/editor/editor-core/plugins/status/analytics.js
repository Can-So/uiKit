import * as tslib_1 from "tslib";
import { name as packageName, version as packageVersion, } from '../../version.json';
export var FABRIC_CHANNEL = 'fabric-elements';
export var createStatusAnalyticsAndFire = function (createAnalyticsEvent) { return function (payload) {
    if (createAnalyticsEvent && payload) {
        var statusPayload = tslib_1.__assign({}, payload, { eventType: 'ui' });
        if (!statusPayload.attributes) {
            statusPayload.attributes = {};
        }
        statusPayload.attributes.packageName = packageName;
        statusPayload.attributes.packageVersion = packageVersion;
        statusPayload.attributes.componentName = 'status';
        createAnalyticsEvent(statusPayload).fire(FABRIC_CHANNEL);
    }
}; };
export var analyticsState = function (isNew) {
    return isNew ? 'new' : 'update';
};
//# sourceMappingURL=analytics.js.map