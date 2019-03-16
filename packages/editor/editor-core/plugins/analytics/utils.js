import { editorAnalyticsChannel } from './index';
import { analyticsPluginKey } from './plugin';
export function addAnalytics(tr, payload, channel) {
    var analyticsMeta = tr.getMeta(analyticsPluginKey) || [];
    analyticsMeta.push({ payload: payload, channel: channel });
    return tr.setMeta(analyticsPluginKey, analyticsMeta);
}
export function withAnalytics(payload, channel) {
    return function (command) { return function (state, dispatch, view) {
        return command(state, function (tr) {
            if (dispatch) {
                dispatch(addAnalytics(tr, payload, channel));
            }
            return true;
        }, view);
    }; };
}
export function ruleWithAnalytics(getPayload) {
    return function (rule) {
        // Monkeypatching handler to add analytcs
        var handler = rule.handler;
        rule.handler = function (state, match, start, end) {
            var tr = handler(state, match, start, end);
            if (tr) {
                var payload = getPayload(state, match, start, end);
                tr = addAnalytics(tr, payload);
            }
            return tr;
        };
        return rule;
    };
}
export var fireAnalyticsEvent = function (createAnalyticsEvent) { return function (_a) {
    var payload = _a.payload, _b = _a.channel, channel = _b === void 0 ? editorAnalyticsChannel : _b;
    return createAnalyticsEvent && createAnalyticsEvent(payload).fire(channel);
}; };
//# sourceMappingURL=utils.js.map