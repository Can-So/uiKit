import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import Button from '@findable/button';
import FeedbackDialog from './FeedbackDialog';
import { AutoDismissFlag, FlagGroup } from '@findable/flag';
import SuccessIcon from '@findable/icon/glyph/check-circle';
import FeedbackIcon from '@findable/icon/glyph/feedback';
import { colors } from '@findable/theme';
// Positions the button at the top right of the drawer
var AboveSearchInputPositionHack = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 32px;\n  right: 32px;\n"], ["\n  position: absolute;\n  top: 32px;\n  right: 32px;\n"])));
var FeedbackButton = /** @class */ (function (_super) {
    tslib_1.__extends(FeedbackButton, _super);
    function FeedbackButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showDialog: false,
            showFlag: false,
        };
        _this.showDialog = function () { return _this.setState({ showDialog: true }); };
        _this.hideDialog = function () { return _this.setState({ showDialog: false }); };
        _this.showFlag = function () { return _this.setState({ showFlag: true }); };
        _this.hideFlag = function () { return _this.setState({ showFlag: false }); };
        _this.handleSubmit = function () {
            _this.hideDialog();
            window.setTimeout(_this.showFlag, 800);
        };
        return _this;
    }
    FeedbackButton.prototype.render = function () {
        var _a = this.state, showDialog = _a.showDialog, showFlag = _a.showFlag;
        return (React.createElement(AboveSearchInputPositionHack, null,
            React.createElement(Button, { appearance: "default", onClick: this.showDialog, iconBefore: React.createElement(FeedbackIcon, { label: "feedback" }) }, "Give feedback"),
            showDialog && (React.createElement(FeedbackDialog, { collectorId: this.props.collectorId, onClose: this.hideDialog, onSubmit: this.handleSubmit })),
            React.createElement(FlagGroup, { onDismissed: this.hideFlag }, showFlag ? (React.createElement(AutoDismissFlag, { id: "feedback.success", key: "feedback.success", icon: React.createElement(SuccessIcon, { primaryColor: colors.G300, label: "Info" }), title: "Thank you", description: "We'll use your feedback to improve this experience." })) : ([]))));
    };
    return FeedbackButton;
}(React.Component));
export default FeedbackButton;
var templateObject_1;
//# sourceMappingURL=FeedbackButton.js.map