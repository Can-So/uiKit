import * as React from 'react';
import AnalyticsEventFiredOnMount from '../analytics/AnalyticsEventFiredOnMount';
import { buildScreenEvent, Screen } from '../../util/analytics-util';
var getAnalyticsComponent = function (subscreen, screenCounter, searchSessionId, analyticsKey, referralContextIdentifiers) {
    return screenCounter ? (React.createElement(AnalyticsEventFiredOnMount, { key: analyticsKey, onEventFired: function () { return screenCounter.increment(); }, payloadProvider: function () {
            return buildScreenEvent(subscreen, screenCounter.getCount(), searchSessionId, referralContextIdentifiers);
        } })) : null;
};
export var PreQueryAnalyticsComponent = function (_a) {
    var screenCounter = _a.screenCounter, searchSessionId = _a.searchSessionId, referralContextIdentifiers = _a.referralContextIdentifiers;
    return getAnalyticsComponent(Screen.PRE_QUERY, screenCounter, searchSessionId, 'preQueryScreenEvent', referralContextIdentifiers);
};
export var PostQueryAnalyticsComponent = function (_a) {
    var screenCounter = _a.screenCounter, searchSessionId = _a.searchSessionId, referralContextIdentifiers = _a.referralContextIdentifiers;
    return getAnalyticsComponent(Screen.POST_QUERY, screenCounter, searchSessionId, 'postQueryScreenEvent', referralContextIdentifiers);
};
//# sourceMappingURL=ScreenAnalyticsHelper.js.map