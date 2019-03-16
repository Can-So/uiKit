import * as tslib_1 from "tslib";
import AkButton from '@atlaskit/button';
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import CachingEmoji from './CachingEmoji';
import EmojiErrorMessage from './EmojiErrorMessage';
import RetryableButton from './RetryableButton';
import * as styles from './styles';
var EmojiDeletePreview = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiDeletePreview, _super);
    function EmojiDeletePreview(props) {
        var _this = _super.call(this, props) || this;
        _this.onSubmit = function () {
            var _a = _this.props, emoji = _a.emoji, onDeleteEmoji = _a.onDeleteEmoji, onCloseDelete = _a.onCloseDelete;
            if (!_this.state.loading) {
                _this.setState({ loading: true });
                onDeleteEmoji(emoji).then(function (success) {
                    if (success) {
                        onCloseDelete();
                        return;
                    }
                    _this.setState({
                        loading: false,
                        error: true,
                    });
                });
            }
        };
        _this.onCancel = function () {
            _this.props.onCloseDelete();
        };
        _this.state = {
            loading: false,
            error: false,
        };
        return _this;
    }
    EmojiDeletePreview.prototype.componentWillUpdate = function (nextProps) {
        if (nextProps.emoji.id !== this.props.emoji.id) {
            this.setState({ error: false });
        }
    };
    EmojiDeletePreview.prototype.render = function () {
        var _this = this;
        var emoji = this.props.emoji;
        var _a = this.state, loading = _a.loading, error = _a.error;
        return (React.createElement("div", { className: styles.deletePreview },
            React.createElement("div", { className: styles.deleteText },
                React.createElement("h5", null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.deleteEmojiTitle))),
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.deleteEmojiDescription, { values: { emojiShortName: emoji.shortName } }))),
            React.createElement("div", { className: styles.deleteFooter },
                React.createElement(CachingEmoji, { emoji: emoji }),
                React.createElement("div", { className: styles.previewButtonGroup },
                    error ? (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.deleteEmojiFailed), function (message) {
                        return !loading ? (React.createElement(EmojiErrorMessage, { message: message, className: styles.emojiDeleteErrorMessage, tooltip: true })) : null;
                    })) : null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.deleteEmojiLabel), function (message) { return (React.createElement(RetryableButton, { className: styles.uploadEmojiButton, retryClassName: styles.uploadRetryButton, label: message, onSubmit: _this.onSubmit, appearance: "danger", loading: loading, error: error })); }),
                    React.createElement(AkButton, { appearance: "subtle", onClick: this.onCancel, className: styles.cancelButton },
                        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.cancelLabel)))))));
    };
    return EmojiDeletePreview;
}(Component));
export default EmojiDeletePreview;
//# sourceMappingURL=EmojiDeletePreview.js.map