import * as tslib_1 from "tslib";
import FieldTextArea from '@findable/field-text-area';
import { Field } from '@findable/form';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
export var CommentField = function (_a) {
    var defaultValue = _a.defaultValue;
    return (React.createElement(Field, { name: "comment", defaultValue: defaultValue }, function (_a) {
        var fieldProps = _a.fieldProps;
        return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.commentPlaceholder), function (placeholder) { return (React.createElement(FieldTextArea, tslib_1.__assign({}, fieldProps, { onChange: function (event) {
                return fieldProps.onChange({
                    format: 'plain_text',
                    value: event.target.value,
                });
            }, value: fieldProps.value && fieldProps.value.value, minimumRows: 3, shouldFitContainer: true, isLabelHidden: true, placeholder: placeholder }))); }));
    }));
};
//# sourceMappingURL=CommentField.js.map