import * as tslib_1 from "tslib";
import AkButton from '@findable/button';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { customCategory } from '../../constants';
import { messages } from '../i18n';
import Emoji from './Emoji';
import EmojiErrorMessage from './EmojiErrorMessage';
import { UploadStatus } from './internal-types';
import RetryableButton from './RetryableButton';
import * as styles from './styles';
var EmojiUploadPreview = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiUploadPreview, _super);
    function EmojiUploadPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiUploadPreview.prototype.render = function () {
        var _a = this.props, name = _a.name, previewImage = _a.previewImage, uploadStatus = _a.uploadStatus, errorMessage = _a.errorMessage, onAddEmoji = _a.onAddEmoji, onUploadCancelled = _a.onUploadCancelled;
        var emojiComponent;
        if (previewImage) {
            var emoji = {
                shortName: ":" + name + ":",
                type: customCategory,
                category: customCategory,
                representation: {
                    imagePath: previewImage,
                    width: 24,
                    height: 24,
                },
                searchable: true,
            };
            emojiComponent = React.createElement(Emoji, { emoji: emoji });
        }
        var uploading = uploadStatus === UploadStatus.Uploading;
        return (React.createElement("div", { className: styles.uploadPreviewFooter },
            React.createElement("div", { className: styles.uploadPreview },
                React.createElement("div", { className: styles.uploadPreviewText },
                    React.createElement("h5", null,
                        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiPreviewTitle))),
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiPreview, { values: { emoji: emojiComponent } }))),
                React.createElement("div", { className: styles.bigEmojiPreview }, emojiComponent)),
            React.createElement("div", { className: styles.uploadAddRow },
                !uploading && errorMessage ? (React.createElement(EmojiErrorMessage, { className: styles.emojiPreviewErrorMessage, message: errorMessage, tooltip: true })) : null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.addEmojiLabel), function (label) { return (React.createElement(RetryableButton, { className: styles.uploadEmojiButton, retryClassName: styles.uploadRetryButton, label: label, onSubmit: onAddEmoji, appearance: "primary", loading: uploading, error: !!errorMessage })); }),
                React.createElement(AkButton, { onClick: onUploadCancelled, appearance: "subtle", isDisabled: uploading, className: styles.cancelButton },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.cancelLabel))))));
    };
    return EmojiUploadPreview;
}(PureComponent));
export default EmojiUploadPreview;
//# sourceMappingURL=EmojiUploadPreview.js.map