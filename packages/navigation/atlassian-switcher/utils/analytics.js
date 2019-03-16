import * as tslib_1 from "tslib";
import * as React from 'react';
import { NavigationAnalyticsContext } from '@findable/analytics-namespaced-context';
import { createAndFireEvent, withAnalyticsEvents, } from '@findable/analytics-next';
import { UI_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@findable/analytics-gas-types';
export var NAVIGATION_CHANNEL = 'navigation';
export var SWITCHER_SUBJECT = 'atlassianSwitcher';
export var SWITCHER_ITEM_SUBJECT = 'atlassianSwitcherItem';
export var createAndFireNavigationEvent = createAndFireEvent(NAVIGATION_CHANNEL);
export var analyticsAttributes = function (attributes) { return ({
    attributes: attributes,
}); };
export var withAnalyticsContextData = function (mapPropsToContext) {
    return function (WrappedComponent) {
        return function (props) { return (React.createElement(NavigationAnalyticsContext, { data: mapPropsToContext(props) },
            React.createElement(WrappedComponent, tslib_1.__assign({}, props)))); };
    };
};
export var RenderTracker = withAnalyticsEvents({
    onRender: function (createAnalyticsEvent, props) {
        return createAnalyticsEvent({
            eventType: OPERATIONAL_EVENT_TYPE,
            action: 'rendered',
            actionSubject: props.subject,
            attributes: props.data,
        }).fire(NAVIGATION_CHANNEL);
    },
})(/** @class */ (function (_super) {
    tslib_1.__extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.componentDidMount = function () {
        this.props.onRender();
    };
    class_1.prototype.render = function () {
        return null;
    };
    return class_1;
}(React.Component)));
export { withAnalyticsEvents, NavigationAnalyticsContext, OPERATIONAL_EVENT_TYPE, UI_EVENT_TYPE, };
//# sourceMappingURL=analytics.js.map