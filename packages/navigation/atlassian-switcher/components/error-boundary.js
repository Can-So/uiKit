import * as tslib_1 from "tslib";
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { ErrorBoundaryWrapper } from '../primitives/wrapper';
import FormattedMessage from '../primitives/formatted-message';
import { NAVIGATION_CHANNEL, OPERATIONAL_EVENT_TYPE, withAnalyticsEvents, } from '../utils/analytics';
import notFoundImage from '../assets/something-went-wrong.png';
var TRIGGER_SUBJECT = 'errorBoundary';
var ACTION_SUBJECT = 'rendered';
var ErrorBoundary = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { hasError: false };
        _this.fireOperationalEvent = function (payload) {
            if (_this.props.createAnalyticsEvent) {
                _this.props
                    .createAnalyticsEvent(tslib_1.__assign({ eventType: OPERATIONAL_EVENT_TYPE, actionSubject: TRIGGER_SUBJECT }, payload))
                    .fire(NAVIGATION_CHANNEL);
            }
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function () {
        var _this = this;
        this.setState({
            hasError: true,
        }, function () {
            _this.fireOperationalEvent({
                action: ACTION_SUBJECT,
            });
        });
    };
    ErrorBoundary.prototype.render = function () {
        var _a = this.props, messages = _a.messages, intl = _a.intl;
        if (this.state.hasError) {
            return (React.createElement(ErrorBoundaryWrapper, null,
                React.createElement("img", { src: notFoundImage, alt: intl.formatMessage(messages.errorImageAltText), width: "160px" }),
                React.createElement("h3", null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.errorHeading))),
                React.createElement("p", null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.errorText)))));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
export default withAnalyticsEvents()(injectIntl(ErrorBoundary));
//# sourceMappingURL=error-boundary.js.map