import * as tslib_1 from "tslib";
import { name as packageName, version as packageVersion, } from '../version.json';
export var ELEMENTS_CHANNEL = 'fabric-elements';
export var createStatusAnalyticsAndFire = function (createAnalyticsEvent) { return function (payload) {
    var statusPayload = tslib_1.__assign({}, payload, { eventType: 'ui' });
    if (!statusPayload.attributes) {
        statusPayload.attributes = {};
    }
    statusPayload.attributes.packageName = packageName;
    statusPayload.attributes.packageVersion = packageVersion;
    statusPayload.attributes.componentName = 'status';
    var event = createAnalyticsEvent(statusPayload);
    event.fire(ELEMENTS_CHANNEL);
    return event;
}; };
//# sourceMappingURL=analytics.js.map