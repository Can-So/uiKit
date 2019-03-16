/**
 * Largely taken from analytics-web-react
 */
import * as merge from 'lodash.merge';
var extractFromEventContext = function (propertyName, event) {
    return event.context
        .map(function (contextItem) { return contextItem[propertyName]; })
        .filter(Boolean);
};
export var getActionSubject = function (event) {
    var overrides = extractFromEventContext('actionSubjectOverride', event);
    var closestContext = event.context.length > 0 ? event.context[event.context.length - 1] : {};
    var actionSubject = event.payload.actionSubject || closestContext.component;
    return overrides.length > 0 ? overrides[0] : actionSubject;
};
export var getSources = function (event) {
    return extractFromEventContext('source', event);
};
export var getComponents = function (event) {
    return extractFromEventContext('component', event);
};
export var getExtraAttributes = function (event) {
    return extractFromEventContext('attributes', event).reduce(function (result, extraAttributes) { return merge(result, extraAttributes); }, {});
};
export var getPackageInfo = function (event) {
    return event.context
        .map(function (contextItem) { return ({
        packageName: contextItem.packageName,
        packageVersion: contextItem.packageVersion,
    }); })
        .filter(function (p) { return p.packageName; });
};
export var getPackageVersion = function (event) {
    return extractFromEventContext('packageVersion', event);
};
//# sourceMappingURL=extract-data-from-event.js.map