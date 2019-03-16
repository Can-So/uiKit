import * as tslib_1 from "tslib";
import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection } from '@atlaskit/form';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import { CommentField } from './CommentField';
import { CopyLinkButton } from './CopyLinkButton';
import { ShareHeader } from './ShareHeader';
import { UserPickerField } from './UserPickerField';
var LeftAlignmentContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin-right: auto;\n"], ["\n  margin-right: auto;\n"])));
var CenterAlignedIconWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n"], ["\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n"])));
var InternalForm = /** @class */ (function (_super) {
    tslib_1.__extends(InternalForm, _super);
    function InternalForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalForm.prototype.componentWillUnmount = function () {
        var _a = this.props, onDismiss = _a.onDismiss, getValues = _a.getValues;
        if (onDismiss) {
            onDismiss(getValues());
        }
    };
    InternalForm.prototype.render = function () {
        var _a = this.props, formProps = _a.formProps, title = _a.title, loadOptions = _a.loadOptions, capabilitiesInfoMessage = _a.capabilitiesInfoMessage, onLinkCopy = _a.onLinkCopy, copyLink = _a.copyLink, submitButtonLabel = _a.submitButtonLabel, defaultValue = _a.defaultValue, config = _a.config, shareError = _a.shareError, isSharing = _a.isSharing;
        return (React.createElement("form", tslib_1.__assign({}, formProps),
            React.createElement(ShareHeader, { title: title }),
            React.createElement(FormSection, null,
                React.createElement(UserPickerField, { loadOptions: loadOptions, defaultValue: defaultValue && defaultValue.users, capabilitiesInfoMessage: capabilitiesInfoMessage, config: config }),
                config && config.allowComment && (React.createElement(CommentField, { defaultValue: defaultValue && defaultValue.comment }))),
            React.createElement(FormFooter, null,
                React.createElement(LeftAlignmentContainer, null,
                    React.createElement(CopyLinkButton, { onLinkCopy: onLinkCopy, link: copyLink })),
                shareError ? (React.createElement(React.Fragment, null,
                    React.createElement(CenterAlignedIconWrapper, null,
                        React.createElement(Tooltip, { content: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.shareFailureMessage)), position: "top" },
                            React.createElement(ErrorIcon, { label: "errorIcon", primaryColor: colors.R400 }))),
                    React.createElement(Button, { appearance: "warning", type: "submit" },
                        React.createElement("strong", null,
                            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.formRetry)))))) : (React.createElement(Button, { appearance: "primary", type: "submit", isLoading: isSharing }, submitButtonLabel || React.createElement(FormattedMessage, tslib_1.__assign({}, messages.formSend)))))));
    };
    return InternalForm;
}(React.PureComponent));
export var ShareForm = function (props) { return (React.createElement(Form, { onSubmit: props.onShareClick }, function (_a) {
    var formProps = _a.formProps, getValues = _a.getValues;
    return (React.createElement(InternalForm, tslib_1.__assign({}, props, { formProps: formProps, getValues: getValues })));
})); };
ShareForm.defaultProps = {
    isSharing: false,
    onShareClick: function () { },
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=ShareForm.js.map