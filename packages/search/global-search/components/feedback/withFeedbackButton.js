import * as tslib_1 from "tslib";
import * as React from 'react';
import FeedbackButton from './FeedbackButton';
export default function withFeedbackButton(WrappedComponent) {
    var _a;
    return _a = /** @class */ (function (_super) {
            tslib_1.__extends(WithFeedbackButton, _super);
            function WithFeedbackButton() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WithFeedbackButton.prototype.render = function () {
                var _a = this
                    .props, feedbackCollectorId = _a.feedbackCollectorId, props = tslib_1.__rest(_a, ["feedbackCollectorId"]);
                return (React.createElement(React.Fragment, null,
                    React.createElement(FeedbackButton, { collectorId: this.props.feedbackCollectorId }),
                    React.createElement(WrappedComponent, tslib_1.__assign({}, props))));
            };
            return WithFeedbackButton;
        }(React.Component)),
        _a.displayName = "WithFeedbackButton(" + (WrappedComponent.displayName ||
            WrappedComponent.name) + ")",
        _a;
}
//# sourceMappingURL=withFeedbackButton.js.map