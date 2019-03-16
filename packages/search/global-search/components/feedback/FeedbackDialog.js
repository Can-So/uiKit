import * as tslib_1 from "tslib";
import * as React from 'react';
import ModalPromise from './ModalWrapper';
import FieldTextArea from '@atlaskit/field-text-area';
import sendFeedback from './feedback-client';
var FeedbackDialog = /** @class */ (function (_super) {
    tslib_1.__extends(FeedbackDialog, _super);
    function FeedbackDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isInvalid: false,
            feedbackText: '',
            Modal: null,
        };
        _this.submit = function () {
            var feedbackText = _this.state.feedbackText;
            // validate text input
            if (!feedbackText || feedbackText.length === 0) {
                _this.setState({
                    isInvalid: true,
                });
                return;
            }
            // don't wait for the feedback request to return since it may take a while
            sendFeedback(feedbackText, _this.props.collectorId);
            _this.props.onSubmit();
        };
        _this.handleTextAreaChange = function (e) {
            _this.setState({
                feedbackText: e.target.value.trim(),
                isInvalid: false,
            });
        };
        return _this;
    }
    FeedbackDialog.prototype.componentDidMount = function () {
        var _this = this;
        ModalPromise.then(function (Modal) { return _this.setState({ Modal: Modal }); });
    };
    FeedbackDialog.prototype.renderDialog = function (Modal) {
        var actions = [
            { text: 'Submit feedback', onClick: this.submit },
            { text: 'Cancel', onClick: this.props.onClose },
        ];
        return (React.createElement(Modal, { actions: actions, width: "small", onClose: this.props.onClose, heading: "Tell us what you think", autoFocus: true },
            React.createElement("p", null, "Thank you for taking the time to write about your Confluence search experience. We guarantee we\u2019ll read all feedback and consider it carefully!"),
            React.createElement(FieldTextArea, { autoFocus: true, value: "", label: "Share your feedback", shouldFitContainer: true, minimumRows: 4, isInvalid: this.state.isInvalid, onChange: this.handleTextAreaChange })));
    };
    FeedbackDialog.prototype.render = function () {
        var Modal = this.state.Modal;
        return Modal ? this.renderDialog(Modal) : null;
    };
    return FeedbackDialog;
}(React.Component));
export default FeedbackDialog;
//# sourceMappingURL=FeedbackDialog.js.map