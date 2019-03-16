import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import * as classNames from 'classnames';
import * as styles from './styles';
import { supportsUploadFeature } from '../../api/EmojiResource';
import EmojiUploadPicker from '../common/EmojiUploadPicker';
import { uploadEmoji } from '../common/UploadEmoji';
var EmojiUploadComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiUploadComponent, _super);
    function EmojiUploadComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onUploadEmoji = function (upload) {
            var emojiProvider = _this.props.emojiProvider;
            var errorSetter = function (message) {
                return _this.setState({
                    uploadErrorMessage: message,
                });
            };
            uploadEmoji(upload, emojiProvider, errorSetter, _this.prepareForUpload, function () { return null; });
        };
        _this.prepareForUpload = function () {
            var emojiProvider = _this.props.emojiProvider;
            if (supportsUploadFeature(emojiProvider)) {
                emojiProvider.prepareForUpload();
            }
            _this.setState({
                uploadErrorMessage: undefined,
            });
            if (_this.ref) {
                _this.ref.clearUploadPicker();
            }
        };
        _this.onUploaderRef = function (emojiUploadPicker) {
            _this.ref = emojiUploadPicker;
        };
        if (supportsUploadFeature(props.emojiProvider)) {
            props.emojiProvider.prepareForUpload();
        }
        _this.state = {};
        return _this;
    }
    EmojiUploadComponent.prototype.render = function () {
        var uploadErrorMessage = this.state.uploadErrorMessage;
        var errorMessage = uploadErrorMessage ? (React.createElement(FormattedMessage, tslib_1.__assign({}, uploadErrorMessage))) : null;
        return (React.createElement("div", { className: classNames([styles.emojiUploadWidget]), ref: this.props.onUploaderRef },
            React.createElement("div", { className: classNames([styles.emojiUploadFooter]) },
                React.createElement(EmojiUploadPicker, { ref: this.onUploaderRef, onUploadCancelled: this.prepareForUpload, onUploadEmoji: this.onUploadEmoji, errorMessage: errorMessage }))));
    };
    return EmojiUploadComponent;
}(PureComponent));
export default EmojiUploadComponent;
//# sourceMappingURL=EmojiUploadComponent.js.map