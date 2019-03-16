/**
 * Largely taken from analytics-web-react
 */
import * as merge from 'lodash.merge';
import { NAVIGATION_CONTEXT } from '@atlaskit/analytics-namespaced-context';
var extractFromEventContext = function (propertyNames, event, namespacedContextOnly) {
    if (namespacedContextOnly === void 0) { namespacedContextOnly = true; }
    return event.context
        .reduce(function (acc, contextItem) {
        propertyNames.forEach(function (propertyName) {
            var navContext = contextItem[NAVIGATION_CONTEXT];
            var navContextProp = navContext ? navContext[propertyName] : null;
            acc.push(namespacedContextOnly
                ? navContextProp
                : navContextProp || contextItem[propertyName]);
        });
        return acc;
    }, [])
        .filter(Boolean);
};
export var getSources = function (event) {
    return extractFromEventContext(['source'], event, false);
};
export var getComponents = function (event) {
    return extractFromEventContext(['component', 'componentName'], event, false);
};
export var getExtraAttributes = function (event) {
    return extractFromEventContext(['attributes'], event).reduce(function (result, extraAttributes) { return merge(result, extraAttributes); }, {});
};
export var getPackageInfo = function (event) {
    return event.context
        .map(function (contextItem) {
        var navContext = contextItem[NAVIGATION_CONTEXT];
        var item = navContext ? navContext : contextItem;
        return {
            packageName: item.packageName,
            packageVersion: item.packageVersion,
        };
    })
        .filter(function (p) { return p.packageName; });
};
export var getPackageVersion = function (event) {
    return extractFromEventContext(['packageVersion'], event);
};
//# sourceMappingURL=extract-data-from-event.js.map