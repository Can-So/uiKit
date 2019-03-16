import * as tslib_1 from "tslib";
import { ErrorMessage, Field, HelperMessage } from '@findable/form';
import UserPicker from '@findable/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import { allowEmails, isValidEmailUsingConfig, showInviteWarning, } from './utils';
export var REQUIRED = 'REQUIRED';
var validate = function (value) {
    return value && value.length > 0 ? undefined : REQUIRED;
};
export var UserPickerField = function (props) { return (React.createElement(Field, { name: "users", validate: validate, defaultValue: props.defaultValue }, function (_a) {
    var fieldProps = _a.fieldProps, error = _a.error, valid = _a.meta.valid;
    return (React.createElement(React.Fragment, null,
        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.userPickerAddMoreMessage), function (addMore) { return (React.createElement(UserPicker, tslib_1.__assign({}, fieldProps, { loadOptions: props.loadOptions, isMulti: true, width: "100%", placeholder: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.userPickerPlaceholder)), addMoreMessage: addMore, allowEmail: allowEmails(props.config), isValidEmail: isValidEmailUsingConfig(props.config) }))); }),
        showInviteWarning(props.config, fieldProps.value) && (React.createElement(HelperMessage, null, props.capabilitiesInfoMessage || (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.capabilitiesInfoMessage))))),
        !valid && error === REQUIRED && (React.createElement(ErrorMessage, null,
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.userPickerRequiredMessage))))));
})); };
//# sourceMappingURL=UserPickerField.js.map