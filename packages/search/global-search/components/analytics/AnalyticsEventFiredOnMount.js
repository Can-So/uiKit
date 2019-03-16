import * as tslib_1 from "tslib";
import * as React from 'react';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { DEFAULT_GAS_CHANNEL } from '../../util/analytics-util';
var UnwrappedAnalyticsEventFiredOnMount = /** @class */ (function (_super) {
    tslib_1.__extends(UnwrappedAnalyticsEventFiredOnMount, _super);
    function UnwrappedAnalyticsEventFiredOnMount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnwrappedAnalyticsEventFiredOnMount.prototype.componentDidMount = function () {
        if (this.props.createAnalyticsEvent) {
            var event_1 = this.props.createAnalyticsEvent();
            event_1.update(this.props.payloadProvider()).fire(DEFAULT_GAS_CHANNEL);
            this.props.onEventFired();
        }
    };
    UnwrappedAnalyticsEventFiredOnMount.prototype.render = function () {
        return null;
    };
    return UnwrappedAnalyticsEventFiredOnMount;
}(React.Component));
export { UnwrappedAnalyticsEventFiredOnMount };
export default withAnalyticsEvents()(UnwrappedAnalyticsEventFiredOnMount);
//# sourceMappingURL=AnalyticsEventFiredOnMount.js.map