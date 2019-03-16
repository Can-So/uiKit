import * as tslib_1 from "tslib";
import InlineDialog from '@atlaskit/inline-dialog';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import { ShareButton } from './ShareButton';
import { ShareForm } from './ShareForm';
// 448px is the max-width of a inline dialog
var InlineDialogFormWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 448px;\n"], ["\n  width: 448px;\n"])));
export var defaultShareContentState = {
    users: [],
    comment: {
        format: 'plain_text',
        value: '',
    },
};
var ShareDialogWithTrigger = /** @class */ (function (_super) {
    tslib_1.__extends(ShareDialogWithTrigger, _super);
    function ShareDialogWithTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.containerRef = React.createRef();
        _this.escapeIsHeldDown = false;
        _this.state = {
            isDialogOpen: false,
            isSharing: false,
            ignoreIntermediateState: false,
            defaultValue: defaultShareContentState,
        };
        _this.handleKeyDown = function (event) {
            var isDialogOpen = _this.state.isDialogOpen;
            if (isDialogOpen) {
                switch (event.key) {
                    case 'Escape':
                        event.stopPropagation();
                        _this.setState({
                            isDialogOpen: false,
                            ignoreIntermediateState: true,
                            defaultValue: defaultShareContentState,
                        });
                }
            }
        };
        _this.onTriggerClick = function () {
            // TODO: send analytics
            if (!_this.state.isDialogOpen) {
                _this.setState({
                    isDialogOpen: true,
                    ignoreIntermediateState: false,
                }, function () {
                    if (_this.containerRef.current) {
                        _this.containerRef.current.focus();
                    }
                });
            }
        };
        _this.handleCloseDialog = function (_) {
            // TODO: send analytics
            _this.setState({
                isDialogOpen: false,
            });
        };
        _this.handleShareSubmit = function (data) {
            if (!_this.props.onShareSubmit) {
                return;
            }
            _this.setState({ isSharing: true });
            _this.props
                .onShareSubmit(data)
                .then(function () {
                _this.handleCloseDialog({ isOpen: false, event: event });
                _this.setState({ isSharing: false });
            })
                .catch(function (err) {
                _this.setState({
                    isSharing: false,
                    shareError: {
                        message: err.message,
                    },
                });
                // send analytic event about the err
            });
        };
        _this.handleFormDismiss = function (data) {
            _this.setState(function (_a) {
                var ignoreIntermediateState = _a.ignoreIntermediateState;
                return ignoreIntermediateState ? null : { defaultValue: data };
            });
        };
        _this.handleShareFailure = function (_err) {
            // TBC: FS-3429 replace send button with retry button
            // will need a prop to pass through the error message to the ShareForm
        };
        return _this;
    }
    ShareDialogWithTrigger.prototype.render = function () {
        var _a = this.state, isDialogOpen = _a.isDialogOpen, isSharing = _a.isSharing, shareError = _a.shareError, defaultValue = _a.defaultValue;
        var _b = this.props, copyLink = _b.copyLink, isDisabled = _b.isDisabled, loadUserOptions = _b.loadUserOptions, shareFormTitle = _b.shareFormTitle, config = _b.config, triggerButtonAppearance = _b.triggerButtonAppearance, triggerButtonStyle = _b.triggerButtonStyle;
        // for performance purposes, we may want to have a lodable content i.e. ShareForm
        return (React.createElement("div", { tabIndex: 0, onKeyDown: this.handleKeyDown, style: { outline: 'none' }, ref: this.containerRef },
            React.createElement(InlineDialog, { content: React.createElement(InlineDialogFormWrapper, null,
                    React.createElement(ShareForm, { copyLink: copyLink, loadOptions: loadUserOptions, isSharing: isSharing, onShareClick: this.handleShareSubmit, title: shareFormTitle, shareError: shareError, onDismiss: this.handleFormDismiss, defaultValue: defaultValue, config: config })), isOpen: isDialogOpen, onClose: this.handleCloseDialog }, this.props.children ? (this.props.children({
                onClick: this.onTriggerClick,
                loading: isSharing,
                error: shareError,
            })) : (React.createElement(ShareButton, { appearance: triggerButtonAppearance, text: triggerButtonStyle === 'icon-with-text' ? (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.shareTriggerButtonText))) : null, onClick: this.onTriggerClick, isSelected: isDialogOpen, isDisabled: isDisabled })))));
    };
    ShareDialogWithTrigger.defaultProps = {
        isDisabled: false,
        shouldCloseOnEscapePress: false,
        triggerButtonAppearance: 'subtle',
        triggerButtonStyle: 'icon-only',
    };
    return ShareDialogWithTrigger;
}(React.Component));
export { ShareDialogWithTrigger };
var templateObject_1;
//# sourceMappingURL=ShareDialogWithTrigger.js.map