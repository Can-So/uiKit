import * as tslib_1 from "tslib";
import AkFieldBase from '@atlaskit/field-base';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import * as ImageUtil from '../../util/image';
import debug from '../../util/logger';
import { messages } from '../i18n';
import EmojiErrorMessage from './EmojiErrorMessage';
import EmojiUploadPreview from './EmojiUploadPreview';
import FileChooser from './FileChooser';
import { UploadStatus } from './internal-types';
import * as styles from './styles';
var disallowedReplacementsMap = new Map([
    [':', ''],
    ['!', ''],
    ['@', ''],
    ['#', ''],
    ['%', ''],
    ['^', ''],
    ['&', ''],
    ['*', ''],
    ['(', ''],
    [')', ''],
    [' ', '_'],
]);
var sanitizeName = function (name) {
    // prevent / replace certain characters, allow others
    disallowedReplacementsMap.forEach(function (replaceWith, exclude) {
        name = name.split(exclude).join(replaceWith);
    });
    return name;
};
var maxNameLength = 50;
var toEmojiName = function (uploadName) {
    var name = uploadName.split('_').join(' ');
    return "" + name.substr(0, 1).toLocaleUpperCase() + name.substr(1);
};
var ChooseEmojiFile = /** @class */ (function (_super) {
    tslib_1.__extends(ChooseEmojiFile, _super);
    function ChooseEmojiFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onKeyDown = function (event) {
            if (event.key === 'Escape') {
                _this.props.onUploadCancelled();
            }
        };
        return _this;
    }
    ChooseEmojiFile.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.name, name = _b === void 0 ? '' : _b, onChooseFile = _a.onChooseFile, onNameChange = _a.onNameChange, errorMessage = _a.errorMessage;
        var disableChooser = !name;
        // Note: FileChooser.accept does not work in Electron due to a bug: https://product-fabric.atlassian.net/browse/FS-1626
        return (React.createElement("div", { className: styles.emojiUpload },
            React.createElement("div", { className: styles.uploadChooseFileMessage },
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.addCustomEmojiLabel), function (message) { return React.createElement("h5", null, message); })),
            React.createElement("div", { className: styles.uploadChooseFileRow },
                React.createElement("span", { className: styles.uploadChooseFileEmojiName },
                    React.createElement(AkFieldBase, { appearance: "standard", isCompact: true, isLabelHidden: true, isFocused: true, isFitContainerWidthEnabled: true },
                        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiPlaceholder), function (message) { return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiNameAriaLabel), function (ariaLabel) { return (React.createElement("input", { placeholder: message, "aria-label": ariaLabel, maxLength: maxNameLength, onChange: onNameChange, onKeyDown: _this.onKeyDown, value: name, ref: "name", autoFocus: true })); })); }))),
                React.createElement("span", { className: styles.uploadChooseFileBrowse },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiChooseFileTitle), function (message) { return (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiChooseFileAriaLabel), function (ariaLabel) { return (React.createElement(FileChooser, { label: message, onChange: onChooseFile, accept: "image/png,image/jpeg,image/gif", ariaLabel: ariaLabel, isDisabled: disableChooser })); })); }))),
            React.createElement("div", { className: styles.emojiUploadBottom }, !errorMessage ? (React.createElement("p", null,
                React.createElement(FormattedMessage, tslib_1.__assign({}, messages.emojiImageRequirements)))) : (React.createElement(EmojiErrorMessage, { className: styles.emojiChooseFileErrorMessage, message: errorMessage })))));
    };
    return ChooseEmojiFile;
}(PureComponent));
var EmojiUploadPicker = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiUploadPicker, _super);
    function EmojiUploadPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            uploadStatus: UploadStatus.Waiting,
            chooseEmojiErrorMessage: undefined,
        };
        _this.onNameChange = function (event) {
            var newName = sanitizeName(event.target.value);
            if (_this.state.name !== newName) {
                _this.setState({
                    name: newName,
                });
            }
        };
        _this.onAddEmoji = function () {
            var onUploadEmoji = _this.props.onUploadEmoji;
            var _a = _this.state, filename = _a.filename, name = _a.name, previewImage = _a.previewImage, uploadStatus = _a.uploadStatus;
            if (uploadStatus === UploadStatus.Uploading) {
                return;
            }
            if (filename && name && previewImage) {
                var notifyUpload_1 = function (size) {
                    var width = size.width, height = size.height;
                    _this.setState({
                        uploadStatus: UploadStatus.Uploading,
                    });
                    onUploadEmoji({
                        name: toEmojiName(name),
                        shortName: ":" + name + ":",
                        filename: filename,
                        dataURL: previewImage,
                        width: width,
                        height: height,
                    });
                };
                ImageUtil.getNaturalImageSize(previewImage)
                    .then(function (size) {
                    notifyUpload_1(size);
                })
                    .catch(function (error) {
                    debug('getNaturalImageSize error', error);
                    // Just set arbitrary size, worse case is it may render
                    // in wrong aspect ratio in some circumstances.
                    notifyUpload_1({
                        width: 32,
                        height: 32,
                    });
                });
            }
        };
        _this.errorOnUpload = function (event) {
            debug('File load error: ', event);
            _this.setState({
                chooseEmojiErrorMessage: messages.emojiUploadFailed,
            });
            _this.cancelChooseFile();
        };
        _this.onFileLoad = function (file) { return function (f) {
            return ImageUtil.parseImage(f.target.result)
                .then(function () {
                var state = {
                    previewImage: f.target.result,
                    filename: file.name,
                };
                _this.setState(state);
            })
                .catch(function () {
                _this.setState({
                    chooseEmojiErrorMessage: messages.emojiInvalidImage,
                });
                _this.cancelChooseFile();
            });
        }; };
        _this.cancelChooseFile = function () {
            _this.setState({
                previewImage: undefined,
            });
        };
        _this.onChooseFile = function (event) {
            var files = event.target.files;
            if (files.length) {
                var onFileChosen = _this.props.onFileChosen;
                var reader = new FileReader();
                var file = files[0];
                if (ImageUtil.hasFileExceededSize(file)) {
                    _this.setState({
                        chooseEmojiErrorMessage: messages.emojiImageTooBig,
                    });
                    _this.cancelChooseFile();
                    return;
                }
                reader.addEventListener('load', _this.onFileLoad(file));
                reader.addEventListener('abort', _this.errorOnUpload);
                reader.addEventListener('error', _this.errorOnUpload);
                reader.readAsDataURL(file);
                if (onFileChosen) {
                    onFileChosen(file.name);
                }
            }
            else {
                _this.cancelChooseFile();
            }
        };
        _this.clearUploadPicker = function () {
            _this.setState({
                name: undefined,
                previewImage: undefined,
                uploadStatus: UploadStatus.Waiting,
            });
        };
        if (props.errorMessage) {
            _this.state.uploadStatus = UploadStatus.Error;
        }
        if (props.initialUploadName) {
            _this.state.name = sanitizeName(props.initialUploadName);
        }
        return _this;
    }
    EmojiUploadPicker.prototype.componentWillReceiveProps = function (nextProps) {
        var updatedState = {};
        if (nextProps.errorMessage) {
            updatedState.uploadStatus = UploadStatus.Error;
        }
        else {
            if (this.state.uploadStatus === UploadStatus.Error) {
                updatedState.uploadStatus = UploadStatus.Waiting;
            }
        }
        if (nextProps.initialUploadName) {
            if (!this.state.name) {
                updatedState.name = sanitizeName(nextProps.initialUploadName);
            }
        }
        this.setState(updatedState);
    };
    EmojiUploadPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, errorMessage = _a.errorMessage, onUploadCancelled = _a.onUploadCancelled;
        var _b = this.state, name = _b.name, previewImage = _b.previewImage, uploadStatus = _b.uploadStatus, chooseEmojiErrorMessage = _b.chooseEmojiErrorMessage;
        var cancelUpload = function () {
            _this.clearUploadPicker();
            onUploadCancelled();
        };
        if (name && previewImage) {
            return (React.createElement(EmojiUploadPreview, { errorMessage: errorMessage, name: name, onAddEmoji: this.onAddEmoji, onUploadCancelled: cancelUpload, previewImage: previewImage, uploadStatus: uploadStatus }));
        }
        return (React.createElement(ChooseEmojiFile, { name: name, onChooseFile: this.onChooseFile, onNameChange: this.onNameChange, onUploadCancelled: cancelUpload, errorMessage: chooseEmojiErrorMessage ? (React.createElement(FormattedMessage, tslib_1.__assign({}, chooseEmojiErrorMessage))) : (undefined) }));
    };
    return EmojiUploadPicker;
}(PureComponent));
export default EmojiUploadPicker;
//# sourceMappingURL=EmojiUploadPicker.js.map