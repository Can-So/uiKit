import * as tslib_1 from "tslib";
import * as React from 'react';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
export var WithCreateAnalyticsEvent = withAnalyticsEvents()(/** @class */ (function (_super) {
    tslib_1.__extends(WithCreateAnalyticsEvent, _super);
    function WithCreateAnalyticsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithCreateAnalyticsEvent.prototype.render = function () {
        var _a = this.props, render = _a.render, createAnalyticsEvent = _a.createAnalyticsEvent;
        return render(createAnalyticsEvent);
    };
    return WithCreateAnalyticsEvent;
}(React.Component)));
//# sourceMappingURL=index.js.map