import * as tslib_1 from "tslib";
import AkButton from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import * as styles from './styles';
var RetryableButton = /** @class */ (function (_super) {
    tslib_1.__extends(RetryableButton, _super);
    function RetryableButton(props) {
        return _super.call(this, props) || this;
    }
    RetryableButton.prototype.renderLoading = function () {
        return (React.createElement("span", { className: styles.buttonSpinner },
            React.createElement(Spinner, { invertColor: false })));
    };
    RetryableButton.prototype.renderRetry = function () {
        var _a = this.props, loading = _a.loading, retryClassName = _a.retryClassName, onSubmit = _a.onSubmit;
        return loading ? (this.renderLoading()) : (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.retryLabel), function (retryLabel) { return (React.createElement(AkButton, { className: retryClassName, appearance: "warning", onClick: onSubmit }, retryLabel)); }));
    };
    RetryableButton.prototype.render = function () {
        var _a = this.props, loading = _a.loading, error = _a.error, className = _a.className, appearance = _a.appearance, onSubmit = _a.onSubmit, label = _a.label;
        return error ? (this.renderRetry()) : loading ? (this.renderLoading()) : (React.createElement(AkButton, { className: className, appearance: appearance, onClick: onSubmit }, label));
    };
    return RetryableButton;
}(Component));
export default RetryableButton;
//# sourceMappingURL=RetryableButton.js.map