import * as tslib_1 from "tslib";
import * as React from 'react';
import * as throttle from 'lodash.throttle';
import now from '../utils/performance-now';
import { prefetchAll } from '../providers/instance-data-providers';
import { NAVIGATION_CHANNEL, OPERATIONAL_EVENT_TYPE, withAnalyticsEvents, } from '../utils/analytics';
var TRIGGER_SUBJECT = 'atlassianSwitcherPrefetchTrigger';
var THROTTLE_EXPIRES = 60 * 1000; // 60 seconds
var THROTTLE_OPTIONS = {
    leading: true,
    trailing: false,
};
var PrefetchTrigger = /** @class */ (function (_super) {
    tslib_1.__extends(PrefetchTrigger, _super);
    function PrefetchTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fireOperationalEvent = function (payload) {
            if (_this.props.createAnalyticsEvent) {
                _this.props
                    .createAnalyticsEvent(tslib_1.__assign({ eventType: OPERATIONAL_EVENT_TYPE, actionSubject: TRIGGER_SUBJECT }, payload))
                    .fire(NAVIGATION_CHANNEL);
            }
        };
        _this.triggerPrefetch = throttle(function (params) {
            prefetchAll(params);
            _this.fireOperationalEvent({
                action: 'triggeredPrefetch',
            });
        }, THROTTLE_EXPIRES, THROTTLE_OPTIONS);
        _this.handleMouseEnter = function () {
            _this.triggerPrefetch({ cloudId: _this.props.cloudId });
            _this.lastEnteredAt = now();
        };
        _this.handleMouseClick = function () {
            if (_this.lastEnteredAt) {
                var hoverToClick = Math.round(now() - _this.lastEnteredAt);
                _this.fireOperationalEvent({
                    action: 'clicked',
                    attributes: { hoverToClick: hoverToClick },
                });
            }
        };
        return _this;
    }
    PrefetchTrigger.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.Container, Container = _b === void 0 ? 'div' : _b;
        return (React.createElement(Container, { onFocus: this.handleMouseEnter, onMouseEnter: this.handleMouseEnter, onClick: this.handleMouseClick }, children));
    };
    return PrefetchTrigger;
}(React.Component));
export default withAnalyticsEvents()(PrefetchTrigger);
//# sourceMappingURL=prefetch-trigger.js.map