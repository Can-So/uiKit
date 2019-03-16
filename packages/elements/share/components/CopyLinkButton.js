import * as tslib_1 from "tslib";
import Button from '@findable/button';
import CheckCircleIcon from '@findable/icon/glyph/check-circle';
import LinkFilledIcon from '@findable/icon/glyph/link-filled';
import InlineDialog from '@findable/inline-dialog';
import { colors } from '@findable/theme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
export var MessageContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin: -10px -15px;\n"], ["\n  display: flex;\n  align-items: center;\n  margin: -10px -15px;\n"])));
var MessageSpan = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  text-indent: 6px;\n"], ["\n  text-indent: 6px;\n"])));
export var HiddenInput = React.forwardRef(function (props, ref) { return (React.createElement("input", { style: { position: 'absolute', left: '-9999px' }, ref: ref, value: props.text, readOnly: true })); });
export var NoPaddingButton = styled(Button)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  padding: 0;\n"], ["\n  padding: 0;\n"])));
var CopyLinkButton = /** @class */ (function (_super) {
    tslib_1.__extends(CopyLinkButton, _super);
    function CopyLinkButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = React.createRef();
        _this.state = {
            shouldShowCopiedMessage: false,
        };
        _this.handleClick = function () {
            if (_this.inputRef.current) {
                _this.inputRef.current.select();
            }
            document.execCommand('copy');
            if (_this.props.onLinkCopy) {
                _this.props.onLinkCopy(_this.props.link);
            }
            _this.setState({ shouldShowCopiedMessage: true });
        };
        _this.handleDismissCopiedMessage = function () {
            _this.setState({ shouldShowCopiedMessage: false });
        };
        return _this;
    }
    CopyLinkButton.prototype.render = function () {
        var shouldShowCopiedMessage = this.state.shouldShowCopiedMessage;
        return (React.createElement(React.Fragment, null,
            React.createElement(HiddenInput, { ref: this.inputRef, text: this.props.link }),
            React.createElement(InlineDialog, { content: React.createElement(MessageContainer, null,
                    React.createElement(CheckCircleIcon, { label: "check circle icon", primaryColor: colors.G300 }),
                    React.createElement(MessageSpan, null,
                        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.copiedToClipboardMessage)))), isOpen: shouldShowCopiedMessage, onClose: this.handleDismissCopiedMessage, placement: "top-start" },
                React.createElement(NoPaddingButton, { appearance: "subtle-link", iconBefore: React.createElement(LinkFilledIcon, { label: "copy link icon" }), onClick: this.handleClick },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.copyLinkButtonText))))));
    };
    return CopyLinkButton;
}(React.Component));
export { CopyLinkButton };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CopyLinkButton.js.map