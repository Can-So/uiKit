import { ELEMENTS_CHANNEL } from '../constants';
import { name as packageName, version as packageVersion, } from '../version.json';
import { isSpecialMentionText } from '../types';
export var fireAnalyticsMentionTypeaheadEvent = function (props) { return function (action, duration, userIds, query) {
    if (userIds === void 0) { userIds = []; }
    if (props.createAnalyticsEvent) {
        var eventPayload = {
            action: action,
            actionSubject: 'mentionTypeahead',
            attributes: {
                packageName: packageName,
                packageVersion: packageVersion,
                componentName: 'mention',
                duration: Math.round(duration),
                userIds: userIds,
                queryLength: query ? query.length : 0,
            },
            eventType: 'operational',
        };
        var analyticsEvent = props.createAnalyticsEvent(eventPayload);
        analyticsEvent.fire(ELEMENTS_CHANNEL);
    }
}; };
export var fireAnalyticsMentionEvent = function (createEvent) { return function (actionSubject, action, text, id, accessLevel) {
    var payload = {
        action: action,
        actionSubject: actionSubject,
        eventType: 'ui',
        attributes: {
            packageName: packageName,
            packageVersion: packageVersion,
            componentName: 'mention',
            accessLevel: accessLevel,
            isSpecial: isSpecialMentionText(text),
            userId: id,
        },
    };
    var event = createEvent(payload);
    event.fire(ELEMENTS_CHANNEL);
    return event;
}; };
// OLD Analytics
var MENTION_ANALYTICS_PREFIX = 'atlassian.fabric.mention';
export var fireAnalytics = function (firePrivateAnalyticsEvent) { return function (eventName, text, accessLevel) {
    if (firePrivateAnalyticsEvent) {
        firePrivateAnalyticsEvent(MENTION_ANALYTICS_PREFIX + "." + eventName, {
            accessLevel: accessLevel,
            isSpecial: isSpecialMentionText(text),
        });
    }
}; };
//# sourceMappingURL=analytics.js.map