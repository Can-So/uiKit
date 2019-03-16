import * as tslib_1 from "tslib";
import { MediaPicker, isDropzone, isClipboard, isPopup, isBinaryUploader, isBrowser, } from '@atlaskit/media-picker';
var PickerFacade = /** @class */ (function () {
    function PickerFacade(pickerType, config, pickerConfig, mediaPickerFactoryClass) {
        if (mediaPickerFactoryClass === void 0) { mediaPickerFactoryClass = MediaPicker; }
        var _this = this;
        this.config = config;
        this.pickerConfig = pickerConfig;
        this.mediaPickerFactoryClass = mediaPickerFactoryClass;
        this.onDragListeners = [];
        this.onStartListeners = [];
        this.eventListeners = {};
        this.handleUploadPreviewUpdate = function (event) {
            var file = event.file, preview = event.preview;
            var _a = preview, dimensions = _a.dimensions, scaleFactor = _a.scaleFactor;
            var state = {
                id: file.id,
                fileName: file.name,
                fileSize: file.size,
                fileMimeType: file.type,
                dimensions: dimensions,
                scaleFactor: scaleFactor,
            };
            _this.eventListeners[file.id] = [];
            _this.onStartListeners.forEach(function (cb) {
                return cb(state, function (evt) { return _this.subscribeStateChanged(file, evt); });
            });
        };
        this.subscribeStateChanged = function (file, onStateChanged) {
            var subscribers = _this.eventListeners[file.id];
            if (!subscribers) {
                return;
            }
            subscribers.push(onStateChanged);
        };
        this.handleUploadError = function (_a) {
            var error = _a.error;
            if (!error || !error.fileId) {
                var err = new Error("Media: unknown upload-error received from Media Picker: " + (error &&
                    error.name));
                _this.errorReporter.captureException(err);
                return;
            }
            var listeners = _this.eventListeners[error.fileId];
            if (!listeners) {
                return;
            }
            listeners.forEach(function (cb) {
                return cb({
                    id: error.fileId,
                    status: 'error',
                    error: error && { description: error.description, name: error.name },
                });
            });
            // remove listeners
            delete _this.eventListeners[error.fileId];
        };
        this.handleMobileUploadEnd = function (event) {
            var file = event.file;
            var listeners = _this.eventListeners[file.id];
            if (!listeners) {
                return;
            }
            listeners.forEach(function (cb) {
                return cb({
                    id: file.id,
                    status: 'mobile-upload-end',
                    fileMimeType: file.type,
                    collection: file.collectionName,
                    publicId: file.publicId,
                });
            });
        };
        this.handleReady = function (event) {
            var file = event.file;
            var listeners = _this.eventListeners[file.id];
            if (!listeners) {
                return;
            }
            listeners.forEach(function (cb) {
                return cb({
                    id: file.id,
                    status: 'ready',
                });
            });
            // remove listeners
            delete _this.eventListeners[file.id];
        };
        this.handleDragEnter = function () {
            _this.onDragListeners.forEach(function (cb) { return cb.call(cb, 'enter'); });
        };
        this.handleDragLeave = function () {
            _this.onDragListeners.forEach(function (cb) { return cb.call(cb, 'leave'); });
        };
        this.pickerType = pickerType;
        this.errorReporter = config.errorReporter;
    }
    PickerFacade.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var picker, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.pickerType === 'customMediaPicker')) return [3 /*break*/, 1];
                        picker = this.picker = this.pickerConfig;
                        return [3 /*break*/, 3];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, this.mediaPickerFactoryClass(this.pickerType, this.config.context, this.pickerConfig)];
                    case 2:
                        picker = _a.picker = _b.sent();
                        _b.label = 3;
                    case 3:
                        picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
                        picker.on('upload-processing', this.handleReady);
                        picker.on('upload-error', this.handleUploadError);
                        picker.on('mobile-upload-end', this.handleMobileUploadEnd);
                        if (isDropzone(picker)) {
                            picker.on('drag-enter', this.handleDragEnter);
                            picker.on('drag-leave', this.handleDragLeave);
                        }
                        if (isDropzone(picker) || isClipboard(picker)) {
                            picker.activate();
                        }
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Object.defineProperty(PickerFacade.prototype, "type", {
        get: function () {
            return this.pickerType;
        },
        enumerable: true,
        configurable: true
    });
    PickerFacade.prototype.destroy = function () {
        var picker = this.picker;
        if (!picker) {
            return;
        }
        picker.removeAllListeners('upload-preview-update');
        picker.removeAllListeners('upload-processing');
        picker.removeAllListeners('upload-error');
        if (isDropzone(picker)) {
            picker.removeAllListeners('drag-enter');
            picker.removeAllListeners('drag-leave');
        }
        this.onStartListeners = [];
        this.onDragListeners = [];
        try {
            if (isDropzone(picker) || isClipboard(picker)) {
                picker.deactivate();
            }
            if (isPopup(picker) || isBrowser(picker)) {
                picker.teardown();
            }
        }
        catch (ex) {
            this.errorReporter.captureException(ex);
        }
    };
    PickerFacade.prototype.setUploadParams = function (params) {
        this.picker.setUploadParams(params);
    };
    PickerFacade.prototype.onClose = function (cb) {
        var picker = this.picker;
        if (isPopup(picker)) {
            picker.on('closed', cb);
            return function () { return picker.off('closed', cb); };
        }
        return function () { };
    };
    PickerFacade.prototype.activate = function () {
        var picker = this.picker;
        if (isDropzone(picker) || isClipboard(picker)) {
            picker.activate();
        }
    };
    PickerFacade.prototype.deactivate = function () {
        var picker = this.picker;
        if (isDropzone(picker) || isClipboard(picker)) {
            picker.deactivate();
        }
    };
    PickerFacade.prototype.show = function () {
        if (isPopup(this.picker)) {
            try {
                this.picker.show();
            }
            catch (ex) {
                this.errorReporter.captureException(ex);
            }
        }
        else if (isBrowser(this.picker)) {
            this.picker.browse();
        }
    };
    PickerFacade.prototype.hide = function () {
        if (isPopup(this.picker)) {
            this.picker.hide();
        }
    };
    PickerFacade.prototype.upload = function (url, fileName) {
        if (isBinaryUploader(this.picker)) {
            this.picker.upload(url, fileName);
        }
    };
    PickerFacade.prototype.onNewMedia = function (cb) {
        this.onStartListeners.push(cb);
    };
    PickerFacade.prototype.onDrag = function (cb) {
        this.onDragListeners.push(cb);
    };
    return PickerFacade;
}());
export default PickerFacade;
//# sourceMappingURL=picker-facade.js.map